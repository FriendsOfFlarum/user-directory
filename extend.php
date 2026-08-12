<?php

/*
 * This file is part of fof/user-directory.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserDirectory;

use Flarum\Api\Resource;
use Flarum\Api\Sort;
use Flarum\Extend;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->jsDirectory(__DIR__.'/js/dist/forum')
        ->css(__DIR__.'/resources/less/forum.less')
        ->route('/users', 'fof_user_directory', Content\UserDirectory::class),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\ApiResource(Resource\ForumResource::class))
        ->fields(Api\PermissionBasedForumSettings::class),

    // Register the directory's sort keys as aliases on core's own sorts, so
    // `UserResource::sortMap()` is the single source of truth for the mapping
    // and the server-rendered page needs no duplicate of it.
    (new Extend\ApiResource(Resource\UserResource::class))
        ->sort('username', fn (Sort\SortColumn $sort) => $sort
            ->ascendingAlias('username_az')
            ->descendingAlias('username_za'))
        ->sort('joinedAt', fn (Sort\SortColumn $sort) => $sort
            ->ascendingAlias('oldest')
            ->descendingAlias('newest'))
        ->sort('discussionCount', fn (Sort\SortColumn $sort) => $sort
            ->ascendingAlias('least_discussions')
            ->descendingAlias('most_discussions'))
        // Core already gates the lastSeenAt sort itself; SortResolver drops
        // these aliases for actors without the permission so the request is
        // never sent in the first place. See issue #66.
        ->sort('lastSeenAt', fn (Sort\SortColumn $sort) => $sort
            ->ascendingAlias('seen_oldest')
            ->descendingAlias('seen_recent')),

    (new Extend\Policy())
        ->globalPolicy(Access\UserPolicy::class),

    (new Extend\View())
        ->namespace('fof.user-directory', __DIR__.'/resources/views'),

    (new Extend\Settings())
        // Note the key is hyphenated, unlike the dotted keys below. It is the
        // name the admin panel and PermissionBasedForumSettings both read;
        // the default was previously registered against the translation key
        // by mistake, so it never applied.
        ->default('fof-user-directory-link', false)
        ->default('fof-user-directory.use-small-cards', false)
        ->default('fof-user-directory.disable-global-search-source', false)
        ->default('fof-user-directory.default-sort', '')
        ->default('fof-user-directory.link-group-mentions', true)
        ->serializeToForum('userDirectorySmallCards', 'fof-user-directory.use-small-cards', 'boolVal')
        ->serializeToForum('userDirectoryDisableGlobalSearchSource', 'fof-user-directory.disable-global-search-source', 'boolVal')
        ->serializeToForum('userDirectoryLinkGroupMentions', 'fof-user-directory.link-group-mentions', 'boolVal'),
];
