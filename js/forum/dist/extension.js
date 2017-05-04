'use strict';

System.register('flagrow/user-directory/components/UserDirectoryList', ['flarum/Component', 'flagrow/user-directory/components/UserDirectoryListItem', 'flarum/components/Button', 'flarum/components/LoadingIndicator', 'flarum/components/Placeholder'], function (_export, _context) {
  "use strict";

  var Component, UserDirectoryListItem, Button, LoadingIndicator, Placeholder, UserDirectoryList;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flagrowUserDirectoryComponentsUserDirectoryListItem) {
      UserDirectoryListItem = _flagrowUserDirectoryComponentsUserDirectoryListItem.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsLoadingIndicator) {
      LoadingIndicator = _flarumComponentsLoadingIndicator.default;
    }, function (_flarumComponentsPlaceholder) {
      Placeholder = _flarumComponentsPlaceholder.default;
    }],
    execute: function () {
      UserDirectoryList = function (_Component) {
        babelHelpers.inherits(UserDirectoryList, _Component);

        function UserDirectoryList() {
          babelHelpers.classCallCheck(this, UserDirectoryList);
          return babelHelpers.possibleConstructorReturn(this, (UserDirectoryList.__proto__ || Object.getPrototypeOf(UserDirectoryList)).apply(this, arguments));
        }

        babelHelpers.createClass(UserDirectoryList, [{
          key: 'init',
          value: function init() {
            /**
             * Whether or not discussion results are loading.
             *
             * @type {Boolean}
             */
            this.loading = true;

            /**
             * Whether or not there are more results that can be loaded.
             *
             * @type {Boolean}
             */
            this.moreResults = false;

            /**
             * The users in the user directory list.
             *
             * @type {User[]}
             */
            this.users = [];

            this.refresh();
          }
        }, {
          key: 'view',
          value: function view() {
            var params = this.props.params;
            var loading = void 0;

            if (this.loading) {
              loading = LoadingIndicator.component();
            } else if (this.moreResults) {
              loading = Button.component({
                children: app.translator.trans('core.forum.discussion_list.load_more_button'),
                className: 'Button',
                onclick: this.loadMore.bind(this)
              });
            }

            if (this.users.length === 0 && !this.loading) {
              var text = app.translator.trans('core.forum.discussion_list.empty_text');
              return m(
                'div',
                { className: 'DiscussionList' },
                Placeholder.component({ text: text })
              );
            }

            return m(
              'div',
              { className: 'UserDirectoryList' },
              this.users.map(function (user) {
                return m(
                  'div',
                  { key: user.username(), 'data-id': user.username() },
                  UserDirectoryListItem.component({ user: user, params: params })
                );
              }),
              m(
                'div',
                { className: 'UserDirectoryList-loadMore' },
                loading
              )
            );
          }
        }, {
          key: 'requestParams',
          value: function requestParams() {
            var params = { include: [], filter: {} };

            params.sort = this.sortMap()[this.props.params.sort];

            if (this.props.params.q) {
              params.filter.q = this.props.params.q;
            }

            return params;
          }
        }, {
          key: 'sortMap',
          value: function sortMap() {
            var map = {};

            if (this.props.params.q) {
              map.relevance = '';
            } else {
              map.default = '';
            }
            map.username_az = 'username';
            map.username_za = '-username';
            map.newest = '-joinTime';
            map.oldest = 'joinTime';
            map.seen_recent = '-lastSeenTime';
            map.seen_oldest = 'lastSeenTime';
            // map.most_posts = '-commentsCount';
            // map.least_posts = 'commentsCount';
            map.most_discussions = '-discussionsCount';
            map.least_discussions = 'discussionsCount';

            return map;
          }
        }, {
          key: 'refresh',
          value: function refresh() {
            var _this2 = this;

            var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (clear) {
              this.loading = true;
              this.users = [];
            }

            return this.loadResults(0).then(function (results) {
              _this2.users = [];
              _this2.parseResults(results);
            }, function () {
              _this2.loading = false;
              m.redraw();
            });
          }
        }, {
          key: 'loadResults',
          value: function loadResults(offset) {
            var preloadedUsers = app.preloadedDocument();

            if (preloadedUsers) {
              return m.deferred().resolve(preloadedUsers).promise;
            }

            var params = this.requestParams();
            params.page = { offset: offset };
            params.include = params.include.join(',');

            return app.store.find('users', params);
          }
        }, {
          key: 'loadMore',
          value: function loadMore() {
            this.loading = true;

            this.loadResults(this.users.length).then(this.parseResults.bind(this));
          }
        }, {
          key: 'parseResults',
          value: function parseResults(results) {
            [].push.apply(this.users, results);

            this.loading = false;
            this.moreResults = !!results.payload.links.next;

            m.lazyRedraw();

            return results;
          }
        }, {
          key: 'removeUser',
          value: function removeUser(user) {
            var index = this.users.indexOf(user);

            if (index !== -1) {
              this.users.splice(index, 1);
            }
          }
        }, {
          key: 'addUser',
          value: function addUser(user) {
            this.users.unshift(user);
          }
        }]);
        return UserDirectoryList;
      }(Component);

      _export('default', UserDirectoryList);
    }
  };
});;
'use strict';

