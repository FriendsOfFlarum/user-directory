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

use Flarum\Api\Endpoint;
use Flarum\Api\Resource\UserResource;
use Flarum\Extend;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use PHPUnit\Framework\Attributes\Test;

/**
 * The server-rendered directory pages with the users endpoint's own limit, so
 * its pages neither repeat nor skip users when that limit is not 20.
 */
class UserDirectoryPageSizeTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-user-directory');

        $this->extend(
            (new Extend\ApiResource(UserResource::class))
                ->endpoint(Endpoint\Index::class, fn (Endpoint\Index $endpoint) => $endpoint->limit(2))
        );

        $users = [$this->normalUser()];

        foreach (range(3, 5) as $id) {
            $users[] = [
                'id'                 => $id,
                'username'           => "user$id",
                'password'           => '$2y$10$LO59tiT7uggl6Oe23o/O6.utnF6ipngYjvMvaxo1TciKqBttDNKim',
                'email'              => "user$id@machine.local",
                'is_email_confirmed' => 1,
            ];
        }

        $this->prepareDatabase([
            User::class        => $users,
            'group_permission' => [
                ['permission' => 'fof.user-directory.view', 'group_id' => 3],
                ['permission' => 'searchUsers', 'group_id' => 3],
            ],
        ]);
    }

    /**
     * @return array{usernames: string[], limit: int, offset: int}
     */
    protected function page(int $page): array
    {
        $response = $this->send(
            $this->request('GET', '/users', ['authenticatedAs' => 1])
                ->withQueryParams(['sort' => 'username_az'] + ($page > 1 ? ['page' => $page] : []))
        );

        $this->assertEquals(200, $response->getStatusCode());

        preg_match('/<script id="flarum-json-payload" type="application\/json">(.+?)<\/script>/s', (string) $response->getBody(), $matches);

        $document = json_decode(html_entity_decode($matches[1]), true)['apiDocument'];

        return [
            'usernames' => array_values(array_map(
                fn (array $user) => $user['attributes']['username'],
                array_filter($document['data'] ?? [], fn (array $data) => $data['type'] === 'users')
            )),
            'limit'  => $document['meta']['page']['limit'],
            'offset' => $document['meta']['page']['offset'],
        ];
    }

    #[Test]
    public function the_first_page_uses_the_page_size_of_the_users_endpoint()
    {
        $page = $this->page(1);

        $this->assertEquals(2, $page['limit']);
        $this->assertEquals(0, $page['offset']);
        $this->assertEquals(['admin', 'normal'], $page['usernames']);
    }

    #[Test]
    public function later_pages_continue_from_the_end_of_the_previous_one()
    {
        $second = $this->page(2);
        $third = $this->page(3);

        $this->assertEquals(2, $second['offset']);
        $this->assertEquals(['user3', 'user4'], $second['usernames']);

        $this->assertEquals(4, $third['offset']);
        $this->assertEquals(['user5'], $third['usernames']);
    }
}
