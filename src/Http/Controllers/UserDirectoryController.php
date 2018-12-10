<?php

namespace Flagrow\UserDirectory\Http\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Api\Controller\ListUsersController;
use Flarum\Forum\Controller\WebAppController;
use Flarum\Http\Exception\RouteNotFoundException;
use Psr\Http\Message\ServerRequestInterface as Request;
use Flarum\Api\Client as ApiClient;
use Flarum\Core\User;
use Flarum\Forum\WebApp;
use Illuminate\Contracts\Events\Dispatcher;
use Tobscure\JsonApi\Document;

class UserDirectoryController extends AbstractListController
{
    /**
     * @var ApiClient
     */
    protected $api;

    /**
     * A map of sort query param values to their API sort param.
     *
     * @var array
     */
    private $sortMap = [
        'username_az' => 'username',
        'username_za' => '-username',
        'newest' => '-joinTime',
        'oldest' => 'joinTime',
        'seen_recent' => '-lastSeenTime',
        'seen_oldest' => 'lastSeenTime',
//        'most_posts' => '-commentsCount',
//        'least_posts' => 'commentsCount',
        'most_discussions' => '-discussionsCount',
        'least_discussions' => 'discussionsCount'
    ];

    /**
     * {@inheritdoc}
     */
    public function __construct(ApiClient $api)
    {
        $this->api = $api;
    }

    /**
     * Get the data to be serialized and assigned to the response document.
     *
     * @param Request  $request
     * @param Document $document
     * @return mixed
     */
    protected function data(Request $request, Document $document)
    {
        $actor = $request->getAttribute('actor');

        if ($actor->cannot('flagrow.user-directory.view')) {
            throw new RouteNotFoundException();
        }

        $queryParams = $request->getQueryParams();

        $sort = array_pull($queryParams, 'sort');
        $q = array_pull($queryParams, 'q');
        $page = array_pull($queryParams, 'page', 1);

        $params = [
            'sort' => $sort && isset($this->sortMap[$sort]) ? $this->sortMap[$sort] : '',
            'filter' => compact('q'),
            'page' => ['offset' => ($page - 1) * 20, 'limit' => 20]
        ];

        return json_decode($this->api->send(ListUsersController::class, $actor, $params)->getBody());
    }
}