System.register('flagrow/user-directory/components/UserDirectoryListItem', ['flarum/Component', 'flarum/components/UserCard'], function (_export, _context) {
    "use strict";

    var Component, UserCard, UserDirectoryListItem;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsUserCard) {
            UserCard = _flarumComponentsUserCard.default;
        }],
        execute: function () {
            UserDirectoryListItem = function (_Component) {
                babelHelpers.inherits(UserDirectoryListItem, _Component);

                function UserDirectoryListItem() {
                    babelHelpers.classCallCheck(this, UserDirectoryListItem);
                    return babelHelpers.possibleConstructorReturn(this, (UserDirectoryListItem.__proto__ || Object.getPrototypeOf(UserDirectoryListItem)).apply(this, arguments));
                }

                babelHelpers.createClass(UserDirectoryListItem, [{
                    key: 'view',
                    value: function view() {
                        var user = this.props.user;
                        var card = UserCard.component({
                            user: user,
                            className: 'UserCard--directory',
                            controlsButtonClassName: 'Button Button--icon Button--flat'
                        });

                        return m(
                            'div',
                            { className: 'User' },
                            card
                        );
                    }
                }]);
                return UserDirectoryListItem;
            }(Component);

            _export('default', UserDirectoryListItem);
        }
    };
});;
'use strict';

