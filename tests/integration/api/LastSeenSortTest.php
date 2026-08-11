<?php

/*
 * This file is part of fof/user-directory.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserDirectory\tests\integration\api;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

/**
 * Guards the "recently online" sort against the privacy regression of issue #66.
 *
 * In Flarum beta 15 the `lastSeenAt` sort was available to everyone, which let
 * any user infer the online time of users who had opted out of disclosing it.
 * Beta 16 restricted the sort to holders of `user.viewLastSeenAt`, and this
 * extension removed its UI option in 9b37481 rather than gating it.
 *
 * These tests pin the contract we now rely on to re-expose the option safely:
 * the sort must work for permitted actors, and must be rejected outright —
 * never silently downgraded to an unsorted list — for everyone else.
 */
class LastSeenSortTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-user-directory');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                [
                    'id'                 => 3,
                    'username'           => 'hidden',
                    'password'           => '$2y$10$LO59tiT7uggl6Oe23o/O6.utnF6ipngYjvMvaxo1TciKqBttDNKim',
                    'email'              => 'hidden@machine.local',
                    'is_email_confirmed' => 1,
                    'last_seen_at'       => '2026-01-01 00:00:00',
                    // Opted out of disclosing online status.
                    'preferences'        => json_encode(['discloseOnline' => false]),
                ],
                [
                    'id'                 => 4,
                    'username'           => 'visible',
                    'password'           => '$2y$10$LO59tiT7uggl6Oe23o/O6.utnF6ipngYjvMvaxo1TciKqBttDNKim',
                    'email'              => 'visible@machine.local',
                    'is_email_confirmed' => 1,
                    'last_seen_at'       => '2026-06-01 00:00:00',
                    'preferences'        => json_encode(['discloseOnline' => true]),
                ],
            ],
            'group_permission' => [
                ['permission' => 'fof.user-directory.view', 'group_id' => 3],
                ['permission' => 'searchUsers', 'group_id' => 3],
            ],
        ]);
    }

    protected function grantLastSeenToMembers(): void
    {
        $this->prepareDatabase([
            'group_permission' => [
                ['permission' => 'user.viewLastSeenAt', 'group_id' => 3],
            ],
        ]);
    }

    /**
     * The sort must be supplied via withQueryParams(): the test ServerRequest
     * never parses a query string out of the path, so a `?sort=` in the URL is
     * silently ignored and the assertion would pass against an unsorted list.
     */
    protected function sortRequest(string $sort, ?int $actor)
    {
        $options = $actor !== null ? ['authenticatedAs' => $actor] : [];

        return $this->send(
            $this->request('GET', '/api/users', $options)->withQueryParams(['sort' => $sort])
        );
    }

    protected function usernamesFrom($response): array
    {
        $data = json_decode($response->getBody()->getContents(), true);

        return array_column(array_column($data['data'], 'attributes'), 'username');
    }

    #[Test]
    public function admin_can_sort_by_last_seen_descending()
    {
        $response = $this->sortRequest('-lastSeenAt', 1);

        $this->assertEquals(200, $response->getStatusCode());
    }

    #[Test]
    public function admin_can_sort_by_last_seen_ascending()
    {
        $response = $this->sortRequest('lastSeenAt', 1);

        $this->assertEquals(200, $response->getStatusCode());
    }

    #[Test]
    public function descending_sort_orders_most_recently_seen_first()
    {
        $usernames = $this->usernamesFrom($this->sortRequest('-lastSeenAt', 1));

        // 'visible' (June) was seen more recently than 'hidden' (January).
        $this->assertLessThan(
            array_search('hidden', $usernames),
            array_search('visible', $usernames),
            'Descending last-seen sort should place the more recently seen user first'
        );
    }

    #[Test]
    public function ascending_sort_orders_longest_away_first()
    {
        $usernames = $this->usernamesFrom($this->sortRequest('lastSeenAt', 1));

        $this->assertLessThan(
            array_search('visible', $usernames),
            array_search('hidden', $usernames),
            'Ascending last-seen sort should place the longest-absent user first'
        );
    }

    /**
     * The core regression from issue #66. A user without the permission asking
     * for this sort must be rejected. If this ever returns 200 it means the
     * sort silently degraded, which is how the beta 15 privacy leak worked.
     */
    #[Test]
    public function normal_user_cannot_sort_by_last_seen_descending()
    {
        $response = $this->sortRequest('-lastSeenAt', 2);

        $this->assertEquals(400, $response->getStatusCode());
    }

    #[Test]
    public function normal_user_cannot_sort_by_last_seen_ascending()
    {
        $response = $this->sortRequest('lastSeenAt', 2);

        $this->assertEquals(400, $response->getStatusCode());
    }

    #[Test]
    public function guest_cannot_sort_by_last_seen()
    {
        $this->prepareDatabase([
            'group_permission' => [
                ['permission' => 'fof.user-directory.view', 'group_id' => 2],
                ['permission' => 'searchUsers', 'group_id' => 2],
            ],
        ]);

        $response = $this->sortRequest('-lastSeenAt', null);

        $this->assertEquals(400, $response->getStatusCode());
    }

    #[Test]
    public function normal_user_can_sort_by_last_seen_once_permission_is_granted()
    {
        $this->grantLastSeenToMembers();

        $response = $this->sortRequest('-lastSeenAt', 2);

        $this->assertEquals(200, $response->getStatusCode());
    }

    /**
     * Sorting stays available to permitted actors, but the timestamp of a user
     * who opted out of disclosing their online status must still be withheld.
     * Core gates the *field* on `discloseOnline || can(viewLastSeenAt, $user)`
     * separately from the sort, and this extension must not widen that.
     */
    #[Test]
    public function last_seen_attribute_stays_hidden_from_users_without_permission()
    {
        $response = $this->send($this->request('GET', '/api/users', ['authenticatedAs' => 2]));

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);

        $byName = [];
        foreach ($data['data'] as $user) {
            $byName[$user['attributes']['username']] = $user['attributes'];
        }

        $this->assertArrayNotHasKey(
            'lastSeenAt',
            $byName['hidden'],
            'A user who opted out of discloseOnline must not expose lastSeenAt'
        );
        $this->assertArrayHasKey(
            'lastSeenAt',
            $byName['visible'],
            'A user who opted in to discloseOnline should still expose lastSeenAt'
        );
    }
}
