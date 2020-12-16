<?php

namespace FoF\UserDirectory;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less')
        ->route('/users', 'fof_user_directory', Content\UserDirectory::class),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->mutate(PermissionBasedForumSettings::class),

    (new Extend\View())
        ->namespace('fof.user-directory', __DIR__.'/resources/views'),
];
