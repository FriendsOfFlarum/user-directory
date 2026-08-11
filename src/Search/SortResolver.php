<?php

/*
 * This file is part of fof/user-directory.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserDirectory\Search;

use Flarum\Api\Resource\UserResource;
use Flarum\User\User;

/**
 * Resolves a directory sort key to the API sort parameter for a given actor.
 *
 * The available keys come from core's own alias map — `UserResource::sortMap()`,
 * built from the `ascendingAlias()` / `descendingAlias()` calls registered in
 * `extend.php` — so there is no second copy of the sort list to keep in sync.
 *
 * That map carries no actor context, though, and some sorts are permission
 * gated. Requesting one without the permission makes the API reject the entire
 * request, which is what broke the directory in issue #66, so those keys are
 * filtered out here before the sort is forwarded.
 */
class SortResolver
{
    /**
     * Sort keys that require a permission, keyed by the permission they need.
     *
     * @var array<string, string>
     */
    public const GATED_SORTS = [
        'seen_recent' => 'user.viewLastSeenAt',
        'seen_oldest' => 'user.viewLastSeenAt',
    ];

    public function __construct(
        protected UserResource $resource
    ) {
    }

    /**
     * The sort keys this actor may use, mapped to their API sort parameter.
     *
     * @return array<string, string>
     */
    public function availableFor(User $actor): array
    {
        return array_filter(
            $this->resource->sortMap(),
            fn (string $key) => $this->isAllowed($key, $actor),
            ARRAY_FILTER_USE_KEY
        );
    }

    /**
     * Map a sort key to its API sort parameter.
     *
     * Unknown keys, and gated keys this actor cannot use, resolve to an empty
     * string so the directory falls back to the API's default ordering rather
     * than sending a sort that would be rejected.
     *
     * The key arrives from the query string, so it may be any type a client
     * cares to send; anything that is not a usable string is treated as absent.
     */
    public function resolve(mixed $key, User $actor): string
    {
        if (! is_string($key) || $key === '') {
            return '';
        }

        return $this->availableFor($actor)[$key] ?? '';
    }

    private function isAllowed(string $key, User $actor): bool
    {
        $permission = self::GATED_SORTS[$key] ?? null;

        return $permission === null || $actor->hasPermission($permission);
    }
}
