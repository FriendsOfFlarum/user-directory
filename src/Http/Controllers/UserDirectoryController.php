<?php

namespace Flagrow\UserDirectory\Http\Controllers;

use Flarum\Api\Controller\ListUsersController;
use Flarum\Forum\Controller\WebAppController;
use Psr\Http\Message\ServerRequestInterface as Request;
use Flarum\Api\Client as ApiClient;
use Flarum\Core\User;
use Flarum\Forum\WebApp;
use Illuminate\Contracts\Events\Dispatcher;

class UserDirectoryController extends WebAppController
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
        'latest' => '-lastTime',
        'top' => '-commentsCount',
        'newest' => '-startTime',
        'oldest' => 'startTime'
    ];

    /**
     * {@inheritdoc}
     */
    public function __construct(WebApp $webApp, Dispatcher $events, ApiClient $api)
    {
        parent::__construct($webApp, $events);

        $this->api = $api;
    }

    /**
     * @param Request $request
     * @return \Flarum\Http\WebApp\WebAppView
     */
    protected function getView(Request $request)
    {
        $view = parent::getView($request);

        $queryParams = $request->getQueryParams();

        $sort = array_pull($queryParams, 'sort');
        $q = array_pull($queryParams, 'q');
        $page = array_pull($queryParams, 'page', 1);

        $params = [
            'sort' => $sort && isset($this->sortMap[$sort]) ? $this->sortMap[$sort] : '',
            'filter' => compact('q'),
            'page' => ['offset' => ($page - 1) * 20, 'limit' => 20]
        ];

        $document = $this->getDocument($request->getAttribute('actor'), $params);

        $view->document = $document;

        $view->content = app('view')->make('flagrow.user-directory::index', compact('document', 'page', 'forum'));

        return $view;
    }

    /**
     * Get the result of an API request to list discussions.
     *
     * @param User $actor
     * @param array $params
     * @return object
     */
    private function getDocument(User $actor, array $params)
    {
        return json_decode($this->api->send(ListUsersController::class, $actor, $params)->getBody());
    }
}
