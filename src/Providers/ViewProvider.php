<?php

namespace Flagrow\UserDirectory\Providers;

use Flarum\Foundation\AbstractServiceProvider;

class ViewProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->loadViewsFrom(
            __DIR__ . '/../../resources/views',
            'flagrow.user-directory'
        );
    }
}
