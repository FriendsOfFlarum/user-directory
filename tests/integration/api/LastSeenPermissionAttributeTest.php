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
 * The frontend needs to know whether the actor may use the last-seen sort so it
 * can hide the option entirely. Exposing the option to someone who cannot use
 * it is what produced the "Oops, something went wrong" of issue #66, so this
 * attribute must track `user.viewLastSeenAt` exactly.
 */
class LastSeenPermissionAttributeTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-user-directory');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
            ],
        ]);
    }

    protected function forumAttributes(?int $actor): array
    {
        $options = $actor !== null ? ['authenticatedAs' => $actor] : [];

        $response = $this->send($this->request('GET', '/api', $options));

        $this->assertEquals(200, $response->getStatusCode());

        return json_decode($response->getBody()->getContents(), true)['data']['attributes'];
    }

    #[Test]
    public function admin_can_sort_by_last_seen()
    {
        $attributes = $this->forumAttributes(1);

        $this->assertArrayHasKey('userDirectoryCanSortByLastSeen', $attributes);
        $this->assertTrue($attributes['userDirectoryCanSortByLastSeen']);
    }

    #[Test]
    public function normal_user_cannot_sort_by_last_seen_by_default()
    {
        $attributes = $this->forumAttributes(2);

        $this->assertArrayHasKey('userDirectoryCanSortByLastSeen', $attributes);
        $this->assertFalse($attributes['userDirectoryCanSortByLastSeen']);
    }

    #[Test]
    public function guest_cannot_sort_by_last_seen()
    {
        $attributes = $this->forumAttributes(null);

        $this->assertArrayHasKey('userDirectoryCanSortByLastSeen', $attributes);
        $this->assertFalse($attributes['userDirectoryCanSortByLastSeen']);
    }

    #[Test]
    public function normal_user_can_sort_by_last_seen_when_permission_granted()
    {
        $this->prepareDatabase([
            'group_permission' => [
                ['permission' => 'user.viewLastSeenAt', 'group_id' => 3],
            ],
        ]);

        $attributes = $this->forumAttributes(2);

        $this->assertTrue($attributes['userDirectoryCanSortByLastSeen']);
    }

    #[Test]
    public function guest_can_sort_by_last_seen_when_permission_granted()
    {
        $this->prepareDatabase([
            'group_permission' => [
                ['permission' => 'user.viewLastSeenAt', 'group_id' => 2],
            ],
        ]);

        $attributes = $this->forumAttributes(null);

        $this->assertTrue($attributes['userDirectoryCanSortByLastSeen']);
    }
}
