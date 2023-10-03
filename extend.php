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

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less')
        ->route('/users', 'fof_user_directory', Content\UserDirectory::class),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(PermissionBasedForumSettings::class),

    (new Extend\Policy())
        ->globalPolicy(Access\UserPolicy::class),

    (new Extend\View())
        ->namespace('fof.user-directory', __DIR__.'/resources/views'),

    (new Extend\Settings())
        ->default('fof-user-directory.admin.settings.link', false)
        ->default('fof-user-directory.use-small-cards', false)
        ->default('fof-user-directory.disable-global-search-source', false)
        ->default('fof-user-directory.default-sort', 'default')
        ->default('fof-user-directory.link-group-mentions', true)
        ->serializeToForum('userDirectorySmallCards', 'fof-user-directory.use-small-cards', 'boolVal')
        ->serializeToForum('userDirectoryDisableGlobalSearchSource', 'fof-user-directory.disable-global-search-source', 'boolVal')
        ->serializeToForum('userDirectoryLinkGroupMentions', 'fof-user-directory.link-group-mentions', 'boolVal'),
];