System.register('flagrow/user-directory/components/UserDirectoryPage', ['flarum/extend', 'flarum/components/Page', 'flarum/utils/ItemList', 'flarum/helpers/listItems', 'flagrow/user-directory/components/UserDirectoryList', 'flarum/components/DiscussionComposer', 'flarum/components/LogInModal', 'flarum/components/Select', 'flarum/components/Button', 'flarum/components/LinkButton', 'flarum/components/SelectDropdown'], function (_export, _context) {
    "use strict";

    var extend, Page, ItemList, listItems, UserDirectoryList, DiscussionComposer, LogInModal, Select, Button, LinkButton, SelectDropdown, UserDirectoryPage;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsPage) {
            Page = _flarumComponentsPage.default;
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList.default;
        }, function (_flarumHelpersListItems) {
            listItems = _flarumHelpersListItems.default;
        }, function (_flagrowUserDirectoryComponentsUserDirectoryList) {
            UserDirectoryList = _flagrowUserDirectoryComponentsUserDirectoryList.default;
        }, function (_flarumComponentsDiscussionComposer) {
            DiscussionComposer = _flarumComponentsDiscussionComposer.default;
        }, function (_flarumComponentsLogInModal) {
            LogInModal = _flarumComponentsLogInModal.default;
        }, function (_flarumComponentsSelect) {
            Select = _flarumComponentsSelect.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumComponentsLinkButton) {
            LinkButton = _flarumComponentsLinkButton.default;
        }, function (_flarumComponentsSelectDropdown) {
            SelectDropdown = _flarumComponentsSelectDropdown.default;
        }],
        execute: function () {
            UserDirectoryPage = function (_Page) {
                babelHelpers.inherits(UserDirectoryPage, _Page);

                function UserDirectoryPage() {
                    babelHelpers.classCallCheck(this, UserDirectoryPage);
                    return babelHelpers.possibleConstructorReturn(this, (UserDirectoryPage.__proto__ || Object.getPrototypeOf(UserDirectoryPage)).apply(this, arguments));
                }

                babelHelpers.createClass(UserDirectoryPage, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(UserDirectoryPage.prototype.__proto__ || Object.getPrototypeOf(UserDirectoryPage.prototype), 'init', this).call(this);

                        // If the user is coming from the discussion list, then they have either
                        // just switched one of the parameters (filter, sort, search) or they
                        // probably want to refresh the results. We will clear the discussion list
                        // cache so that results are reloaded.
                        if (app.previous instanceof UserDirectoryPage) {
                            app.cache.userDirectoryList = null;
                        }

                        var params = this.params();

                        if (app.cache.userDirectoryList) {
                            // Compare the requested parameters (sort, search query) to the ones that
                            // are currently present in the cached discussion list. If they differ, we
                            // will clear the cache and set up a new discussion list component with
                            // the new parameters.
                            Object.keys(params).some(function (key) {
                                if (app.cache.userDirectoryList.props.params[key] !== params[key]) {
                                    app.cache.userDirectoryList = null;
                                    return true;
                                }
                            });
                        }

                        if (!app.cache.userDirectoryList) {
                            app.cache.userDirectoryList = new UserDirectoryList({ params: params });
                        }

                        this.bodyClass = 'User--directory';
                    }
                }, {
                    key: 'onunload',
                    value: function onunload() {
                        // Save the scroll position so we can restore it when we return to the
                        // discussion list.
                        app.cache.scrollTop = $(window).scrollTop();
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        return m(
                            'div',
                            { className: 'IndexPage' },
                            m(
                                'div',
                                { className: 'container' },
                                m(
                                    'nav',
                                    { className: 'IndexPage-nav sideNav' },
                                    m(
                                        'ul',
                                        null,
                                        listItems(this.sidebarItems().toArray())
                                    )
                                ),
                                m(
                                    'div',
                                    { className: 'IndexPage-results sideNavOffset' },
                                    m(
                                        'div',
                                        { className: 'IndexPage-toolbar' },
                                        m(
                                            'ul',
                                            { className: 'IndexPage-toolbar-view' },
                                            listItems(this.viewItems().toArray())
                                        ),
                                        m(
                                            'ul',
                                            { className: 'IndexPage-toolbar-action' },
                                            listItems(this.actionItems().toArray())
                                        )
                                    ),
                                    app.cache.userDirectoryList.render()
                                )
                            )
                        );
                    }
                }, {
                    key: 'config',
                    value: function config(isInitialized, context) {
                        babelHelpers.get(UserDirectoryPage.prototype.__proto__ || Object.getPrototypeOf(UserDirectoryPage.prototype), 'config', this).apply(this, arguments);

                        if (isInitialized) return;

                        extend(context, 'onunload', function () {
                            return $('#app').css('min-height', '');
                        });

                        app.setTitle('');
                        app.setTitleCount(0);

                        // Work out the difference between the height of this hero and that of the
                        // previous hero. Maintain the same scroll position relative to the bottom
                        // of the hero so that the sidebar doesn't jump around.
                        var scrollTop = app.cache.scrollTop;

                        $('#app').css('min-height', $(window).height());

                        // Scroll to the remembered position. We do this after a short delay so that
                        // it happens after the browser has done its own "back button" scrolling,
                        // which isn't right. https://github.com/flarum/core/issues/835
                        var scroll = function scroll() {
                            return $(window).scrollTop(scrollTop);
                        };
                        scroll();
                        setTimeout(scroll, 1);
                    }
                }, {
                    key: 'sidebarItems',
                    value: function sidebarItems() {
                        var items = new ItemList();
                        var canStartDiscussion = app.forum.attribute('canStartDiscussion') || !app.session.user;

                        items.add('newDiscussion', Button.component({
                            children: app.translator.trans(canStartDiscussion ? 'core.forum.index.start_discussion_button' : 'core.forum.index.cannot_start_discussion_button'),
                            icon: 'edit',
                            className: 'Button Button--primary IndexPage-newDiscussion',
                            itemClassName: 'App-primaryControl',
                            onclick: this.newDiscussion.bind(this),
                            disabled: !canStartDiscussion
                        }));

                        items.add('nav', SelectDropdown.component({
                            children: this.navItems(this).toArray(),
                            buttonClassName: 'Button',
                            className: 'App-titleControl'
                        }));

                        return items;
                    }
                }, {
                    key: 'navItems',
                    value: function navItems() {
                        var items = new ItemList();
                        var params = this.stickyParams();

                        items.add('allDiscussions', LinkButton.component({
                            href: app.route('index', params),
                            children: app.translator.trans('core.forum.index.all_discussions_link'),
                            icon: 'comments-o'
                        }), 100);

                        return items;
                    }
                }, {
                    key: 'viewItems',
                    value: function viewItems() {
                        var items = new ItemList();
                        var sortMap = app.cache.userDirectoryList.sortMap();

                        var sortOptions = {};
                        for (var i in sortMap) {
                            sortOptions[i] = app.translator.trans('flagrow-user-directory.forum.page.sort.' + i);
                        }

                        items.add('sort', Select.component({
                            options: sortOptions,
                            value: this.params().sort || Object.keys(sortMap)[0],
                            onchange: this.changeSort.bind(this)
                        }));

                        return items;
                    }
                }, {
                    key: 'actionItems',
                    value: function actionItems() {
                        var items = new ItemList();

                        items.add('refresh', Button.component({
                            title: app.translator.trans('core.forum.index.refresh_tooltip'),
                            icon: 'refresh',
                            className: 'Button Button--icon',
                            onclick: function onclick() {
                                app.cache.discussionList.refresh();
                                if (app.session.user) {
                                    app.store.find('users', app.session.user.id());
                                    m.redraw();
                                }
                            }
                        }));

                        return items;
                    }
                }, {
                    key: 'searching',
                    value: function searching() {
                        return this.params().q;
                    }
                }, {
                    key: 'clearSearch',
                    value: function clearSearch() {
                        var params = this.params();
                        delete params.q;

                        m.route(app.route(this.props.routeName, params));
                    }
                }, {
                    key: 'changeSort',
                    value: function changeSort(sort) {
                        var params = this.params();

                        if (sort === Object.keys(app.cache.userDirectoryList.sortMap())[0]) {
                            delete params.sort;
                        } else {
                            params.sort = sort;
                        }

                        m.route(app.route(this.props.routeName, params));
                    }
                }, {
                    key: 'stickyParams',
                    value: function stickyParams() {
                        return {
                            sort: m.route.param('sort'),
                            q: m.route.param('q')
                        };
                    }
                }, {
                    key: 'params',
                    value: function params() {
                        var params = this.stickyParams();

                        params.filter = m.route.param('filter');

                        return params;
                    }
                }, {
                    key: 'newDiscussion',
                    value: function newDiscussion() {
                        var deferred = m.deferred();

                        if (app.session.user) {
                            this.composeNewDiscussion(deferred);
                        } else {
                            app.modal.show(new LogInModal({
                                onlogin: this.composeNewDiscussion.bind(this, deferred)
                            }));
                        }

                        return deferred.promise;
                    }
                }, {
                    key: 'composeNewDiscussion',
                    value: function composeNewDiscussion(deferred) {
                        var component = new DiscussionComposer({ user: app.session.user });

                        app.composer.load(component);
                        app.composer.show();

                        deferred.resolve(component);

                        return deferred.promise;
                    }
                }]);
                return UserDirectoryPage;
            }(Page);

            _export('default', UserDirectoryPage);
        }
    };
});;
'use strict';

