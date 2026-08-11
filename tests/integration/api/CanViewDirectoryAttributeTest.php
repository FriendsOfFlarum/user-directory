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

use Flarum\Group\Permission;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

/**
 * `canSeeUserDirectoryLink` answers a narrow question — may this actor be shown
 * the *sidebar link* — because it also requires the link setting to be on.
 *
 * Several features need the broader question instead: may this actor reach the
 * directory at all. Using the link attribute for those meant that turning the
 * sidebar link off silently disabled global search integration and group
 * mention links too, for users who had every relevant permission.
 */
class CanViewDirectoryAttributeTest extends TestCase
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

    protected function grantDirectoryAccess(int $groupId): void
    {
        $this->prepareDatabase([
            'group_permission' => [
                ['permission' => 'fof.user-directory.view', 'group_id' => $groupId],
                ['permission' => 'searchUsers', 'group_id' => $groupId],
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
    public function admin_can_view_the_directory()
    {
        $attributes = $this->forumAttributes(1);

        $this->assertArrayHasKey('canViewUserDirectory', $attributes);
        $this->assertTrue($attributes['canViewUserDirectory']);
    }

    #[Test]
    public function normal_user_cannot_view_the_directory_by_default()
    {
        $attributes = $this->forumAttributes(2);

        $this->assertFalse($attributes['canViewUserDirectory']);
    }

    #[Test]
    public function guest_cannot_view_the_directory_by_default()
    {
        $this->assertFalse($this->forumAttributes(null)['canViewUserDirectory']);
    }

    #[Test]
    public function normal_user_can_view_the_directory_once_permitted()
    {
        $this->grantDirectoryAccess(3);

        $this->assertTrue($this->forumAttributes(2)['canViewUserDirectory']);
    }

    #[Test]
    public function guest_can_view_the_directory_once_permitted()
    {
        $this->grantDirectoryAccess(2);

        $this->assertTrue($this->forumAttributes(null)['canViewUserDirectory']);
    }

    /**
     * Holding only one half of `seeUserList` must not grant access.
     *
     * Core grants `searchUsers` to Members by default, so it has to be revoked
     * to test the directory permission in isolation.
     */
    #[Test]
    public function the_view_permission_alone_is_not_enough()
    {
        $this->prepareDatabase([
            'group_permission' => [
                ['permission' => 'fof.user-directory.view', 'group_id' => 3],
            ],
        ]);

        $this->app();
        Permission::where('permission', 'searchUsers')->delete();

        $this->assertFalse($this->forumAttributes(2)['canViewUserDirectory']);
    }

    #[Test]
    public function search_users_alone_is_not_enough()
    {
        $this->prepareDatabase([
            'group_permission' => [
                ['permission' => 'searchUsers', 'group_id' => 3],
            ],
        ]);

        $this->assertFalse($this->forumAttributes(2)['canViewUserDirectory']);
    }

    /**
     * The crux: access to the directory must not depend on whether an admin
     * chose to advertise it in the sidebar.
     */
    #[Test]
    public function viewing_does_not_depend_on_the_sidebar_link_setting()
    {
        $this->grantDirectoryAccess(3);
        $this->setting('fof-user-directory-link', false);

        $attributes = $this->forumAttributes(2);

        $this->assertTrue($attributes['canViewUserDirectory'], 'Access must not be tied to the sidebar link setting');
        $this->assertFalse($attributes['canSeeUserDirectoryLink'], 'The sidebar link itself should still be hidden');
    }

    #[Test]
    public function both_attributes_are_true_when_the_link_is_enabled()
    {
        $this->grantDirectoryAccess(3);
        $this->setting('fof-user-directory-link', true);

        $attributes = $this->forumAttributes(2);

        $this->assertTrue($attributes['canViewUserDirectory']);
        $this->assertTrue($attributes['canSeeUserDirectoryLink']);
    }

    /**
     * Without permission, neither is true however the setting is configured.
     */
    #[Test]
    public function neither_attribute_is_true_without_permission()
    {
        $this->setting('fof-user-directory-link', true);

        $attributes = $this->forumAttributes(2);

        $this->assertFalse($attributes['canViewUserDirectory']);
        $this->assertFalse($attributes['canSeeUserDirectoryLink']);
    }
}
