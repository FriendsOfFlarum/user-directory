<?php

namespace FoF\UserDirectory\Content;

use Flarum\Api\Controller\ListUsersController;
use Flarum\Frontend\Document;
use Flarum\Http\Exception\RouteNotFoundException;
use Flarum\Api\Client;
use Flarum\User\User;
use Illuminate\Contracts\View\Factory;
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
        'username_az' => 'username',
        'username_za' => '-username',
        'newest' => '-joinedAt',
        'oldest' => 'joinedAt',
        'seen_recent' => '-lastSeenAt',
        'seen_oldest' => 'lastSeenAt',
        'most_discussions' => '-discussionCount',
        'least_discussions' => 'discussionCount'
    ];

    public function __construct(Client $api, Factory $view)
    {
        $this->api = $api;
        $this->view = $view;
    }

    private function getDocument(User $actor, array $params)
    {
        if ($actor->cannot('fof.user-directory.view')) {
            throw new RouteNotFoundException();
        }

        return json_decode($this->api->send(ListUsersController::class, $actor, $params)->getBody());
    }

    public function __invoke(Document $document, Request $request)
    {
        $queryParams = $request->getQueryParams();

        $sort = array_pull($queryParams, 'sort');
        $q = array_pull($queryParams, 'q');
        $page = array_pull($queryParams, 'page', 1);

        $params = [
            // ?? used to prevent null values. null would result in the whole sortMap array being sent in the params
            'sort' => array_get($this->sortMap, $sort ?? '', ''),
            'filter' => compact('q'),
            'page' => ['offset' => ($page - 1) * 20, 'limit' => 20],
        ];

        $apiDocument = $this->getDocument($request->getAttribute('actor'), $params);

        $document->content = $this->view->make('fof.user-directory::index', compact('page', 'apiDocument'));

        $document->payload['apiDocument'] = $apiDocument;

        return $document;
    }
}
