<?php

/*
 * This file is part of fof/user-directory.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserDirectory\Content;

use Flarum\Api\Client;
use Flarum\Frontend\Document;
use Flarum\Http\Exception\RouteNotFoundException;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Illuminate\Contracts\View\Factory;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface as Request;

class UserDirectory
{
    /**
     * @var Client
     */
    protected $api;

    /**
     * @var Factory
     */
    private $view;

    /**
     * A map of sort query param values to their API sort param.
     *
     * @var array
     */
    private $sortMap = [
        'username_az'       => 'username',
        'username_za'       => '-username',
        'newest'            => '-joinedAt',
        'oldest'            => 'joinedAt',
        'most_discussions'  => '-discussionCount',
        'least_discussions' => 'discussionCount',
    ];

    public function __construct(Client $api, Factory $view)
    {
        $this->api = $api;
        $this->view = $view;
    }

    private function getDocument(User $actor, array $params, Request $request)
    {
        if ($actor->cannot('fof.user-directory.view')) {
            throw new RouteNotFoundException();
        }

        return json_decode($this->api->withQueryParams($params)->withParentRequest($request)->get('/users')->getBody());
    }

    public function __invoke(Document $document, Request $request)
    {
        $queryParams = $request->getQueryParams();

        $sort = Arr::pull($queryParams, 'sort') ?: resolve(SettingsRepositoryInterface::class)->get('fof-user-directory.default-sort');
        $q = Arr::pull($queryParams, 'q');
        $page = Arr::pull($queryParams, 'page', 1);

        $params = [
            // ?? used to prevent null values. null would result in the whole sortMap array being sent in the params
            'sort'   => Arr::get($this->sortMap, $sort ?? '', ''),
            'filter' => compact('q'),
            'page'   => ['offset' => ($page - 1) * 20, 'limit' => 20],
        ];

        $apiDocument = $this->getDocument($request->getAttribute('actor'), $params, $request);

        $document->content = $this->view->make('fof.user-directory::index', compact('page', 'apiDocument'));

        $document->payload['apiDocument'] = $apiDocument;

        return $document;
    }
}
