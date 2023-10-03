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

class ForumAttributeTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-user-directory');

        $this->prepareDatabase([
            'users' => [
                $this->normalUser(),
            ],
        ]);
    }

    protected function normalUserDirectoryPermission()
    {
        $this->prepareDatabase([
            'group_permission' => [
                [
                    'permission' => 'fof.user-directory.view',
                    'group_id'   => 3,
                ],
            ],
        ]);
    }

    protected function guestUserDirectoryPermission()
    {
        $this->prepareDatabase([
            'group_permission' => [
                [
                    'permission' => 'fof.user-directory.view',
                    'group_id'   => 2,
                ],
                [
                    'permission' => 'searchUsers',
                    'group_id'   => 2,
                ],
            ],
        ]);
    }

    /**
     * @test
     */
    public function admin_does_not_have_user_directory_link_when_setting_disabled()
    {
        $response = $this->send(
            $this->request(
                'GET',
                '/api',
                [
                    'authenticatedAs' => 1,
                ]
            )
        );

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertArrayHasKey('canSeeUserDirectoryLink', $data['data']['attributes']);
        $this->assertFalse($data['data']['attributes']['canSeeUserDirectoryLink']);
    }

    /**
     * @test
     */
    public function admin_has_user_directory_link_when_setting_enabled()
    {
        $this->setting('fof-user-directory-link', true);

        $response = $this->send(
            $this->request(
                'GET',
                '/api',
                [
                    'authenticatedAs' => 1,
                ]
            )
        );

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertArrayHasKey('canSeeUserDirectoryLink', $data['data']['attributes']);
        $this->assertTrue($data['data']['attributes']['canSeeUserDirectoryLink']);
    }

    /**
     * @test
     */
    public function normal_user_does_not_have_user_directory_link_by_default()
    {
        $response = $this->send(
            $this->request(
                'GET',
                '/api',
                [
                    'authenticatedAs' => 2,
                ]
            )
        );

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertArrayHasKey('canSeeUserDirectoryLink', $data['data']['attributes']);
        $this->assertFalse($data['data']['attributes']['canSeeUserDirectoryLink']);
    }

    /**
     * @test
     */
    public function normal_user_does_not_have_user_directory_link_when_permission_is_granted_and_default_setting()
    {
        $this->normalUserDirectoryPermission();

        $response = $this->send(
            $this->request(
                'GET',
                '/api',
                [
                    'authenticatedAs' => 2,
                ]
            )
        );

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertArrayHasKey('canSeeUserDirectoryLink', $data['data']['attributes']);
        $this->assertFalse($data['data']['attributes']['canSeeUserDirectoryLink']);
    }

    /**
     * @test
     */
    public function normal_user_does_not_have_user_directory_link_when_setting_off_and_no_permission()
    {
        $this->setting('fof-user-directory-link', false);

        $response = $this->send(
            $this->request(
                'GET',
                '/api',
                [
                    'authenticatedAs' => 2,
                ]
            )
        );

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertArrayHasKey('canSeeUserDirectoryLink', $data['data']['attributes']);
        $this->assertFalse($data['data']['attributes']['canSeeUserDirectoryLink']);
    }

    /**
     * @test
     */
    public function normal_user_does_not_have_user_directory_link_when_setting_off_but_permission_granted()
    {
        $this->normalUserDirectoryPermission();
        $this->setting('fof-user-directory-link', false);

        $response = $this->send(
            $this->request(
                'GET',
                '/api',
                [
                    'authenticatedAs' => 2,
                ]
            )
        );

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertArrayHasKey('canSeeUserDirectoryLink', $data['data']['attributes']);
        $this->assertFalse($data['data']['attributes']['canSeeUserDirectoryLink']);
    }

    /**
     * @test
     */
    public function normal_user_does_have_user_directory_link_when_setting_on_and_permission_granted()
    {
        $this->normalUserDirectoryPermission();
        $this->setting('fof-user-directory-link', true);

        $response = $this->send(
            $this->request(
                'GET',
                '/api',
                [
                    'authenticatedAs' => 2,
                ]
            )
        );

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertArrayHasKey('canSeeUserDirectoryLink', $data['data']['attributes']);
        $this->assertTrue($data['data']['attributes']['canSeeUserDirectoryLink']);
    }

    /**
     * @test
     */
    public function guest_does_not_have_user_directory_link_by_default()
    {
        $response = $this->send(
            $this->request(
                'GET',
                '/api'
            )
        );

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertArrayHasKey('canSeeUserDirectoryLink', $data['data']['attributes']);
        $this->assertFalse($data['data']['attributes']['canSeeUserDirectoryLink']);
    }

    /**
     * @test
     */
    public function guest_does_not_have_user_directory_link_when_permission_is_granted_and_default_setting()
    {
        $this->guestUserDirectoryPermission();

        $response = $this->send(
            $this->request(
                'GET',
                '/api'
            )
        );

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertArrayHasKey('canSeeUserDirectoryLink', $data['data']['attributes']);
        $this->assertFalse($data['data']['attributes']['canSeeUserDirectoryLink']);
    }

    /**
     * @test
     */
    public function guest_does_not_have_user_directory_link_when_setting_off_and_no_permission()
    {
        $this->setting('fof-user-directory-link', false);

        $response = $this->send(
            $this->request(
                'GET',
                '/api'
            )
        );

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertArrayHasKey('canSeeUserDirectoryLink', $data['data']['attributes']);
        $this->assertFalse($data['data']['attributes']['canSeeUserDirectoryLink']);
    }

    /**
     * @test
     */
    public function guest_does_not_have_user_directory_link_when_setting_off_but_permission_granted()
    {
        $this->guestUserDirectoryPermission();
        $this->setting('fof-user-directory-link', false);

        $response = $this->send(
            $this->request(
                'GET',
                '/api'
            )
        );

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody()->getContents(), true);
        $this->assertArrayHasKey('canSeeUserDirectoryLink', $data['data']['attributes']);
        $this->assertFalse($data['data']['attributes']['canSeeUserDirectoryLink']);
    }

    /**
     * @test
     */
    public function guest_does_have_user_directory_link_when_setting_on_and_permission_granted()
    {
        $this->guestUserDirectoryPermission();
        $this->setting('fof-user-directory-link', true);

        $response = $this->send(
            $this->request(
                'GET',
                '/api'
            )
        );

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertArrayHasKey('canSeeUserDirectoryLink', $data['data']['attributes']);
        $this->assertTrue($data['data']['attributes']['canSeeUserDirectoryLink']);
    }

    /**
     * @test
     */
    public function required_attributes_are_serialized_to_forum_with_correct_defaults()
    {
        $response = $this->send(
            $this->request(
                'GET',
                '/api'
            )
        );

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertArrayHasKey('userDirectorySmallCards', $data['data']['attributes']);
        $this->assertFalse($data['data']['attributes']['userDirectorySmallCards'], 'Small cards');

        $this->assertArrayHasKey('userDirectoryDisableGlobalSearchSource', $data['data']['attributes']);
        $this->assertFalse($data['data']['attributes']['userDirectoryDisableGlobalSearchSource'], 'Disable global search source');

        $this->assertArrayHasKey('userDirectoryDefaultSort', $data['data']['attributes']);
        $this->assertEquals('default', $data['data']['attributes']['userDirectoryDefaultSort'], 'Default sort');

        $this->assertArrayHasKey('userDirectoryLinkGroupMentions', $data['data']['attributes']);
        $this->assertTrue($data['data']['attributes']['userDirectoryLinkGroupMentions'], 'Link group mentions');
    }
}
