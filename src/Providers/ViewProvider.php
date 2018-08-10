<?php

namespace Flagrow\UserDirectory\Providers;

use Flagrow\UserDirectory\Http\Controllers\UserDirectoryController;
use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Http\RouteCollection;
use Flarum\Http\RouteHandlerFactory;

class ViewProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->loadViewsFrom(
            __DIR__ . '/../../assets/views',
            'flagrow.user-directory'
        );
    }

    public function boot()
    {
        $this->populateRoutes($this->app->make('flarum.forum.routes'));
    }

    /**
     * @param RouteCollection $routes
     */
    protected function populateRoutes(RouteCollection $routes)
    {
        $route = $this->app->make(RouteHandlerFactory::class);
        $routes->get(
            '/users',
            'flagrow_user_directory',
            $route->toForum(UserDirectoryController::class)
        );
    }
}
