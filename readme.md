# User directory by ![flagrow logo](https://avatars0.githubusercontent.com/u/16413865?v=3&s=15) [flagrow](https://discuss.flarum.org/d/1832-flagrow-extension-developer-group)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/flagrow/user-directory/license.md) [![Latest Stable Version](https://img.shields.io/packagist/v/flagrow/user-directory.svg)](https://github.com/flagrow/user-directory) [![Total Downloads](https://img.shields.io/packagist/dt/flagrow/user-directory.svg)](https://github.com/flagrow/user-directory)

An extension that generates a new url `/users` that provides a list of users, with the ability to sort. You can search through the users from the global
search input field, a new item shows up "Search all users for ..".

You can protect access to the list with a permission. If the user has no access, she will see a 404 not found page (for now). 
You can add a link to the page using the [links extension](https://discuss.flarum.org/d/2230-links).

### installation

```bash
composer require flagrow/user-directory
```

### updating

```bash
composer update flagrow/user-directory
php flarum migrate
php flarum cache:clear
```

### configuration

Enable the extension.

Make sure you configure the user directory permission on the Admin Permissions tab to your needs.

### links

- [changelog](https://github.com/flagrow/user-directory/blob/master/changelog.md)
- [on github](https://github.com/flagrow/user-directory)
- [on packagist](http://packagist.com/packages/flagrow/user-directory)
- [issues](https://github.com/flagrow/user-directory/issues)


An extension by [Flagrow](https://flagrow.io), a project of [Gravure](https://gravure.io).
