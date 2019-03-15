<?php

namespace Flagrow\UserDirectory;

use Flarum\Extend;
use Flarum\Foundation\Application;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less')
        ->route('/users', 'flagrow_user_directory', Content\UserDirectory::class),
    new Extend\Locales(__DIR__ . '/resources/locale'),
    function (Application $app) {
        $app->register(Providers\ViewProvider::class);
    },
];
