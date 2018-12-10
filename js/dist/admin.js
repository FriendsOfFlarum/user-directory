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
/******/ 	return __webpack_require__(__webpack_require__.s = "./admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
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

/***/ "./src/admin/addUsersListPane.js":
/*!***************************************!*\
  !*** ./src/admin/addUsersListPane.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/AdminNav */ "flarum/components/AdminNav");
/* harmony import */ var flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/AdminLinkButton */ "flarum/components/AdminLinkButton");
/* harmony import */ var flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_UsersListPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/UsersListPage */ "./src/admin/components/UsersListPage.js");





/* harmony default export */ __webpack_exports__["default"] = (function () {
  flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.routes.usersList = {
    path: '/users-list',
    component: _components_UsersListPage__WEBPACK_IMPORTED_MODULE_4__["default"].component()
  };
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'items', function (items) {
    items.add('users-list', flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      href: flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.route('usersList'),
      icon: 'fas fa-users',
      children: flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.translator.trans('flagrow-user-directory.admin.nav.users_button'),
      description: flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.translator.trans('flagrow-user-directory.admin.nav.users_text')
    }));
  });
});

/***/ }),

/***/ "./src/admin/components/EmailUserModal.js":
/*!************************************************!*\
  !*** ./src/admin/components/EmailUserModal.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EmailUserModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);




/**
 * The `EmailUserModal` component shows a modal dialog which allows admin
 * to send message to user.
 */

var EmailUserModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(EmailUserModal, _Modal);

  function EmailUserModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = EmailUserModal.prototype;

  _proto.init = function init() {
    _Modal.prototype.init.call(this);

    this.loading = false;
    this.user = this.props.user;
    this.forAll = this.props.forAll;
    this.subject = m.prop(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-user-directory.admin.modal_mail.default_subject')[0]);
    this.messageText = m.prop('');

    if (!this.forAll) {
      this.email = m.prop(this.user.email() || '');
      this.submitDisabled = !this.checkEmail(this.email());
    } else {
      this.submitDisabled = false;
    }
  };

  _proto.className = function className() {
    return 'EmailUserModal Modal--large';
  };

  _proto.title = function title() {
    var title = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-user-directory.admin.modal_mail.title_text');

    if (this.forAll) {
      title += ' ' + flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-user-directory.admin.modal_mail.title_all_text');
    } else {
      title += ' ' + this.user.username() + ' (' + this.email() + ')';
    }

    return title;
  };

  _proto.content = function content() {
    return m("div", {
      className: "Modal-body"
    }, m("form", {
      className: "Form",
      onsubmit: this.onsubmit.bind(this)
    }, !this.forAll && m("div", {
      className: "Form-group"
    }, m("label", null, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-user-directory.admin.modal_mail.email_label')), m("input", {
      type: "text",
      className: "FormControl",
      value: this.email(),
      oninput: this.oninputEmail.bind(this)
    })), m("div", {
      className: "Form-group"
    }, m("label", null, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-user-directory.admin.modal_mail.subject_label')), m("input", {
      type: "text",
      className: "FormControl",
      bidi: this.subject
    })), m("div", {
      className: "Form-group"
    }, m("label", null, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-user-directory.admin.modal_mail.message_label')), m("textarea", {
      rows: "10",
      className: "FormControl",
      style: "resize: vertical; width: 100%;",
      bidi: this.messageText
    })), flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      type: 'submit',
      className: 'Button Button--primary EditContactModal-save',
      loading: this.loading,
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-user-directory.admin.modal_mail.submit_button'),
      disabled: this.submitDisabled
    })));
  };

  _proto.oninputEmail = function oninputEmail(value) {
    this.email(value);
    this.submitDisabled = !this.checkEmail(value);
  };

  _proto.checkEmail = function checkEmail(email) {
    var emailRegexp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    var correct = true;
    var emails = this.splitEmails(email);
    emails.forEach(function (email) {
      if (!emailRegexp.test(email)) {
        correct = false;
      }
    });
    return correct;
  };

  _proto.splitEmails = function splitEmails(email) {
    email = email.replace(/\s*/g, '');
    return email.split(',');
  };

  _proto.onsubmit = function onsubmit(e) {
    var _this = this;

    e.preventDefault();
    this.loading = true;
    var data = {
      emails: this.forAll ? [] : this.splitEmails(this.email()),
      subject: this.subject(),
      text: this.messageText(),
      forAll: !!this.forAll
    };
    flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.request({
      method: 'POST',
      url: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('apiUrl') + '/admin-mail',
      data: {
        data: data
      }
    }).then(function () {
      _this.hide();
    }, function (response) {
      _this.loading = false;

      _this.onerror(response);
    });
  };

  return EmailUserModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/admin/components/UsersListPage.js":
/*!***********************************************!*\
  !*** ./src/admin/components/UsersListPage.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UsersListPage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/LoadingIndicator */ "flarum/components/LoadingIndicator");
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_helpers_humanTime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/helpers/humanTime */ "flarum/helpers/humanTime");
/* harmony import */ var flarum_helpers_humanTime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_humanTime__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _EmailUserModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EmailUserModal */ "./src/admin/components/EmailUserModal.js");









