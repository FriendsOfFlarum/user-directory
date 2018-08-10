<?php

namespace Flagrow\UserDirectory\Http\Controllers;

use Flarum\Api\Controller\ListUsersController;
use Flarum\Frontend\Content\ContentInterface;
use Flarum\Frontend\HtmlDocument;
use Flarum\Http\Controller\AbstractHtmlController;
use Flarum\Http\Exception\RouteNotFoundException;
use Illuminate\Contracts\Support\Renderable;
use Psr\Http\Message\ServerRequestInterface as Request;
use Flarum\Api\Client as ApiClient;
use Flarum\User\User;
use Illuminate\Contracts\View\Factory;


class UserDirectoryController implements ContentInterface
{
    /**
     * @var ApiClient
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
        'newest' => '-joinTime',
        'oldest' => 'joinTime',
        'seen_recent' => '-lastSeenTime',
        'seen_oldest' => 'lastSeenTime',
//        'most_posts' => '-commentsCount',
//        'least_posts' => 'commentsCount',
        'most_discussions' => '-discussionsCount',
        'least_discussions' => 'discussionsCount'
    ];

    public function __construct(Factory $view, ApiClient $api)
    {
        $this->view = $view;
        $this->api = $api;
    }

    /**
     * Get the result of an API request to list discussions.
     *
     * @param User $actor
     * @param array $params
     * @return object
     * @throws \Exception
     */
    private function getDocument(User $actor, array $params)
    {
        if ($actor->cannot('flagrow.user-directory.view')) {
            throw new RouteNotFoundException();
        }

        return json_decode($this->api->send(ListUsersController::class, $actor, $params)->getBody());
    }

    /**
     * @param HtmlDocument $document
     * @param Request $request
     * @return HtmlDocument
     * @throws \Exception
     */
    public function populate(HtmlDocument $document, Request $request)
    {
        $queryParams = $request->getQueryParams();

        $sort = array_pull($queryParams, 'sort');
        $q = array_pull($queryParams, 'q');
        $page = array_pull($queryParams, 'page', 1);

        $params = [
            'sort' => $sort && isset($this->sortMap[$sort]) ? $this->sortMap[$sort] : '',
            'filter' => compact('q'),
            'page' => ['offset' => ($page - 1) * 20, 'limit' => 20]
        ];

        $apiDocument = $this->getDocument($request->getAttribute('actor'), $params);

        $document->content = $this->view->make(
            'flagrow.user-directory::index',
            compact('page', 'forum')
        )->with('document', $apiDocument);

        $document->payload['apiDocument'] = $apiDocument;

        return $document;
    }
}
