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
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use Illuminate\Contracts\View\Factory;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface as Request;

class UserDirectory
{
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

    /**
     * Sorts that core only exposes to holders of `user.viewLastSeenAt`.
     *
     * Requesting one of these without the permission makes the API reject the
     * whole request, so they are resolved separately and dropped for actors who
     * cannot use them — see issue #66.
     *
     * @var array
     */
    private $permissionedSortMap = [
        'seen_recent' => ['sort' => '-lastSeenAt', 'permission' => 'user.viewLastSeenAt'],
        'seen_oldest' => ['sort' => 'lastSeenAt', 'permission' => 'user.viewLastSeenAt'],
    ];

    public function __construct(
        protected Client $api,
        protected Factory $view,
        protected SettingsRepositoryInterface $settings
    ) {
    }

    /**
     * Map a sort query param to its API sort param for the given actor.
     *
     * Unknown keys and permissioned sorts the actor cannot use both resolve to
     * an empty string, so the directory falls back to the default ordering
     * rather than sending a sort the API would reject.
     */
    private function resolveSort(?string $sort, User $actor): string
    {
        $sort ??= '';

        if ($permissioned = Arr::get($this->permissionedSortMap, $sort)) {
            return $actor->hasPermission($permissioned['permission']) ? $permissioned['sort'] : '';
        }

        // ?? used to prevent null values. null would result in the whole sortMap array being sent in the params
        return Arr::get($this->sortMap, $sort, '');
    }

    private function getDocument(User $actor, array $params, Request $request): object
    {
        $actor->assertCan('seeUserList');

        // Make sure groups are included in the API request
        if (!isset($params['include'])) {
            $params['include'] = 'groups';
        } elseif (is_array($params['include'])) {
            if (!in_array('groups', $params['include'])) {
                $params['include'][] = 'groups';
            }
            $params['include'] = implode(',', $params['include']);
        } elseif (is_string($params['include']) && !str_contains($params['include'], 'groups')) {
            $params['include'] .= ',groups';
        }

        return json_decode(
            json: $this->api->withQueryParams($params)->withParentRequest($request)->get('/users')->getBody(),
            associative: false
        );
    }

    /**
     * @throws PermissionDeniedException
     */
    public function __invoke(Document $document, Request $request): Document
    {
        $queryParams = $request->getQueryParams();
        $actor = RequestUtil::getActor($request);

        $sort = Arr::pull($queryParams, 'sort') ?: $this->settings->get('fof-user-directory.default-sort');
        $q = Arr::pull($queryParams, 'q');
        $page = Arr::pull($queryParams, 'page', 1);

        // Ensure the query parameter is properly formatted
        if ($q) {
            // Make sure it's a string
            $q = (string) $q;
        }

        $params = [
            'sort'   => $this->resolveSort($sort, $actor),
            'filter' => compact('q'),
            'page'   => ['offset' => ($page - 1) * 20, 'limit' => 20],
        ];

        $apiDocument = $this->getDocument($actor, $params, $request);

        $document->content = $this->view->make('fof.user-directory::index', compact('page', 'apiDocument'));

        $document->payload['apiDocument'] = $apiDocument;

        // Add query parameters to the payload so the frontend can initialize filters
        $document->payload['fofUserDirectory'] = [
            'q'    => $q,
            'sort' => $sort,
        ];

        return $document;
    }
}