function UserItem(user) {
  var url = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('baseUrl') + "/u/" + user.id();
  var online = user.isOnline();
  return [m('li', {
    "data-id": user.id()
  }, [m('div', {
    className: 'UsersListItem-info'
  }, [m('span', {
    className: 'UsersListItem-name'
  }, [user.username()]), m('span', {
    className: 'UserCard-lastSeen' + (online ? ' online' : '')
  }, [online ? [flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_6___default()('fas fa-circle'), ' ', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-user-directory.admin.page.online_text')] : [flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_6___default()('far fa-clock'), ' ', flarum_helpers_humanTime__WEBPACK_IMPORTED_MODULE_5___default()(user.lastSeenAt())]]), m('span', {
    className: 'UsersListItem-comments'
  }, [flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_6___default()('comment-o'), user.commentCount()]), m('span', {
    className: 'UsersListItem-discussions'
  }, [flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_6___default()('reorder'), user.discussionCount()]), m('a', {
    className: 'Button Button--link',
    target: '_blank',
    href: url
  }, [flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_6___default()('fas fa-eye')]), flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
    className: 'Button Button--link',
    icon: 'fas fa-envelope',
    onclick: function onclick(e) {
      e.preventDefault();
      flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.modal.show(new _EmailUserModal__WEBPACK_IMPORTED_MODULE_7__["default"]({
        user: user
      }));
    }
  })])])];
}

var UsersListPage =
/*#__PURE__*/
function (_Page) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UsersListPage, _Page);

  function UsersListPage() {
    return _Page.apply(this, arguments) || this;
  }

  var _proto = UsersListPage.prototype;

  _proto.init = function init() {
    _Page.prototype.init.call(this);

    this.loading = true;
    this.moreResults = false;
    this.users = [];
    this.refresh();
  };

  _proto.view = function view() {
    var loading;

    if (this.loading) {
      loading = flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default.a.component();
    } else if (this.moreResults) {
      loading = flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-user-directory.admin.page.load_more_button'),
        className: 'Button',
        onclick: this.loadMore.bind(this)
      });
    }

    return m("div", {
      className: "UsersListPage"
    }, m("div", {
      className: "UsersListPage-header"
    }, m("div", {
      className: "container"
    }, m("p", null, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-user-directory.admin.page.about_text')), flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      className: 'Button Button--primary',
      icon: 'plus',
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-user-directory.admin.page.mail_all_button'),
      onclick: function onclick() {
        return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.modal.show(new _EmailUserModal__WEBPACK_IMPORTED_MODULE_7__["default"]({
          forAll: true
        }));
      }
    }))), m("div", {
      className: "UsersListPage-list"
    }, m("div", {
      className: "container"
    }, m("div", {
      className: "UsersListItems"
    }, m("label", null, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-user-directory.admin.page.list_title')), m("ol", {
      className: "UsersList"
    }, this.users.map(UserItem)), m("div", {
      className: "UsersListPage-loadMore"
    }, loading)))));
  };

  _proto.refresh = function refresh(clear) {
    var _this = this;

    if (clear === void 0) {
      clear = true;
    }

    if (clear) {
      this.loading = true;
      this.users = [];
    }

    return this.loadResults().then(function (results) {
      _this.users = [];

      _this.parseResults(results);
    }, function () {
      _this.loading = false;
      m.redraw();
    });
  };

  _proto.loadResults = function loadResults(offset) {
    var params = {};
    params.page = {
      offset: offset,
      limit: 50
    };
    params.sort = 'username';
    return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.find('users', params);
  };

  _proto.loadMore = function loadMore() {
    this.loading = true;
    this.loadResults(this.users.length).then(this.parseResults.bind(this));
  };

  _proto.parseResults = function parseResults(results) {
    [].push.apply(this.users, results);
    this.loading = false;
    this.moreResults = !!results.payload.links.next;
    m.lazyRedraw();
    return results;
  };

  return UsersListPage;
}(flarum_components_Page__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/PermissionGrid */ "flarum/components/PermissionGrid");
/* harmony import */ var flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _addUsersListPane__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addUsersListPane */ "./src/admin/addUsersListPane.js");




flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.initializers.add('flagrow-user-directory', function (app) {
  // add the permission option to the relative pane
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'viewItems', function (items) {
    items.add('user-directory', {
      icon: 'address-book-o',
      label: app.translator.trans('flagrow-user-directory.admin.permissions.view_user_directory'),
      permission: 'flagrow.user-directory.view',
      allowGuest: true
    });
  });

  app.extensionSettings['flagrow-user-directory'] = function () {
    return m.route(app.route('usersList'));
  };

  Object(_addUsersListPane__WEBPACK_IMPORTED_MODULE_3__["default"])();
});

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/components/AdminLinkButton":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['components/AdminLinkButton']" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/AdminLinkButton'];

/***/ }),

/***/ "flarum/components/AdminNav":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/AdminNav']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/AdminNav'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/LoadingIndicator":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['components/LoadingIndicator']" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LoadingIndicator'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/Page":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Page']" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Page'];

/***/ }),

/***/ "flarum/components/PermissionGrid":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['components/PermissionGrid']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/PermissionGrid'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/helpers/humanTime":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['helpers/humanTime']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/humanTime'];

/***/ }),

/***/ "flarum/helpers/icon":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['helpers/icon']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/icon'];

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map