<?php

/*
 * This file is part of fof/user-directory.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserDirectory\Api;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Api\Context;
use Flarum\Api\Schema;

class PermissionBasedForumSettings
{
    public function __construct(
        protected SettingsRepositoryInterface $settings
    ) {}

    public function __invoke(): array
    {
        return [
            Schema\Boolean::make('canSeeUserDirectoryLink')
                // The link is visible if the user can access the user directory AND the link was enabled in extension settings
                ->get(fn ($forum, Context $context) => $context->getActor()->can('seeUserList') && $this->settings->get('fof-user-directory-link')),
            Schema\Str::make('userDirectoryDefaultSort')
                ->get(fn () => $this->settings->get('fof-user-directory.default-sort') ?: 'default'),
            Schema\Boolean::make('hasSuspendPermission')
                // Only serialize if the actor has permission
                ->visible(fn ($forum, Context $context) => $context->getActor()->hasPermission('user.suspend'))
                ->get(fn ($forum, Context $context) => $context->getActor()->hasPermission('user.suspend')),
        ];
    }
}
