<?php

/*
 * This file is part of fof/user-directory.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserDirectory\tests\integration\content;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

/**
 * The server-rendered /users page maps sort keys to API sort params itself.
 * If it forwards `seen_recent` for an actor without `user.viewLastSeenAt`,
 * the API throws and the whole page 500s — issue #66 all over again, but on
 * first paint rather than on interaction. The page must degrade instead.
 */
class UserDirectorySortTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-user-directory');

        $this->prepareDatabase([
            User::class => [
                // Given an explicit last_seen_at so ordering does not depend on
                // how the database sorts NULLs.
                $this->normalUser() + ['last_seen_at' => '2026-03-01 00:00:00'],
                [
                    'id'                 => 3,
                    'username'           => 'hidden',
                    'password'           => '$2y$10$LO59tiT7uggl6Oe23o/O6.utnF6ipngYjvMvaxo1TciKqBttDNKim',
                    'email'              => 'hidden@machine.local',
                    'is_email_confirmed' => 1,
                    'last_seen_at'       => '2026-01-01 00:00:00',
                    'preferences'        => json_encode(['discloseOnline' => false]),
                ],
                // Seeded last but seen most recently, so a working descending
                // sort has to move it to the front of the id ordering.
                [
                    'id'                 => 4,
                    'username'           => 'freshest',
                    'password'           => '$2y$10$LO59tiT7uggl6Oe23o/O6.utnF6ipngYjvMvaxo1TciKqBttDNKim',
                    'email'              => 'freshest@machine.local',
                    'is_email_confirmed' => 1,
                    'last_seen_at'       => '2099-01-01 00:00:00',
                    'preferences'        => json_encode(['discloseOnline' => true]),
                ],
            ],
            'group_permission' => [
                ['permission' => 'fof.user-directory.view', 'group_id' => 3],
                ['permission' => 'searchUsers', 'group_id' => 3],
            ],
        ]);
    }

    protected function directoryRequest(string $sort, ?int $actor)
    {
        $options = $actor !== null ? ['authenticatedAs' => $actor] : [];

        return $this->send(
            $this->request('GET', '/users', $options)->withQueryParams(['sort' => $sort])
        );
    }

    /**
     * Reads the usernames out of the server-rendered list, in render order.
     */
    protected function renderedUsernames($response): array
    {
        preg_match_all('/<li>\s*(\S+)\s*<\/li>/', $response->getBody()->getContents(), $matches);

        return $matches[1];
    }

    #[Test]
    public function permitted_user_can_load_directory_sorted_by_recently_online()
    {
        $response = $this->directoryRequest('seen_recent', 1);

        $this->assertEquals(200, $response->getStatusCode());

        $usernames = $this->renderedUsernames($response);

        $this->assertNotEmpty($usernames, 'The directory should render users');
        $this->assertEquals('freshest', $usernames[0], 'Descending last-seen sort should place the most recently seen user first');
        $this->assertGreaterThan(
            array_search('normal', $usernames),
            array_search('hidden', $usernames),
            'Descending last-seen sort should place the January user after the March one'
        );
    }

    #[Test]
    public function permitted_user_can_load_directory_sorted_by_longest_away()
    {
        $response = $this->directoryRequest('seen_oldest', 1);

        $this->assertEquals(200, $response->getStatusCode());

        $usernames = $this->renderedUsernames($response);

        $this->assertNotEmpty($usernames, 'The directory should render users');
        $this->assertLessThan(
            array_search('normal', $usernames),
            array_search('hidden', $usernames),
            'Ascending last-seen sort should place the January user before the March one'
        );
        $this->assertEquals('freshest', end($usernames), 'Ascending last-seen sort should place the most recently seen user last');
    }

    /**
     * A crafted or bookmarked URL must not break the page for someone who
     * lacks the permission. It should fall back to the default ordering.
     */
    #[Test]
    public function unpermitted_user_falls_back_instead_of_erroring()
    {
        $response = $this->directoryRequest('seen_recent', 2);

        $this->assertEquals(200, $response->getStatusCode());
    }

    /**
     * Falling back must mean the sort is *dropped*, not applied anyway. If the
     * unpermitted actor still sees last-seen ordering, the permission has been
     * bypassed rather than respected.
     */
    #[Test]
    public function unpermitted_user_does_not_receive_last_seen_ordering()
    {
        $permitted = $this->renderedUsernames($this->directoryRequest('seen_recent', 1));
        $unpermitted = $this->renderedUsernames($this->directoryRequest('seen_recent', 2));

        $this->assertNotEmpty($unpermitted, 'The directory should still render for an unpermitted actor');
        $this->assertEquals('freshest', $permitted[0], 'Sanity check: the permitted actor does get last-seen ordering');
        $this->assertNotSame(
            $permitted,
            $unpermitted,
            'An unpermitted actor must not receive the last-seen ordering'
        );
    }

    #[Test]
    public function unpermitted_guest_falls_back_instead_of_erroring()
    {
        $this->prepareDatabase([
            'group_permission' => [
                ['permission' => 'fof.user-directory.view', 'group_id' => 2],
                ['permission' => 'searchUsers', 'group_id' => 2],
            ],
        ]);

        $response = $this->directoryRequest('seen_recent', null);

        $this->assertEquals(200, $response->getStatusCode());
    }

    #[Test]
    public function unrecognised_sort_still_loads()
    {
        $response = $this->directoryRequest('not_a_real_sort', 1);

        $this->assertEquals(200, $response->getStatusCode());
    }

    #[Test]
    public function directory_loads_without_a_sort()
    {
        $response = $this->send($this->request('GET', '/users', ['authenticatedAs' => 1]));

        $this->assertEquals(200, $response->getStatusCode());
    }
}
