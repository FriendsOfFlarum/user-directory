<?php

namespace FoF\UserDirectory\Access;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy
{
    public function seeUserList(User $actor, User $user)
    {
        return $actor->hasPermission('fof.user-directory.view') && $actor->hasPermission('searchUsers');
    }
}
