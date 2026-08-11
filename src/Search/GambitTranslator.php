<?php

/*
 * This file is part of fof/user-directory.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserDirectory\Search;

use Flarum\Locale\TranslatorInterface;

/**
 * Translates textual gambits in a search query into structured API filters.
 *
 * Flarum 2.x moved gambit parsing entirely into the JavaScript `GambitManager`;
 * the backend only understands structured filter keys such as `filter[group]`.
 * The server-rendered directory therefore has to do the same translation before
 * calling the API, otherwise a query like `group:1` is passed through as
 * fulltext and silently matches nothing.
 *
 * The gambit key is localizable, so it is read from the same translation core's
 * `GroupGambit` uses rather than hardcoded.
 */
class GambitTranslator
{
    /**
     * The translation holding the localized `group` gambit key.
     */
    private const GROUP_KEY_TRANSLATION = 'core.lib.gambits.users.group.key';

    public function __construct(
        protected TranslatorInterface $translator
    ) {
    }

    /**
     * Split a raw query string into structured filters.
     *
     * @return array{q: string, filters: array<string, mixed>} the remaining
     *                                                         free text and the filters extracted from it
     */
    public function translate(?string $query): array
    {
        $query ??= '';

        $filters = [];

        $remaining = preg_replace_callback(
            $this->groupPattern(),
            function (array $matches) use (&$filters): string {
                $key = $matches[1] === '-' ? '-group' : 'group';

                // A key/value gambit may carry a comma-separated list.
                foreach (explode(',', $matches[2]) as $value) {
                    $value = trim($value);

                    if ($value !== '') {
                        $filters[$key][] = $value;
                    }
                }

                return ' ';
            },
            $query
        );

        // preg_replace_callback returns null only on error; fall back to the
        // original query so a malformed pattern degrades to a plain search.
        $remaining = trim(preg_replace('/\s+/', ' ', $remaining ?? $query));

        return [
            'q'       => $remaining,
            'filters' => $filters,
        ];
    }

    /**
     * Matches the group gambit as a whole space-separated term, optionally
     * negated, mirroring how core's GambitManager splits a query.
     */
    private function groupPattern(): string
    {
        $key = $this->translator->trans(self::GROUP_KEY_TRANSLATION);

        // Fall back to the untranslated key if the translation is missing, so
        // a partial locale cannot disable group filtering entirely.
        if ($key === self::GROUP_KEY_TRANSLATION || $key === '') {
            $key = 'group';
        }

        return '/(?:^|\s)(-?)'.preg_quote($key, '/').':([^\s]+)/i';
    }
}
