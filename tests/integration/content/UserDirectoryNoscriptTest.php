<?php

/*
 * This file is part of fof/user-directory.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserDirectory\tests\integration\content;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

/**
 * The blade template renders into `<noscript id="flarum-content">`, which
 * serves crawlers, no-JS clients, and — via app.blade.php — the visible error
 * box when the JS bundle fails to boot.
 *
 * It previously offered a "next page" link unconditionally, so the fallback
 * advertised pages that do not exist, and never offered a way back.
 */
class UserDirectoryNoscriptTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    public function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-user-directory');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
            ],
        ]);
    }

    protected function directoryRequest(array $queryParams = [])
    {
        $request = $this->request('GET', '/users', ['authenticatedAs' => 1]);

        if ($queryParams) {
            $request = $request->withQueryParams($queryParams);
        }

        return $this->send($request);
    }

    /**
     * Isolates the server-rendered fallback from the surrounding app shell.
     */
    protected function noscriptContent($response): string
    {
        preg_match(
            '/<noscript id="flarum-content">(.*?)<\/noscript>/s',
            $response->getBody()->getContents(),
            $matches
        );

        return trim($matches[1] ?? '');
    }

    protected function head($response): string
    {
        preg_match('/<head>(.*?)<\/head>/s', $response->getBody()->getContents(), $matches);

        return $matches[1] ?? '';
    }

    #[Test]
    public function the_fallback_lists_the_users()
    {
        $content = $this->noscriptContent($this->directoryRequest());

        $this->assertStringContainsString('admin', $content);
        $this->assertStringContainsString('normal', $content);
    }

    #[Test]
    public function the_fallback_uses_a_top_level_heading()
    {
        $content = $this->noscriptContent($this->directoryRequest());

        $this->assertStringContainsString('<h1', $content, 'A standalone page should use a top-level heading');
        $this->assertStringNotContainsString('<h2', $content);
    }

    /**
     * Only two users exist, so a single page holds them all.
     */
    #[Test]
    public function no_next_link_is_offered_when_there_is_no_next_page()
    {
        $content = $this->noscriptContent($this->directoryRequest());

        $this->assertStringNotContainsString('page=2', $content, 'The fallback must not advertise a page that does not exist');
    }

    #[Test]
    public function no_previous_link_is_offered_on_the_first_page()
    {
        $content = $this->noscriptContent($this->directoryRequest());

        $this->assertStringNotContainsString('page=0', $content);
        $this->assertStringNotContainsString('Previous', $content);
    }

    #[Test]
    public function a_next_link_is_offered_when_more_users_exist()
    {
        $this->seedManyUsers();

        $content = $this->noscriptContent($this->directoryRequest());

        $this->assertStringContainsString('page=2', $content, 'A full first page should link to the next one');
    }

    #[Test]
    public function a_previous_link_is_offered_beyond_the_first_page()
    {
        $this->seedManyUsers();

        $content = $this->noscriptContent($this->directoryRequest(['page' => 2]));

        $this->assertStringContainsString('page=1', $content, 'Page 2 should link back to page 1');
    }

    #[Test]
    public function the_last_page_offers_no_next_link()
    {
        $this->seedManyUsers();

        $content = $this->noscriptContent($this->directoryRequest(['page' => 2]));

        $this->assertStringNotContainsString('page=3', $content, 'The final page must not advertise a further page');
    }

    #[Test]
    public function the_canonical_url_is_declared()
    {
        $head = $this->head($this->directoryRequest());

        $this->assertStringContainsString('rel="canonical"', $head);
        $this->assertStringContainsString('/users', $head);
    }

    #[Test]
    public function prev_and_next_meta_links_track_the_page()
    {
        $this->seedManyUsers();

        $firstPage = $this->head($this->directoryRequest());
        $this->assertStringContainsString('rel="next"', $firstPage);
        $this->assertStringNotContainsString('rel="prev"', $firstPage);

        $secondPage = $this->head($this->directoryRequest(['page' => 2]));
        $this->assertStringContainsString('rel="prev"', $secondPage);
        $this->assertStringNotContainsString('rel="next"', $secondPage, 'The last page should declare no next link');
    }

    /**
     * Seeds past the 20-per-page boundary so pagination has something to do.
     */
    protected function seedManyUsers(): void
    {
        $users = [];

        for ($i = 10; $i < 35; $i++) {
            $users[] = [
                'id'                 => $i,
                'username'           => 'user'.$i,
                'password'           => '$2y$10$LO59tiT7uggl6Oe23o/O6.utnF6ipngYjvMvaxo1TciKqBttDNKim',
                'email'              => 'user'.$i.'@machine.local',
                'is_email_confirmed' => 1,
            ];
        }

        $this->prepareDatabase([User::class => $users]);
    }
}
