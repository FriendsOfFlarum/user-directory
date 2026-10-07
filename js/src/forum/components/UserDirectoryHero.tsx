import app from 'flarum/forum/app';
import Hero, { type IHeroAttrs } from 'flarum/forum/components/Hero';
import Icon from 'flarum/common/components/Icon';
import textContrastClass from 'flarum/common/helpers/textContrastClass';
import classList from 'flarum/common/utils/classList';
import ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';

export interface IUserDirectoryHeroAttrs extends IHeroAttrs {}

export default class UserDirectoryHero<CustomAttrs extends IUserDirectoryHeroAttrs = IUserDirectoryHeroAttrs> extends Hero<CustomAttrs> {
  className(): string {
    const color = this.heroColor();

    return classList('UserDirectoryHero', { 'UserDirectoryHero--colored': color, [textContrastClass(color)]: color });
  }

  style(): Record<string, string> | undefined {
    const color = this.heroColor();

    return color ? { '--hero-bg': color } : undefined;
  }

  bodyItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    items.add('content', <div className="containerNarrow">{this.contentItems().toArray()}</div>, 80);

    return items;
  }

  contentItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    items.add(
      'user-directory-title',
      <h1 className="Hero-title">
        <Icon name={this.heroIcon()} /> {app.translator.trans('fof-user-directory.forum.hero.title')}
      </h1>,
      100
    );

    return items;
  }

  /**
   * A colour for the hero background, or null for the theme's default.
   */
  heroColor(): string | null {
    return null;
  }

  heroIcon(): string {
    return 'far fa-address-book';
  }
}
