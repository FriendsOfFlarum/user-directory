module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./forum.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./forum.js":
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./src/forum/components/UserDirectoryList.js":
/*!***************************************************!*\
  !*** ./src/forum/components/UserDirectoryList.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserDirectoryList; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/LoadingIndicator */ "flarum/components/LoadingIndicator");
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_Placeholder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/Placeholder */ "flarum/components/Placeholder");
/* harmony import */ var flarum_components_Placeholder__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Placeholder__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _UserDirectoryListItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UserDirectoryListItem */ "./src/forum/components/UserDirectoryListItem.js");







/**
 * The `DiscussionList` component displays a list of discussions.
 *
 * ### Props
 *
 * - `params` A map of parameters used to construct a refined parameter object
 *   to send along in the API request to get discussion results.
 */

var UserDirectoryList =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UserDirectoryList, _Component);

  function UserDirectoryList() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = UserDirectoryList.prototype;

  _proto.init = function init() {
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
  };

  _proto.view = function view() {
    var params = this.props.params;
    var loading;

    if (this.loading) {
      loading = flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default.a.component();
    } else if (this.moreResults) {
      loading = flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('core.forum.discussion_list.load_more_button'),
        className: 'Button',
        onclick: this.loadMore.bind(this)
      });
    }

    if (this.users.length === 0 && !this.loading) {
      var text = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('core.forum.discussion_list.empty_text');
      return m("div", {
        className: "DiscussionList"
      }, flarum_components_Placeholder__WEBPACK_IMPORTED_MODULE_5___default.a.component({
        text: text
      }));
    }

    return m("div", {
      className: "UserDirectoryList"
    }, this.users.map(function (user) {
      return m("div", {
        key: user.username(),
        "data-id": user.username()
      }, _UserDirectoryListItem__WEBPACK_IMPORTED_MODULE_6__["default"].component({
        user: user,
        params: params
      }));
    }), m("div", {
      className: "UserDirectoryList-loadMore"
    }, loading));
  }
  /**
   * Get the parameters that should be passed in the API request to get
   * discussion results.
   *
   * @return {Object}
   * @api
   */
  ;

  _proto.requestParams = function requestParams() {
    var params = {
      include: [],
      filter: {}
    };
    params.sort = this.sortMap()[this.props.params.sort];

    if (this.props.params.q) {
      params.filter.q = this.props.params.q;
    }

    return params;
  }
  /**
   * Get a map of sort keys (which appear in the URL, and are used for
   * translation) to the API sort value that they represent.
   *
   * @return {Object}
   */
  ;

  _proto.sortMap = function sortMap() {
    var map = {};

    if (this.props.params.q) {
      map.relevance = '';
    } else {
      map.default = '';
    }

    map.username_az = 'username';
    map.username_za = '-username';
    map.newest = '-joinedAt';
    map.oldest = 'joinedAt';
    map.seen_recent = '-lastSeenAt';
    map.seen_oldest = 'lastSeenAt';
    map.most_discussions = '-discussionCount';
    map.least_discussions = 'discussionCount';
    return map;
  }
  /**
   * Clear and reload the discussion list.
   *
   * @public
   */
  ;

  _proto.refresh = function refresh(clear) {
    var _this = this;

    if (clear === void 0) {
      clear = true;
    }

    if (clear) {
      this.loading = true;
      this.users = [];
    }

    return this.loadResults(0).then(function (results) {
      _this.users = [];

      _this.parseResults(results);
    }, function () {
      _this.loading = false;
      m.redraw();
    });
  }
  /**
   * Load a new page of discussion results.
   *
   * @param {Integer} offset The index to start the page at.
   * @return {Promise}
   */
  ;

  _proto.loadResults = function loadResults(offset) {
    var preloadedUsers = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.preloadedApiDocument();

    if (preloadedUsers) {
      return m.deferred().resolve(preloadedUsers).promise;
    }

    var params = this.requestParams();
    params.page = {
      offset: offset
    };
    params.include = params.include.join(',');
    return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.find('users', params);
  }
  /**
   * Load the next page of discussion results.
   *
   * @public
   */
  ;

  _proto.loadMore = function loadMore() {
    this.loading = true;
    this.loadResults(this.users.length).then(this.parseResults.bind(this));
  }
  /**
   * Parse results and append them to the discussion list.
   *
   * @param {Discussion[]} results
   * @return {Discussion[]}
   */
  ;

  _proto.parseResults = function parseResults(results) {
    [].push.apply(this.users, results);
    this.loading = false;
    this.moreResults = !!results.payload.links.next;
    m.lazyRedraw();
    return results;
  }
  /**
   * Remove a discussion from the list if it is present.
   *
   * @param {Discussion} discussion
   * @public
   */
  ;

  _proto.removeUser = function removeUser(user) {
    var index = this.users.indexOf(user);

    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
  /**
   * Add a discussion to the top of the list.
   *
   * @param {Discussion} discussion
   * @public
   */
  ;

  _proto.addUser = function addUser(user) {
    this.users.unshift(user);
  };

  return UserDirectoryList;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/forum/components/UserDirectoryListItem.js":
/*!*******************************************************!*\
  !*** ./src/forum/components/UserDirectoryListItem.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserDirectoryListItem; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_UserCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/UserCard */ "flarum/components/UserCard");
