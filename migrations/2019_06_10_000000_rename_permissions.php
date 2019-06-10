<?php

use Flarum\Group\Permission;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        Permission::query()
            ->where('permission', 'flagrow.user-directory.view')
            ->update(['permission' => 'fof.user-directory.view']);
    },
];
