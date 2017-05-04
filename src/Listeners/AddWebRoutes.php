<?php

namespace Flagrow\UserDirectory\Listeners;

use Flagrow\UserDirectory\Http\Controllers\UserDirectoryController;
use Flarum\Event\ConfigureForumRoutes;
use Illuminate\Contracts\Events\Dispatcher;

class AddWebRoutes
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureForumRoutes::class, [$this, 'addDirectoryPage']);
    }

    /**
     * @param ConfigureForumRoutes $event
     */
    public function addDirectoryPage(ConfigureForumRoutes $event)
    {
        $event->get(
            '/users',
            'flagrow_user_directory',
            UserDirectoryController::class
        );
    }
}
