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
 * Covers the server-rendered /users page beyond the permission-gated sorts,
 * which UserDirectorySortTest already guards.
 *
 * These pin the behaviour the sort-map refactor must preserve: every ungated
 * sort key still resolves, access control still holds, and pagination and the
 * free-text filter still reach the API.
 */
class UserDirectoryPageTest extends TestCase
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
                    'username'           => 'aardvark',
                    'password'           => '$2y$10$LO59tiT7uggl6Oe23o/O6.utnF6ipngYjvMvaxo1TciKqBttDNKim',
                    'email'              => 'aardvark@machine.local',
                    'is_email_confirmed' => 1,
                    'joined_at'          => '2020-01-01 00:00:00',
                ],
                [
                    'id'                 => 4,
                    'username'           => 'zebra',
                    'password'           => '$2y$10$LO59tiT7uggl6Oe23o/O6.utnF6ipngYjvMvaxo1TciKqBttDNKim',
                    'email'              => 'zebra@machine.local',
                    'is_email_confirmed' => 1,
                    'joined_at'          => '2024-01-01 00:00:00',
                ],
            ],
            'group_permission' => [
                ['permission' => 'fof.user-directory.view', 'group_id' => 3],
                ['permission' => 'searchUsers', 'group_id' => 3],
            ],
        ]);
    }

    protected function directoryRequest(?int $actor, array $queryParams = [])
    {
        $options = $actor !== null ? ['authenticatedAs' => $actor] : [];

        $request = $this->request('GET', '/users', $options);

        if ($queryParams) {
            $request = $request->withQueryParams($queryParams);
        }

        return $this->send($request);
    }

    protected function renderedUsernames($response): array
    {
        preg_match_all(
            '/<li>\s*<a [^>]*>\s*(\S+)\s*<\/a>\s*<\/li>/',
            $response->getBody()->getContents(),
            $matches
        );

        return $matches[1];
    }

    /**
     * Every ungated key in the sort map must still resolve to a working sort.
     * This is the regression net for replacing the hand-rolled PHP map with
     * core's alias-derived one — a key silently dropping out of the map would
     * otherwise only show as "ordering looks a bit off".
     */
    #[Test]
    public function username_az_sorts_alphabetically()
    {
        $usernames = $this->renderedUsernames($this->directoryRequest(1, ['sort' => 'username_az']));

        $this->assertNotEmpty($usernames);
        $this->assertLessThan(
            array_search('zebra', $usernames),
            array_search('aardvark', $usernames),
            'username_az should place aardvark before zebra'
        );
    }

    #[Test]
    public function username_za_sorts_reverse_alphabetically()
    {
        $usernames = $this->renderedUsernames($this->directoryRequest(1, ['sort' => 'username_za']));

        $this->assertNotEmpty($usernames);
        $this->assertGreaterThan(
            array_search('zebra', $usernames),
            array_search('aardvark', $usernames),
            'username_za should place zebra before aardvark'
        );
    }

    #[Test]
    public function newest_sorts_most_recently_joined_first()
    {
        $usernames = $this->renderedUsernames($this->directoryRequest(1, ['sort' => 'newest']));

        $this->assertNotEmpty($usernames);
        $this->assertLessThan(
            array_search('aardvark', $usernames),
            array_search('zebra', $usernames),
            'newest should place the 2024 joiner before the 2020 one'
        );
    }

    #[Test]
    public function oldest_sorts_earliest_joined_first()
    {
        $usernames = $this->renderedUsernames($this->directoryRequest(1, ['sort' => 'oldest']));

        $this->assertNotEmpty($usernames);
        $this->assertLessThan(
            array_search('zebra', $usernames),
            array_search('aardvark', $usernames),
            'oldest should place the 2020 joiner before the 2024 one'
        );
    }

    #[Test]
    public function most_discussions_is_accepted()
    {
        $response = $this->directoryRequest(1, ['sort' => 'most_discussions']);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertNotEmpty($this->renderedUsernames($response));
    }

    #[Test]
    public function least_discussions_is_accepted()
    {
        $response = $this->directoryRequest(1, ['sort' => 'least_discussions']);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertNotEmpty($this->renderedUsernames($response));
    }

    /**
     * The admin-configured default applies when no sort is in the URL.
     */
    #[Test]
    public function default_sort_setting_is_applied_when_no_sort_requested()
    {
        $this->setting('fof-user-directory.default-sort', 'username_za');

        $usernames = $this->renderedUsernames($this->directoryRequest(1));

        $this->assertNotEmpty($usernames);
        $this->assertGreaterThan(
            array_search('zebra', $usernames),
            array_search('aardvark', $usernames),
            'The configured default sort should order the unsorted request'
        );
    }

    #[Test]
    public function explicit_sort_overrides_the_default_setting()
    {
        $this->setting('fof-user-directory.default-sort', 'username_za');

        $usernames = $this->renderedUsernames($this->directoryRequest(1, ['sort' => 'username_az']));

        $this->assertNotEmpty($usernames);
        $this->assertLessThan(
            array_search('zebra', $usernames),
            array_search('aardvark', $usernames),
            'An explicit sort in the URL should win over the configured default'
        );
    }

    /**
     * A default sort left at the empty-string default must not be forwarded as
     * a sort param.
     */
    #[Test]
    public function empty_default_sort_setting_still_renders()
    {
        $this->setting('fof-user-directory.default-sort', '');

        $response = $this->directoryRequest(1);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertNotEmpty($this->renderedUsernames($response));
    }

    /**
     * A stale default sort — e.g. a key removed by an extension upgrade — must
     * degrade rather than break every unsorted page load.
     */
    #[Test]
    public function unknown_default_sort_setting_still_renders()
    {
        $this->setting('fof-user-directory.default-sort', 'no_longer_exists');

        $response = $this->directoryRequest(1);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertNotEmpty($this->renderedUsernames($response));
    }

    #[Test]
    public function free_text_filter_narrows_the_result_set()
    {
        $usernames = $this->renderedUsernames($this->directoryRequest(1, ['q' => 'aardvark']));

        $this->assertContains('aardvark', $usernames);
        $this->assertNotContains('zebra', $usernames, 'The q filter should exclude non-matching users');
    }

    /**
     * Gambit parsing moved entirely to the JS `GambitManager` in Flarum 2.x —
     * the backend only understands structured filter keys. Forwarding the raw
     * `group:1` text as `filter[q]` therefore matches nothing at all, so the
     * server-rendered page must translate the gambit into `filter[group]`
     * itself.
     *
     * Group 1 is Admins, which only the admin user belongs to.
     */
    #[Test]
    public function group_gambit_filters_by_group_id()
    {
        $usernames = $this->renderedUsernames($this->directoryRequest(1, ['q' => 'group:1']));

        $this->assertContains('admin', $usernames, 'The group gambit should include members of the group');
        $this->assertNotContains('zebra', $usernames, 'The group gambit should exclude users outside the group');
    }

    #[Test]
    public function multiple_group_gambits_are_all_applied()
    {
        $this->prepareDatabase([
            'group_user' => [
                ['user_id' => 3, 'group_id' => 4],
            ],
        ]);

        // Group 4 is Members, which aardvark now belongs to.
        $usernames = $this->renderedUsernames($this->directoryRequest(1, ['q' => 'group:1 group:4']));

        $this->assertContains('admin', $usernames, 'Members of the first group should be included');
        $this->assertContains('aardvark', $usernames, 'Members of the second group should be included');
        $this->assertNotContains('zebra', $usernames, 'Users in neither group should be excluded');
    }

    /**
     * The gambit must be stripped out of the free-text term, otherwise the
     * remaining fulltext search looks for the literal string "group:1".
     */
    #[Test]
    public function group_gambit_combines_with_free_text()
    {
        $this->prepareDatabase([
            'group_user' => [
                ['user_id' => 3, 'group_id' => 4],
                ['user_id' => 4, 'group_id' => 4],
            ],
        ]);

        $usernames = $this->renderedUsernames($this->directoryRequest(1, ['q' => 'group:4 aardvark']));

        $this->assertContains('aardvark', $usernames, 'The free-text term should still match within the group');
        $this->assertNotContains('zebra', $usernames, 'The free-text term should still narrow the group');
    }

    #[Test]
    public function unknown_group_gambit_returns_no_users_rather_than_erroring()
    {
        $response = $this->directoryRequest(1, ['q' => 'group:99999']);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEmpty($this->renderedUsernames($response), 'A group nobody belongs to should match no users');
    }

    #[Test]
    public function second_page_returns_a_different_slice()
    {
        $first = $this->renderedUsernames($this->directoryRequest(1, ['sort' => 'username_az']));
        $second = $this->renderedUsernames($this->directoryRequest(1, ['sort' => 'username_az', 'page' => 2]));

        $this->assertNotEmpty($first);
        // Only four users exist, so page 2 is empty — the point is that the
        // offset is honoured rather than page 1 being repeated.
        $this->assertNotSame($first, $second, 'Page 2 must not repeat page 1');
    }

    /**
     * A page number below 1 would compute a negative offset, which the API
     * rejects. Out-of-range and non-numeric values must be clamped instead.
     */
    #[Test]
    public function page_zero_is_clamped_to_the_first_page()
    {
        $first = $this->renderedUsernames($this->directoryRequest(1, ['sort' => 'username_az']));
        $zero = $this->renderedUsernames($this->directoryRequest(1, ['sort' => 'username_az', 'page' => 0]));

        $this->assertSame($first, $zero, 'page=0 should render the first page');
    }

    #[Test]
    public function negative_page_is_clamped_to_the_first_page()
    {
        $first = $this->renderedUsernames($this->directoryRequest(1, ['sort' => 'username_az']));
        $negative = $this->renderedUsernames($this->directoryRequest(1, ['sort' => 'username_az', 'page' => -5]));

        $this->assertSame($first, $negative, 'A negative page should render the first page');
    }

    #[Test]
    public function non_numeric_page_is_clamped_to_the_first_page()
    {
        $first = $this->renderedUsernames($this->directoryRequest(1, ['sort' => 'username_az']));
        $bogus = $this->renderedUsernames($this->directoryRequest(1, ['sort' => 'username_az', 'page' => 'banana']));

        $this->assertSame($first, $bogus, 'A non-numeric page should render the first page');
    }

    /**
     * An array where a string is expected must not fatal — PHP would raise a
     * conversion error if the value were cast blindly.
     */
    #[Test]
    public function array_query_parameters_do_not_break_the_page()
    {
        $response = $this->directoryRequest(1, ['q' => ['unexpected' => 'array']]);

        $this->assertEquals(200, $response->getStatusCode());
    }

    #[Test]
    public function array_sort_parameter_does_not_break_the_page()
    {
        $response = $this->directoryRequest(1, ['sort' => ['unexpected' => 'array']]);

        $this->assertEquals(200, $response->getStatusCode());
    }

    #[Test]
    public function guest_without_permission_is_denied()
    {
        $response = $this->directoryRequest(null);

        $this->assertEquals(403, $response->getStatusCode());
    }

    #[Test]
    public function guest_with_permission_can_view()
    {
        $this->prepareDatabase([
            'group_permission' => [
                ['permission' => 'fof.user-directory.view', 'group_id' => 2],
                ['permission' => 'searchUsers', 'group_id' => 2],
            ],
        ]);

        $response = $this->directoryRequest(null);

        $this->assertEquals(200, $response->getStatusCode());
    }

    /**
     * seeUserList requires both fof.user-directory.view and searchUsers.
     * Holding only one must not grant access.
     */
    #[Test]
    public function view_permission_without_search_users_is_denied()
    {
        $this->prepareDatabase([
            'group_permission' => [
                ['permission' => 'fof.user-directory.view', 'group_id' => 2],
            ],
        ]);

        $response = $this->directoryRequest(null);

        $this->assertEquals(403, $response->getStatusCode());
    }

    /**
     * The list renders group badges, so the API request must ask for the
     * groups relationship to be included in the preloaded document.
     */
    #[Test]
    public function the_payload_includes_the_groups_relationship()
    {
        $response = $this->directoryRequest(1);

        $this->assertStringContainsString(
            '"type":"groups"',
            $response->getBody()->getContents(),
            'The preloaded API document should include related groups'
        );
    }

    #[Test]
    public function the_page_payload_carries_the_query_and_sort_back_to_the_frontend()
    {
        $response = $this->directoryRequest(1, ['sort' => 'username_az', 'q' => 'aardvark']);
        $body = $response->getBody()->getContents();

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertStringContainsString('username_az', $body, 'The payload should echo the requested sort');
        $this->assertStringContainsString('aardvark', $body, 'The payload should echo the requested query');
    }
}
