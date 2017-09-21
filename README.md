# User directory by ![Flagrow logo](https://avatars0.githubusercontent.com/u/16413865?v=3&s=20) [Flagrow](https://discuss.flarum.org/d/1832-flagrow-extension-developer-group), a project of [Gravure](https://gravure.io/)

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/flagrow/user-directory/blob/master/LICENSE.md) [![Latest Stable Version](https://img.shields.io/packagist/v/flagrow/user-directory.svg)](https://packagist.org/packages/flagrow/user-directory) [![Total Downloads](https://img.shields.io/packagist/dt/flagrow/user-directory.svg)](https://packagist.org/packages/flagrow/user-directory) [![Donate](https://img.shields.io/badge/patreon-support-yellow.svg)](https://www.patreon.com/flagrow) [![Join our Discord server](https://discordapp.com/api/guilds/240489109041315840/embed.png)](https://flagrow.io/join-discord)

An extension that generates a new url `/users` that provides a list of users, with the ability to sort. You can search through the users from the global
search input field, a new item shows up "Search all users for ..".

You can protect access to the list with a permission. If the user has no access, she will see a 404 not found page (for now). 
You can add a link to the page using the [links extension](https://discuss.flarum.org/d/2230-links).

## Installation

Use [Bazaar](https://discuss.flarum.org/d/5151-flagrow-bazaar-the-extension-marketplace) or install manually:

```bash
composer require flagrow/user-directory
```

## Updating

```bash
composer update flagrow/user-directory
php flarum migrate
php flarum cache:clear
```

## Configuration

Enable the extension.

Make sure you configure the user directory permission on the Admin Permissions tab to your needs.

## Support our work

We prefer to keep our work available to everyone.
In order to do so we rely on voluntary contributions on [Patreon](https://www.patreon.com/flagrow).

## Security

If you discover a security vulnerability within User directory, please send an email to the Gravure team at security@gravure.io. All security vulnerabilities will be promptly addressed.

Please include as many details as possible. You can use `php flarum info` to get the PHP, Flarum and extension versions installed.

## Links

- [Flarum Discuss post](https://discuss.flarum.org/d/5682-flagrow-user-directory-permission-based-public-member-list)
- [Source code on GitHub](https://github.com/flagrow/user-directory)
- [Report an issue](https://github.com/flagrow/user-directory/issues)
- [Download via Packagist](https://packagist.org/packages/flagrow/user-directory)

An extension by [Flagrow](https://flagrow.io/), a project of [Gravure](https://gravure.io/).