/* harmony import */ var flarum_components_UserCard__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_UserCard__WEBPACK_IMPORTED_MODULE_2__);




var UserDirectoryListItem =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UserDirectoryListItem, _Component);

  function UserDirectoryListItem() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = UserDirectoryListItem.prototype;

  _proto.view = function view() {
    var user = this.props.user;
    var card = flarum_components_UserCard__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      user: user,
      className: 'UserCard--directory',
      controlsButtonClassName: 'Button Button--icon Button--flat'
    });
    return m("div", {
      className: "User"
    }, card);
  };

  return UserDirectoryListItem;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/UserDirectoryPage.js":
/*!***************************************************!*\
  !*** ./src/forum/components/UserDirectoryPage.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserDirectoryPage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/helpers/listItems */ "flarum/helpers/listItems");
/* harmony import */ var flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/IndexPage */ "flarum/components/IndexPage");
/* harmony import */ var flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/components/DiscussionComposer */ "flarum/components/DiscussionComposer");
/* harmony import */ var flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/components/LogInModal */ "flarum/components/LogInModal");
/* harmony import */ var flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/components/Select */ "flarum/components/Select");
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Select__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/components/LinkButton */ "flarum/components/LinkButton");
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var flarum_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! flarum/components/SelectDropdown */ "flarum/components/SelectDropdown");
/* harmony import */ var flarum_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _UserDirectoryList__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./UserDirectoryList */ "./src/forum/components/UserDirectoryList.js");













/**
 * The `IndexPage` component displays the index page, including the welcome
 * hero, the sidebar, and the discussion list.
 */

