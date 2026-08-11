<?php

/*
 * This file is part of fof/user-directory.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserDirectory\tests\integration;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;

/**
 * The extender registered a default against the *translation* key
 * `fof-user-directory.admin.settings.link` rather than the setting key
 * `fof-user-directory-link`, so the setting everything actually reads had no
 * default at all and the bogus key had one nothing consumed.
 */
class SettingsDefaultsTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-user-directory');
    }

    protected function settings(): SettingsRepositoryInterface
    {
        return $this->app()->getContainer()->make(SettingsRepositoryInterface::class);
    }

    #[Test]
    public function the_link_setting_has_a_registered_default()
    {
        $this->assertNotNull(
            $this->settings()->get('fof-user-directory-link'),
            'The link setting should resolve to its registered default rather than null'
        );
    }

    #[Test]
    public function no_default_is_registered_against_the_translation_key()
    {
        $this->assertNull(
            $this->settings()->get('fof-user-directory.admin.settings.link'),
            'The translation key is not a setting and should carry no default'
        );
    }

    #[Test]
    public function every_other_setting_default_is_registered()
    {
        $settings = $this->settings();

        $this->assertNotNull($settings->get('fof-user-directory.use-small-cards'));
        $this->assertNotNull($settings->get('fof-user-directory.disable-global-search-source'));
        $this->assertNotNull($settings->get('fof-user-directory.link-group-mentions'));
        $this->assertSame('', $settings->get('fof-user-directory.default-sort'));
    }

    /**
     * The forum attribute reads the same key, so a working default keeps the
     * sidebar link hidden until an admin turns it on.
     */
    #[Test]
    public function the_link_is_hidden_by_default_for_an_admin()
    {
        $response = $this->send($this->request('GET', '/api', ['authenticatedAs' => 1]));

        $data = json_decode($response->getBody()->getContents(), true);

        $this->assertFalse($data['data']['attributes']['canSeeUserDirectoryLink']);
    }
}
