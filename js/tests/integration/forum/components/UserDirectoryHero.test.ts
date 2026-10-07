import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import Hero from 'flarum/forum/components/Hero';
import mq from 'mithril-query';

import UserDirectoryHero from '../../../../src/forum/components/UserDirectoryHero';

beforeAll(() => {
  bootstrapForum();
  app.boot();
});

class ColoredHero extends UserDirectoryHero {
  heroColor(): string | null {
    return '#e74c3c';
  }
}

describe('UserDirectoryHero', () => {
  it("is built on core's Hero", () => {
    expect(UserDirectoryHero.prototype).toBeInstanceOf(Hero);
  });

  it('renders the title inside the standard hero containers', () => {
    const hero = mq(UserDirectoryHero);

    expect(hero).toHaveElement('header.Hero.UserDirectoryHero > .container > .containerNarrow > h1.Hero-title');
    expect(hero).toHaveElement('.Hero-title .icon.fa-address-book');
  });

  it('uses the theme hero colour by default', () => {
    const hero = new UserDirectoryHero();

    expect(hero.className()).toBe('UserDirectoryHero');
    expect(hero.style()).toBeUndefined();
  });

  // Checked on the instance: the test DOM's CSS parser cannot handle the
  // custom property this puts in the inline style.
  it('applies a custom colour, with a contrasting text class', () => {
    const hero = new ColoredHero();

    expect(hero.className()).toBe('UserDirectoryHero UserDirectoryHero--colored text-contrast--light');
    expect(hero.style()).toEqual({ '--hero-bg': '#e74c3c' });
  });
});
