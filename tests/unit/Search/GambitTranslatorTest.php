<?php

/*
 * This file is part of fof/user-directory.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\UserDirectory\tests\unit\Search;

use Flarum\Locale\TranslatorInterface;
use FoF\UserDirectory\Search\GambitTranslator;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

class GambitTranslatorTest extends TestCase
{
    protected GambitTranslator $translator;

    public function setUp(): void
    {
        parent::setUp();

        $this->translator = new GambitTranslator($this->translatorReturning('group'));
    }

    /**
     * A translator stub resolving the gambit key to the given word.
     */
    protected function translatorReturning(string $key): TranslatorInterface
    {
        $translator = $this->createStub(TranslatorInterface::class);
        $translator->method('trans')->willReturn($key);

        return $translator;
    }

    public static function queries(): array
    {
        return [
            'empty string' => ['', '', []],
            'null' => [null, '', []],
            'plain text only' => ['hello world', 'hello world', []],
            'single group id' => ['group:1', '', ['group' => ['1']]],
            'group with leading text' => ['bob group:1', 'bob', ['group' => ['1']]],
            'group with trailing text' => ['group:1 bob', 'bob', ['group' => ['1']]],
            'group surrounded by text' => ['a group:1 b', 'a b', ['group' => ['1']]],
            'two separate gambits' => ['group:1 group:4', '', ['group' => ['1', '4']]],
            'comma separated ids' => ['group:1,4', '', ['group' => ['1', '4']]],
            'comma separated with spaces stripped' => ['group:1,,4', '', ['group' => ['1', '4']]],
            'group by name' => ['group:Admins', '', ['group' => ['Admins']]],
            'negated group' => ['-group:1', '', ['-group' => ['1']]],
            'negated and positive' => ['group:1 -group:4', '', ['group' => ['1'], '-group' => ['4']]],
            'uppercase key' => ['GROUP:1', '', ['group' => ['1']]],
            'mixed case key' => ['Group:1', '', ['group' => ['1']]],
            'collapses whitespace' => ['a   group:1   b', 'a b', ['group' => ['1']]],
            'multiple spaces only' => ['   ', '', []],
        ];
    }

    #[Test]
    #[DataProvider('queries')]
    public function it_splits_gambits_from_free_text(?string $input, string $expectedQuery, array $expectedFilters)
    {
        $result = $this->translator->translate($input);

        $this->assertSame($expectedQuery, $result['q']);
        $this->assertSame($expectedFilters, $result['filters']);
    }

    /**
     * A bare `group:` with no value is not a usable filter — it should be
     * consumed rather than left in the free text, but must not produce an
     * empty filter value the API would reject.
     */
    #[Test]
    public function bare_group_key_produces_no_filter()
    {
        $result = $this->translator->translate('group:');

        $this->assertSame([], $result['filters']);
    }

    /**
     * A colon inside ordinary text must not be mistaken for a gambit.
     */
    #[Test]
    public function unrelated_gambits_are_left_in_the_free_text()
    {
        $result = $this->translator->translate('email:bob@example.com');

        $this->assertSame('email:bob@example.com', $result['q']);
        $this->assertSame([], $result['filters']);
    }

    /**
     * `group:` appearing inside a larger word is not a gambit.
     */
    #[Test]
    public function group_inside_a_word_is_not_treated_as_a_gambit()
    {
        $result = $this->translator->translate('subgroup:1');

        $this->assertSame('subgroup:1', $result['q']);
        $this->assertSame([], $result['filters']);
    }

    /**
     * The gambit key is localizable — core reads it from
     * `core.lib.gambits.users.group.key`. On a translated forum the frontend
     * emits the translated key, so the backend must parse that same key.
     */
    #[Test]
    public function the_localized_gambit_key_is_used()
    {
        $translator = new GambitTranslator($this->translatorReturning('groupe'));

        $result = $translator->translate('groupe:1 bob');

        $this->assertSame('bob', $result['q']);
        $this->assertSame(['group' => ['1']], $result['filters']);
    }

    /**
     * Once translated, the English key is just ordinary text.
     */
    #[Test]
    public function the_untranslated_key_is_not_matched_when_a_translation_exists()
    {
        $translator = new GambitTranslator($this->translatorReturning('groupe'));

        $result = $translator->translate('group:1');

        $this->assertSame('group:1', $result['q']);
        $this->assertSame([], $result['filters']);
    }

    /**
     * A key containing regex metacharacters must not corrupt the pattern.
     */
    #[Test]
    public function a_key_with_regex_characters_is_quoted()
    {
        $translator = new GambitTranslator($this->translatorReturning('gro.up'));

        $this->assertSame(['group' => ['1']], $translator->translate('gro.up:1')['filters']);
        // The dot must be literal, not a wildcard.
        $this->assertSame([], $translator->translate('groxup:1')['filters']);
    }

    /**
     * A missing translation returns the key itself; falling back to `group`
     * keeps filtering working rather than disabling it.
     */
    #[Test]
    public function a_missing_translation_falls_back_to_the_english_key()
    {
        $translator = new GambitTranslator(
            $this->translatorReturning('core.lib.gambits.users.group.key')
        );

        $this->assertSame(['group' => ['1']], $translator->translate('group:1')['filters']);
    }
}
