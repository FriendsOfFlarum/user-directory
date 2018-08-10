<?php

namespace Flagrow\UserDirectory;

use Flarum\Extend;
use Flarum\Foundation\Application;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/assets/less/user-card.less'),
    new Extend\Locales(__DIR__ . '/assets/locale'),
    function (Application $app) {
        $app->register(Providers\ViewProvider::class);
    }
];