System.register('flagrow/user-directory/main', ['flarum/extend', 'flagrow/user-directory/components/UserDirectoryPage', 'flarum/components/UsersSearchSource', 'flarum/components/LinkButton'], function (_export, _context) {
    "use strict";

    var extend, UserDirectoryPage, UsersSearchSource, LinkButton;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flagrowUserDirectoryComponentsUserDirectoryPage) {
            UserDirectoryPage = _flagrowUserDirectoryComponentsUserDirectoryPage.default;
        }, function (_flarumComponentsUsersSearchSource) {
            UsersSearchSource = _flarumComponentsUsersSearchSource.default;
        }, function (_flarumComponentsLinkButton) {
            LinkButton = _flarumComponentsLinkButton.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-user-directory', function (app) {
                app.routes.flagrow_user_directory = { path: '/users', component: UserDirectoryPage.component() };

                extend(UsersSearchSource.prototype, 'view', function (view, query) {
                    query = query.toLowerCase();
                    var searchUserOnPage = m(
                        'li',
                        null,
                        LinkButton.component({
                            icon: 'search',
                            children: app.translator.trans('flagrow-user-directory.forum.search.users_heading', { query: query }),
                            href: app.route('flagrow_user_directory', { q: query })
                        })
                    );

                    if (view) {
                        view.splice(1, 0, searchUserOnPage);
                    }
                });
            });
        }
    };
});