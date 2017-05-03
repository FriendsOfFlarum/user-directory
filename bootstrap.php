<?php

namespace Flagrow\UserDirectory;

use Flarum\Foundation\Application;
use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events, Application $app) {
    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\AddWebRoutes::class);
    $app->register(Providers\ViewProvider::class);
};
