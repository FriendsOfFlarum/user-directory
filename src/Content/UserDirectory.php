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
use Flarum\Http\RequestUtil;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Exception\PermissionDeniedException;
use FoF\UserDirectory\Search\GambitTranslator;
use FoF\UserDirectory\Search\SortResolver;
use Illuminate\Contracts\View\Factory;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface as Request;

class UserDirectory
{
    /**
     * How many users are listed per page.
     */
    private const PER_PAGE = 20;

    public function __construct(
        protected Client $api,
        protected Factory $view,
        protected SettingsRepositoryInterface $settings,
        protected UrlGenerator $url,
        protected SortResolver $sorts,
        protected GambitTranslator $gambits
    ) {
    }

    /**
     * @throws PermissionDeniedException
     */
    public function __invoke(Document $document, Request $request): Document
    {
        $queryParams = $request->getQueryParams();
        $actor = RequestUtil::getActor($request);

        $actor->assertCan('seeUserList');

        $sort = Arr::pull($queryParams, 'sort') ?: $this->settings->get('fof-user-directory.default-sort');
        $q = Arr::pull($queryParams, 'q');
        $page = max(1, (int) Arr::pull($queryParams, 'page', 1));

        $apiDocument = $this->getApiDocument($request, [
            'sort'    => $this->sorts->resolve($sort, $actor),
            'filter'  => $this->buildFilter($q),
            'page'    => ['offset' => ($page - 1) * self::PER_PAGE, 'limit' => self::PER_PAGE],
            'include' => 'groups',
        ]);

        $document->content = $this->view->make('fof.user-directory::index', compact('page', 'apiDocument'));

        // Lets Document emit rel="canonical" plus rel="prev"/rel="next", so a
        // paginated directory is not indexed as many near-duplicate pages.
        $document->canonicalUrl = $this->url->to('forum')->route('fof_user_directory');
        $document->page = $page;
        $document->hasNextPage = isset($apiDocument->links->next);

        $document->payload['apiDocument'] = $apiDocument;

        // Passed through so the frontend can restore the search field and sort
        // select without re-parsing the URL itself.
        $document->payload['fofUserDirectory'] = [
            'q'    => $q,
            'sort' => $sort,
        ];

        return $document;
    }

    /**
     * Build the API filter, translating any textual gambits in the query into
     * the structured filter keys the backend understands.
     */
    private function buildFilter(mixed $q): array
    {
        ['q' => $text, 'filters' => $filters] = $this->gambits->translate(
            is_scalar($q) ? (string) $q : null
        );

        if ($text !== '') {
            $filters['q'] = $text;
        }

        return $filters;
    }

    /**
     * Get the result of an API request to list users.
     */
    private function getApiDocument(Request $request, array $params): object
    {
        return json_decode(
            json: $this->api
                ->withParentRequest($request)
                ->withQueryParams($params)
                ->get('/users')
                ->getBody(),
            associative: false
        );
    }
}