var UserDirectoryPage =
/*#__PURE__*/
function (_Page) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UserDirectoryPage, _Page);

  function UserDirectoryPage() {
    return _Page.apply(this, arguments) || this;
  }

  var _proto = UserDirectoryPage.prototype;

  _proto.init = function init() {
    _Page.prototype.init.call(this); // If the user is coming from the discussion list, then they have either
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
      app.cache.userDirectoryList = new _UserDirectoryList__WEBPACK_IMPORTED_MODULE_12__["default"]({
        params: params
      });
    }

    this.bodyClass = 'User--directory';
  };

  _proto.onunload = function onunload() {
    // Save the scroll position so we can restore it when we return to the
    // discussion list.
    app.cache.scrollTop = $(window).scrollTop();
  };

  _proto.view = function view() {
    return m("div", {
      className: "IndexPage"
    }, flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_5___default.a.prototype.hero(), m("div", {
      className: "container"
    }, m("div", {
      className: "sideNavContainer"
    }, m("nav", {
      className: "IndexPage-nav sideNav"
    }, m("ul", null, flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4___default()(this.sidebarItems().toArray()))), m("div", {
      className: "IndexPage-results sideNavOffset"
    }, m("div", {
      className: "IndexPage-toolbar"
    }, m("ul", {
      className: "IndexPage-toolbar-view"
    }, flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4___default()(this.viewItems().toArray())), m("ul", {
      className: "IndexPage-toolbar-action"
    }, flarum_helpers_listItems__WEBPACK_IMPORTED_MODULE_4___default()(this.actionItems().toArray()))), app.cache.userDirectoryList.render()))));
  };

  _proto.config = function config(isInitialized, context) {
    _Page.prototype.config.apply(this, arguments);

    if (isInitialized) return;
    Object(flarum_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(context, 'onunload', function () {
      return $('#app').css('min-height', '');
    });
    app.setTitle('');
    app.setTitleCount(0); // Work out the difference between the height of this hero and that of the
    // previous hero. Maintain the same scroll position relative to the bottom
    // of the hero so that the sidebar doesn't jump around.

    var scrollTop = app.cache.scrollTop;
    $('#app').css('min-height', $(window).height()); // Scroll to the remembered position. We do this after a short delay so that
    // it happens after the browser has done its own "back button" scrolling,
    // which isn't right. https://github.com/flarum/core/issues/835

    var scroll = function scroll() {
      return $(window).scrollTop(scrollTop);
    };

    scroll();
    setTimeout(scroll, 1);
  }
  /**
   * Build an item list for the sidebar of the index page. By default this is a
   * "New Discussion" button, and then a DropdownSelect component containing a
   * list of navigation items.
   *
   * @return {ItemList}
   */
  ;

  _proto.sidebarItems = function sidebarItems() {
    var items = flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_5___default.a.prototype.sidebarItems();
    items.replace('nav', flarum_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_11___default.a.component({
      children: this.navItems(this).toArray(),
      buttonClassName: 'Button',
      className: 'App-titleControl'
    }));
    return items;
  }
  /**
   * Build an item list for the navigation in the sidebar of the index page. By
   * default this is just the 'All Discussions' link.
   *
   * @return {ItemList}
   */
  ;

  _proto.navItems = function navItems() {
    var items = flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_5___default.a.prototype.navItems();
    var params = this.stickyParams();
    items.add('userDirectory', flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_10___default.a.component({
      href: app.route('flagrow_user_directory', params),
      children: app.translator.trans('flagrow-user-directory.forum.page.nav'),
      icon: 'far fa-address-book'
    }), 85);
    return items;
  }
  /**
   * Build an item list for the part of the toolbar which is concerned with how
   * the results are displayed. By default this is just a select box to change
   * the way discussions are sorted.
   *
   * @return {ItemList}
   */
  ;

  _proto.viewItems = function viewItems() {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();
    var sortMap = app.cache.userDirectoryList.sortMap();
    var sortOptions = {};

    for (var i in sortMap) {
      sortOptions[i] = app.translator.trans('flagrow-user-directory.forum.page.sort.' + i);
    }

    items.add('sort', flarum_components_Select__WEBPACK_IMPORTED_MODULE_8___default.a.component({
      options: sortOptions,
      value: this.params().sort || Object.keys(sortMap)[0],
      onchange: this.changeSort.bind(this)
    }));
    return items;
  }
  /**
   * Build an item list for the part of the toolbar which is about taking action
   * on the results. By default this is just a "mark all as read" button.
   *
   * @return {ItemList}
   */
  ;

  _proto.actionItems = function actionItems() {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();
    items.add('refresh', flarum_components_Button__WEBPACK_IMPORTED_MODULE_9___default.a.component({
      title: app.translator.trans('core.forum.index.refresh_tooltip'),
      icon: 'fas fa-sync',
      className: 'Button Button--icon',
      onclick: function onclick() {
        app.cache.userDirectoryList.refresh();

        if (app.session.user) {
          app.store.find('users', app.session.user.id());
          m.redraw();
        }
      }
    }));
    return items;
  }
  /**
   * Return the current search query, if any. This is implemented to activate
   * the search box in the header.
   *
   * @see Search
   * @return {String}
   */
  ;

  _proto.searching = function searching() {
    return this.params().q;
  }
  /**
   * Redirect to the index page without a search filter. This is called when the
   * 'x' is clicked in the search box in the header.
   *
   * @see Search
   */
  ;

  _proto.clearSearch = function clearSearch() {
    var params = this.params();
    delete params.q;
    m.route(app.route(this.props.routeName, params));
  }
  /**
   * Redirect to the index page using the given sort parameter.
   *
   * @param {String} sort
   */
  ;

  _proto.changeSort = function changeSort(sort) {
    var params = this.params();

    if (sort === Object.keys(app.cache.userDirectoryList.sortMap())[0]) {
      delete params.sort;
    } else {
      params.sort = sort;
    }

    m.route(app.route(this.props.routeName, params));
  }
  /**
   * Get URL parameters that stick between filter changes.
   *
   * @return {Object}
   */
  ;

  _proto.stickyParams = function stickyParams() {
    return {
      sort: m.route.param('sort'),
      q: m.route.param('q')
    };
  }
  /**
   * Get parameters to pass to the UserDirectoryList component.
   *
   * @return {Object}
   */
  ;

  _proto.params = function params() {
    var params = this.stickyParams();
    params.filter = m.route.param('filter');
    return params;
  }
  /**
   * Log the user in and then open the composer for a new discussion.
   *
   * @return {Promise}
   */
  ;

  _proto.newDiscussion = function newDiscussion() {
    var deferred = m.deferred();

    if (app.session.user) {
      this.composeNewDiscussion(deferred);
    } else {
      app.modal.show(new flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_7___default.a({
        onlogin: this.composeNewDiscussion.bind(this, deferred)
      }));
    }

    return deferred.promise;
  }
  /**
   * Initialize the composer for a new discussion.
   *
   * @param {Deferred} deferred
   * @return {Promise}
   */
  ;

  _proto.composeNewDiscussion = function composeNewDiscussion(deferred) {
    var component = new flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_6___default.a({
      user: app.session.user
    });
    app.composer.load(component);
    app.composer.show();
    deferred.resolve(component);
    return deferred.promise;
  };

  return UserDirectoryPage;
}(flarum_components_Page__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_UsersSearchSource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/UsersSearchSource */ "flarum/components/UsersSearchSource");
/* harmony import */ var flarum_components_UsersSearchSource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_UsersSearchSource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/LinkButton */ "flarum/components/LinkButton");
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_UserDirectoryPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/UserDirectoryPage */ "./src/forum/components/UserDirectoryPage.js");





flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.initializers.add('flagrow-user-directory', function (app) {
  app.routes.flagrow_user_directory = {
    path: '/users',
    component: _components_UserDirectoryPage__WEBPACK_IMPORTED_MODULE_4__["default"].component()
  };
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_UsersSearchSource__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'view', function (view, query) {
    if (!view) {
      return;
    }

    query = query.toLowerCase();
    view.splice(1, 0, m("li", null, flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      icon: 'fas fa-search',
      children: app.translator.trans('flagrow-user-directory.forum.search.users_heading', {
        query: query
      }),
      href: app.route('flagrow_user_directory', {
        q: query
      })
    })));
  });
});

/***/ }),

/***/ "flarum/Component":
/*!**************************************************!*\
  !*** external "flarum.core.compat['Component']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Component'];

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/DiscussionComposer":
/*!**********************************************************************!*\
  !*** external "flarum.core.compat['components/DiscussionComposer']" ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/DiscussionComposer'];

/***/ }),

/***/ "flarum/components/IndexPage":
/*!*************************************************************!*\
  !*** external "flarum.core.compat['components/IndexPage']" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/IndexPage'];

/***/ }),

/***/ "flarum/components/LinkButton":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['components/LinkButton']" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LinkButton'];

/***/ }),

/***/ "flarum/components/LoadingIndicator":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['components/LoadingIndicator']" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LoadingIndicator'];

/***/ }),

/***/ "flarum/components/LogInModal":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['components/LogInModal']" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LogInModal'];

/***/ }),

/***/ "flarum/components/Page":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Page']" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Page'];

/***/ }),

/***/ "flarum/components/Placeholder":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['components/Placeholder']" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Placeholder'];

/***/ }),

/***/ "flarum/components/Select":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Select']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Select'];

/***/ }),

/***/ "flarum/components/SelectDropdown":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['components/SelectDropdown']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SelectDropdown'];

/***/ }),

/***/ "flarum/components/UserCard":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/UserCard']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/UserCard'];

/***/ }),

/***/ "flarum/components/UsersSearchSource":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['components/UsersSearchSource']" ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/UsersSearchSource'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/helpers/listItems":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['helpers/listItems']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/listItems'];

/***/ }),

/***/ "flarum/utils/ItemList":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['utils/ItemList']" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/ItemList'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map