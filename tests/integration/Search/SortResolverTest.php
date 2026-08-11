<?php

/*
 * This file is part of fof/user-directory.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserDirectory\tests\integration\Search;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use FoF\UserDirectory\Search\SortResolver;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;

/**
 * Exercises the resolver against the real UserResource so the aliases
 * registered in extend.php are part of what is under test — a mock would
 * happily agree with a sort map that no longer matches core.
 */
class SortResolverTest extends TestCase
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

    protected function resolver(): SortResolver
    {
        return $this->app()->getContainer()->make(SortResolver::class);
    }

    protected function actor(int $id): User
    {
        $this->app();

        return User::findOrFail($id);
    }

    public static function ungatedSorts(): array
    {
        return [
            'username_az'       => ['username_az', 'username'],
            'username_za'       => ['username_za', '-username'],
            'oldest'            => ['oldest', 'joinedAt'],
            'newest'            => ['newest', '-joinedAt'],
            'least_discussions' => ['least_discussions', 'discussionCount'],
            'most_discussions'  => ['most_discussions', '-discussionCount'],
        ];
    }

    #[Test]
    #[DataProvider('ungatedSorts')]
    public function ungated_sorts_resolve_for_any_actor(string $key, string $expected)
    {
        $resolver = $this->resolver();

        $this->assertSame($expected, $resolver->resolve($key, $this->actor(2)));
    }

    #[Test]
    public function gated_sorts_resolve_for_a_permitted_actor()
    {
        $resolver = $this->resolver();
        $admin = $this->actor(1);

        $this->assertSame('-lastSeenAt', $resolver->resolve('seen_recent', $admin));
        $this->assertSame('lastSeenAt', $resolver->resolve('seen_oldest', $admin));
    }

    #[Test]
    public function gated_sorts_are_dropped_for_an_unpermitted_actor()
    {
        $resolver = $this->resolver();
        $normal = $this->actor(2);

        $this->assertSame('', $resolver->resolve('seen_recent', $normal));
        $this->assertSame('', $resolver->resolve('seen_oldest', $normal));
    }

    #[Test]
    public function gated_sorts_resolve_once_the_permission_is_granted()
    {
        $this->prepareDatabase([
            'group_permission' => [
                ['permission' => 'user.viewLastSeenAt', 'group_id' => 3],
            ],
        ]);

        $this->assertSame('-lastSeenAt', $this->resolver()->resolve('seen_recent', $this->actor(2)));
    }

    #[Test]
    public function unknown_keys_resolve_to_an_empty_string()
    {
        $resolver = $this->resolver();

        $this->assertSame('', $resolver->resolve('not_a_sort', $this->actor(1)));
    }

    #[Test]
    public function null_and_empty_keys_resolve_to_an_empty_string()
    {
        $resolver = $this->resolver();
        $admin = $this->actor(1);

        $this->assertSame('', $resolver->resolve(null, $admin));
        $this->assertSame('', $resolver->resolve('', $admin));
    }

    /**
     * The key comes straight from the query string, so a client can send an
     * array or a number. Anything that is not a usable string is treated as
     * absent rather than allowed to reach a string-typed parameter.
     */
    #[Test]
    public function non_string_keys_resolve_to_an_empty_string()
    {
        $resolver = $this->resolver();
        $admin = $this->actor(1);

        $this->assertSame('', $resolver->resolve(['array'], $admin));
        $this->assertSame('', $resolver->resolve(42, $admin));
        $this->assertSame('', $resolver->resolve(true, $admin));
    }

    /**
     * A raw API sort param is not a directory sort key — accepting it would let
     * a crafted URL bypass the alias layer entirely.
     */
    #[Test]
    public function raw_api_sort_params_are_not_accepted_as_keys()
    {
        $resolver = $this->resolver();

        $this->assertSame('', $resolver->resolve('-lastSeenAt', $this->actor(2)));
        $this->assertSame('', $resolver->resolve('lastSeenAt', $this->actor(2)));
    }

    #[Test]
    public function available_sorts_exclude_gated_keys_for_unpermitted_actors()
    {
        $available = $this->resolver()->availableFor($this->actor(2));

        $this->assertArrayHasKey('username_az', $available);
        $this->assertArrayNotHasKey('seen_recent', $available);
        $this->assertArrayNotHasKey('seen_oldest', $available);
    }

    #[Test]
    public function available_sorts_include_gated_keys_for_permitted_actors()
    {
        $available = $this->resolver()->availableFor($this->actor(1));

        $this->assertArrayHasKey('seen_recent', $available);
        $this->assertArrayHasKey('seen_oldest', $available);
    }

    /**
     * Guards the drift this refactor exists to prevent: if a key is ever added
     * to the frontend sort map without a matching alias here, the directory
     * silently falls back to default ordering instead of sorting.
     */
    #[Test]
    public function every_frontend_sort_key_has_a_backend_alias()
    {
        $available = $this->resolver()->availableFor($this->actor(1));

        $frontendKeys = [
            'username_az', 'username_za',
            'newest', 'oldest',
            'most_discussions', 'least_discussions',
            'seen_recent', 'seen_oldest',
        ];

        foreach ($frontendKeys as $key) {
            $this->assertArrayHasKey($key, $available, "Sort key '$key' has no registered backend alias");
        }
    }
}
