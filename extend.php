<?php

namespace Flagrow\UserDirectory;

use Flarum\Extend;
use Flarum\Foundation\Application;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/resources/less/admin.less'),
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less')
        ->route('/users', 'flagrow_user_directory', Http\Controllers\UserDirectoryController::class),
    new Extend\Locales(__DIR__ . '/resources/locale'),
    (new Extend\Routes('api'))
        ->post('/admin-mail', 'flagrow.user-directory.create-mail', Api\Controller\SendAdminEmailController::class),
    (new Extend\Compat(function (Application $app) {
        $app->register(Providers\ViewProvider::class);
    }))
];
