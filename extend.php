<?php

namespace FoF\UserDirectory;

use Flarum\Extend;
use Flarum\Foundation\Application;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less')
        ->route('/users', 'fof_user_directory', Content\UserDirectory::class),
    new Extend\Locales(__DIR__ . '/resources/locale'),
    new \FoF\UserDirectory\Extend\Settings(),
    function (Application $app) {
        $app->register(Providers\ViewProvider::class);
    },
];
