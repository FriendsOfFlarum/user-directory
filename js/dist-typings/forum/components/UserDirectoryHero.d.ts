import Hero, { type IHeroAttrs } from 'flarum/forum/components/Hero';
import ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
export interface IUserDirectoryHeroAttrs extends IHeroAttrs {
}
export default class UserDirectoryHero<CustomAttrs extends IUserDirectoryHeroAttrs = IUserDirectoryHeroAttrs> extends Hero<CustomAttrs> {
    className(): string;
    style(): Record<string, string> | undefined;
    bodyItems(): ItemList<Mithril.Children>;
    contentItems(): ItemList<Mithril.Children>;
    /**
     * A colour for the hero background, or null for the theme's default.
     */
    heroColor(): string | null;
    heroIcon(): string;
}
