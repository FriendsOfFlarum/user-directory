<?php

/*
 * This file is part of fof/user-directory.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        // Not the Permission model: Eloquent has no connection while `flarum install` runs extension migrations.
        $schema->getConnection()->table('group_permission')
            ->where('permission', 'flagrow.user-directory.view')
            ->update(['permission' => 'fof.user-directory.view']);
    },
];
