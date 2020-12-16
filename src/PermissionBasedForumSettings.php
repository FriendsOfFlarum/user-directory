<?php

namespace FoF\UserDirectory;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class PermissionBasedForumSettings
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;
    
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(ForumSerializer $serializer): array
    {
        $attributes = [];

        // The link is visible if the user can access the user directory AND the link was enabled in extension settings
        $attributes['canSeeUserDirectoryLink'] = $serializer->getActor()->can('fof.user-directory.view') && $this->settings->get('fof-user-directory-link');
        $attributes['userDirectoryDefaultSort'] = $this->settings->get('fof-user-directory.default-sort') ?: 'default';

        return $attributes;
    }
}
