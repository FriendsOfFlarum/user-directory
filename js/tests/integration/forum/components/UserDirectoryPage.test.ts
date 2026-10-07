import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import mq from 'mithril-query';
import { jest } from '@jest/globals';

import UserDirectoryPage from '../../../../src/forum/components/UserDirectoryPage';
import UserDirectoryListState from '../../../../src/forum/states/UserDirectoryListState';

beforeAll(() => {
  bootstrapForum();
  app.boot();
  app.forum.pushAttributes({ userDirectoryDefaultSort: 'default' });

  // The page loads its first page of users on init; the toolbar doesn't need them.
  jest.spyOn(UserDirectoryListState.prototype, 'refreshParams').mockResolvedValue(undefined as never);

  // fof/mailing adds its "email everyone" button exactly like this.
  extend(UserDirectoryPage.prototype, 'actionItems', function (items) {
    items.add('fof-mailing', Button.component({ className: 'Button', icon: 'fas fa-envelope' }, 'Send Email'), 10);
  });
});

// The phone layout in toolbar.less targets these list items by key, and
// flattens both lists into one row, so their keys and nesting are its contract.
describe('UserDirectoryPage toolbar', () => {
  it('splits view controls and actions into their own lists', () => {
    const page = mq(UserDirectoryPage);

    expect(page).toHaveElement('.IndexPage-toolbar > ul.IndexPage-toolbar-view > li.item-sort .Select');
    expect(page).toHaveElement('.IndexPage-toolbar > ul.IndexPage-toolbar-view > li.item-filterGroups .Dropdown');
    expect(page).toHaveElement('.IndexPage-toolbar > ul.IndexPage-toolbar-view > li.item-search .UserDirectorySearchInput');
    expect(page).toHaveElement('.IndexPage-toolbar > ul.IndexPage-toolbar-action > li.item-refresh .Button--icon');
    expect(page).toHaveElement('.IndexPage-toolbar > ul.IndexPage-toolbar-action > li.item-fof-mailing > .Button');
  });

  it('shows the group filter icon as the toggle caret, beside a label', () => {
    const page = mq(UserDirectoryPage);

    expect(page).toHaveElement('.item-filterGroups .Dropdown-toggle > .Button-label');
    expect(page).toHaveElement('.item-filterGroups .Dropdown-toggle > .Button-caret.fa-filter');
  });

  // Phones hide these labels visually; they remain the buttons' only names.
  it('keeps a text label on the buttons that become icon-only', () => {
    const page = mq(UserDirectoryPage);

    expect(page.first('.item-filterGroups .Dropdown-toggle .Button-label').textContent).toBeTruthy();
    expect(page.first('.item-fof-mailing .Button-label').textContent).toBe('Send Email');
  });

  it('gives the icon-only refresh button an accessible name', () => {
    const page = mq(UserDirectoryPage);

    expect(page).toHaveElementAttr('.item-refresh .Button', 'aria-label');
  });
});
