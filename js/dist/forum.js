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
/*! exports provided: UserDirectoryPage, UserDirectoryList, UserDirectoryListItem, UserDirectoryState, SortMap, CheckableButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserDirectoryPage", function() { return _src_forum__WEBPACK_IMPORTED_MODULE_0__["UserDirectoryPage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserDirectoryList", function() { return _src_forum__WEBPACK_IMPORTED_MODULE_0__["UserDirectoryList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserDirectoryListItem", function() { return _src_forum__WEBPACK_IMPORTED_MODULE_0__["UserDirectoryListItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserDirectoryState", function() { return _src_forum__WEBPACK_IMPORTED_MODULE_0__["UserDirectoryState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SortMap", function() { return _src_forum__WEBPACK_IMPORTED_MODULE_0__["SortMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckableButton", function() { return _src_forum__WEBPACK_IMPORTED_MODULE_0__["CheckableButton"]; });



/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

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

/***/ "./src/common/utils/SortMap.js":
/*!*************************************!*\
  !*** ./src/common/utils/SortMap.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SortMap; });
/**
 * The sort options.
 * We use a class and not just a POJO/function because we want extensions to be able to extend it
 */
var SortMap = /*#__PURE__*/function () {
  function SortMap() {}

  var _proto = SortMap.prototype;

  _proto.sortMap = function sortMap() {
    return {
      username_az: 'username',
      username_za: '-username',
      newest: '-joinedAt',
      oldest: 'joinedAt',
      most_discussions: '-discussionCount',
      least_discussions: 'discussionCount'
    };
  };

  return SortMap;
}();



/***/ }),

/***/ "./src/forum/components/CheckableButton.js":
/*!*************************************************!*\
  !*** ./src/forum/components/CheckableButton.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CheckableButton; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/helpers/icon */ "flarum/common/helpers/icon");
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_2__);




var CheckableButton = /*#__PURE__*/function (_Button) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(CheckableButton, _Button);

  function CheckableButton() {
    return _Button.apply(this, arguments) || this;
  }

  var _proto = CheckableButton.prototype;

  /**
   * Get the template for the button's content.
   *
   * @return {*}
   * @protected
   */
  _proto.getButtonContent = function getButtonContent(children) {
    var prev = _Button.prototype.getButtonContent.call(this, children);

    if (this.attrs.checked) prev.push(flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()('fas fa-check', {
      className: 'Button-icon ButtonCheck'
    }));
    return prev;
  };

  return CheckableButton;
}(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/SearchField.js":
/*!*********************************************!*\
  !*** ./src/forum/components/SearchField.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SearchField; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/utils/withAttr */ "flarum/common/utils/withAttr");
/* harmony import */ var flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_4__);






var SearchField = /*#__PURE__*/function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(SearchField, _Component);

  function SearchField() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = SearchField.prototype;

  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);
  };

  _proto.view = function view() {
    var _this = this;

    return m("div", {
      className: "Form-group Usersearchbox"
    }, m("input", {
      className: "FormControl",
      placeholder: flarum_common_app__WEBPACK_IMPORTED_MODULE_2___default.a.translator.trans('fof-user-directory.forum.search.field.placeholder'),
      value: this.filter,
      oninput: flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_4___default()('value', function (value) {
        _this.filter = value;

        _this.performNewSearch();
      })
    }));
  };

  _proto.performNewSearch = function performNewSearch() {
    this.attrs.state.refreshParams(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.attrs.state.getParams(), {
      qBuilder: {
        filter: this.filter
      }
    }));
  };

  return SearchField;
}(flarum_common_Component__WEBPACK_IMPORTED_MODULE_3___default.a);



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
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Placeholder */ "flarum/common/components/Placeholder");
/* harmony import */ var flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _UserDirectoryListItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UserDirectoryListItem */ "./src/forum/components/UserDirectoryListItem.js");







/**
 * Based on Flarum's DiscussionList
 */

var UserDirectoryList = /*#__PURE__*/function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UserDirectoryList, _Component);

  function UserDirectoryList() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = UserDirectoryList.prototype;

  _proto.view = function view() {
    var state = this.attrs.state;
    var params = state.getParams();
    var loading;

    if (state.isLoading()) {
      loading = flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default.a.component();
    } else if (state.moreResults) {
      loading = flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        className: 'Button',
        onclick: state.loadMore.bind(state)
      }, flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('fof-user-directory.forum.page.load_more_button'));
    }

    if (state.empty()) {
      var text = flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('fof-user-directory.forum.page.empty_text');
      return m("div", {
        className: "DiscussionList"
      }, flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_5___default.a.component({
        text: text
      }));
    }

    return m("div", {
      className: 'UserDirectoryList' + (state.isSearchResults() ? ' UserDirectoryList--searchResults' : '')
    }, m("ul", {
      className: "UserDirectoryList-users"
    }, state.users.map(function (user) {
      return m("li", {
        key: user.id(),
        "data-id": user.id()
      }, _UserDirectoryListItem__WEBPACK_IMPORTED_MODULE_6__["default"].component({
        user: user,
        params: params
      }));
    })), m("div", {
      className: "UserDirectoryList-loadMore"
    }, loading));
  };

  return UserDirectoryList;
}(flarum_common_Component__WEBPACK_IMPORTED_MODULE_2___default.a);



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
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_UserCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/UserCard */ "flarum/common/components/UserCard");
/* harmony import */ var flarum_common_components_UserCard__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_UserCard__WEBPACK_IMPORTED_MODULE_2__);




var UserDirectoryListItem = /*#__PURE__*/function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UserDirectoryListItem, _Component);

  function UserDirectoryListItem() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = UserDirectoryListItem.prototype;

  _proto.view = function view() {
    var user = this.attrs.user;
    return m("div", {
      className: "User"
    }, flarum_common_components_UserCard__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      user: user,
      className: 'UserCard--directory',
      controlsButtonClassName: 'Button Button--icon Button--flat'
    }));
  };

  return UserDirectoryListItem;
}(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



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
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Page */ "flarum/common/components/Page");
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/utils/ItemList */ "flarum/common/utils/ItemList");
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/helpers/listItems */ "flarum/common/helpers/listItems");
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_IndexPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/IndexPage */ "flarum/common/components/IndexPage");
/* harmony import */ var flarum_common_components_IndexPage__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_IndexPage__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/common/components/LinkButton */ "flarum/common/components/LinkButton");
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_common_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/common/components/SelectDropdown */ "flarum/common/components/SelectDropdown");
/* harmony import */ var flarum_common_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/common/components/Dropdown */ "flarum/common/components/Dropdown");
/* harmony import */ var flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _UserDirectoryList__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./UserDirectoryList */ "./src/forum/components/UserDirectoryList.js");
/* harmony import */ var _states_UserDirectoryState__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../states/UserDirectoryState */ "./src/forum/states/UserDirectoryState.js");
/* harmony import */ var _CheckableButton__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./CheckableButton */ "./src/forum/components/CheckableButton.js");
/* harmony import */ var _SearchField__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./SearchField */ "./src/forum/components/SearchField.js");
/* harmony import */ var flarum_common_components_Separator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! flarum/common/components/Separator */ "flarum/common/components/Separator");
/* harmony import */ var flarum_common_components_Separator__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Separator__WEBPACK_IMPORTED_MODULE_15__);
















/**
 * This page re-uses Flarum's IndexPage CSS classes
 */

var UserDirectoryPage = /*#__PURE__*/function (_Page) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UserDirectoryPage, _Page);

  function UserDirectoryPage() {
    return _Page.apply(this, arguments) || this;
  }

  var _proto = UserDirectoryPage.prototype;

  _proto.oninit = function oninit(vnode) {
    _Page.prototype.oninit.call(this, vnode);

    this.state = new _states_UserDirectoryState__WEBPACK_IMPORTED_MODULE_12__["default"]({});
    this.state.refreshParams(flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.search.params());
    this.bodyClass = 'User--directory';
    var idSegments = [];

    if (this.params().q) {
      Array.from(this.params().q.matchAll(/group:([\d,]+)/g)).forEach(function (match) {
        idSegments.push(match[1]);
      });
    }

    this.enabledGroupFilters = idSegments.join(',').split(',').filter(function (id) {
      return id;
    });
    this.enabledSpecialGroupFilters = [];
    flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.history.push('users', flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('fof-user-directory.forum.header.back_to_user_directory_tooltip'));
  };

  _proto.view = function view() {
    return m("div", {
      className: "IndexPage"
    }, flarum_common_components_IndexPage__WEBPACK_IMPORTED_MODULE_5___default.a.prototype.hero(), m("div", {
      className: "container"
    }, m("div", {
      className: "sideNavContainer"
    }, m("nav", {
      className: "IndexPage-nav sideNav"
    }, m("ul", null, flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_4___default()(this.sidebarItems().toArray()))), m("div", {
      className: "IndexPage-results sideNavOffset"
    }, m("div", {
      className: "IndexPage-toolbar"
    }, m("ul", {
      className: "IndexPage-toolbar-view"
    }, flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_4___default()(this.viewItems().toArray())), m("ul", {
      className: "IndexPage-toolbar-action"
    }, flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_4___default()(this.actionItems().toArray()))), m(_UserDirectoryList__WEBPACK_IMPORTED_MODULE_11__["default"], {
      state: this.state
    })))));
  }
  /**
   * Our own sidebar. Re-uses Index.sidebarItems as the base
   * Elements added here will only show up on the user directory page
   *
   * @return {ItemList}
   */
  ;

  _proto.sidebarItems = function sidebarItems() {
    var items = flarum_common_components_IndexPage__WEBPACK_IMPORTED_MODULE_5___default.a.prototype.sidebarItems();
    items.replace('nav', flarum_common_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_9___default.a.component({
      buttonClassName: 'Button',
      className: 'App-titleControl'
    }, this.navItems().toArray()));
    return items;
  }
  /**
   * Our own sidebar navigation. Re-uses Index.navItems as the base
   * Elements added here will only show up on the user directory page
   *
   * @return {ItemList}
   */
  ;

  _proto.navItems = function navItems() {
    var items = flarum_common_components_IndexPage__WEBPACK_IMPORTED_MODULE_5___default.a.prototype.navItems();
    var params = this.stickyParams();
    items.add('fof-user-directory', flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_8___default.a.component({
      href: flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.route('fof_user_directory', params),
      icon: 'far fa-address-book'
    }, flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('fof-user-directory.forum.page.nav')), 85);
    return items;
  };

  _proto.viewItems = function viewItems() {
    var items = new flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();
    var sortMap = this.state.sortMap();
    var sortOptions = {};

    for (var i in sortMap) {
      sortOptions[i] = flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('fof-user-directory.lib.sort.' + i);
    }

    items.add('sort', flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_6___default.a.component({
      options: sortOptions,
      value: this.params().sort || flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('userDirectoryDefaultSort'),
      onchange: this.changeParams.bind(this)
    }));
    items.add('filterGroups', flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_10___default.a.component({
      caretIcon: 'fas fa-filter',
      label: flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('fof-user-directory.forum.page.filter_button'),
      buttonClassName: 'FormControl',
      className: 'GroupFilterDropdown'
    }, this.groupItems().toArray()));
    items.add('search', _SearchField__WEBPACK_IMPORTED_MODULE_14__["default"].component({
      state: this.state
    }));
    return items;
  };

  _proto.groupItems = function groupItems() {
    var _this = this;

    var items = new flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();
    flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.all('groups').filter(function (group) {
      return group.id() !== '2' && group.id() !== '3';
    }).forEach(function (group) {
      items.add(group.namePlural(), _CheckableButton__WEBPACK_IMPORTED_MODULE_13__["default"].component({
        className: 'GroupFilterButton',
        icon: group.icon(),
        checked: _this.enabledGroupFilters.includes(group.id()),
        onclick: function onclick() {
          var id = group.id();

          if (_this.enabledGroupFilters.includes(id)) {
            _this.enabledGroupFilters = _this.enabledGroupFilters.filter(function (e) {
              return e != id;
            });
          } else {
            _this.enabledGroupFilters.push(id);
          }

          _this.changeParams(_this.params().sort);
        }
      }, group.namePlural()));
    });

    if (flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.initializers.has('flarum-suspend') && flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('hasSuspendPermission')) {
      items.add('suspend', _CheckableButton__WEBPACK_IMPORTED_MODULE_13__["default"].component({
        className: 'GroupFilterButton',
        icon: 'fas fa-ban',
        checked: this.enabledSpecialGroupFilters['flarum-suspend'] === 'is:suspended',
        onclick: function onclick() {
          var id = 'flarum-suspend';

          if (_this.enabledSpecialGroupFilters[id] === 'is:suspended') {
            _this.enabledSpecialGroupFilters[id] = '';
          } else {
            _this.enabledSpecialGroupFilters[id] = 'is:suspended';
          }

          _this.changeParams(_this.params().sort);
        }
      }, flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flarum-suspend.forum.user_badge.suspended_tooltip')), 90);
      items.add('seperator', flarum_common_components_Separator__WEBPACK_IMPORTED_MODULE_15___default.a.component(), 50);
    }

    return items;
  };

  _proto.actionItems = function actionItems() {
    var _this2 = this;

    var items = new flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();
    items.add('refresh', flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7___default.a.component({
      title: flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('fof-user-directory.forum.page.refresh_tooltip'),
      icon: 'fas fa-sync',
      className: 'Button Button--icon',
      onclick: function onclick() {
        _this2.state.refresh();

        if (flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.session.user) {
          flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.find('users', flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.session.user.id());
          m.redraw();
        }
      }
    }));
    return items;
  }
  /**
   * Redirect to the index page using the given sort parameter.
   *
   * @param {String} sort
   */
  ;

  _proto.changeParams = function changeParams(sort) {
    var params = this.params();

    if (sort === flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('userDirectoryDefaultSort')) {
      delete params.sort;
    } else {
      params.sort = sort;
    }

    var moreQ = '';

    for (var filter in this.enabledSpecialGroupFilters) {
      moreQ += this.enabledSpecialGroupFilters[filter] + ' ';
    }

    if (this.enabledGroupFilters.length > 0) {
      params.qBuilder = {
        groups: 'group:' + this.enabledGroupFilters.join(',')
      };
    } else {
      params.qBuilder = {
        groups: '',
        q: moreQ.trim()
      };
    }

    this.state.refreshParams(params);
  };

  _proto.stickyParams = function stickyParams() {
    return {
      sort: m.route.param('sort'),
      q: m.route.param('q')
    };
  };

  _proto.params = function params() {
    return this.stickyParams();
  };

  return UserDirectoryPage;
}(flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! exports provided: UserDirectoryPage, UserDirectoryList, UserDirectoryListItem, UserDirectoryState, SortMap, CheckableButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_UsersSearchSource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/UsersSearchSource */ "flarum/common/components/UsersSearchSource");
/* harmony import */ var flarum_common_components_UsersSearchSource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_UsersSearchSource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/LinkButton */ "flarum/common/components/LinkButton");
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_IndexPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/IndexPage */ "flarum/common/components/IndexPage");
/* harmony import */ var flarum_common_components_IndexPage__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_IndexPage__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_UserDirectoryPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/UserDirectoryPage */ "./src/forum/components/UserDirectoryPage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserDirectoryPage", function() { return _components_UserDirectoryPage__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _components_UserDirectoryList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/UserDirectoryList */ "./src/forum/components/UserDirectoryList.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserDirectoryList", function() { return _components_UserDirectoryList__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _components_UserDirectoryListItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/UserDirectoryListItem */ "./src/forum/components/UserDirectoryListItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserDirectoryListItem", function() { return _components_UserDirectoryListItem__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _states_UserDirectoryState__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./states/UserDirectoryState */ "./src/forum/states/UserDirectoryState.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserDirectoryState", function() { return _states_UserDirectoryState__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _common_utils_SortMap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/utils/SortMap */ "./src/common/utils/SortMap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SortMap", function() { return _common_utils_SortMap__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _components_CheckableButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/CheckableButton */ "./src/forum/components/CheckableButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckableButton", function() { return _components_CheckableButton__WEBPACK_IMPORTED_MODULE_10__["default"]; });











 // Allow other extensions to extend the page


flarum_common_app__WEBPACK_IMPORTED_MODULE_1___default.a.initializers.add('fof-user-directory', function (app) {
  app.routes.fof_user_directory = {
    path: '/users',
    component: _components_UserDirectoryPage__WEBPACK_IMPORTED_MODULE_5__["default"]
  };
  Object(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_common_components_UsersSearchSource__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'view', function (view, query) {
    if (!view) {
      return;
    }

    query = query.toLowerCase();
    view.splice(1, 0, m('li', flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      href: app.route('fof_user_directory', {
        q: query
      }),
      icon: 'fas fa-search'
    }, app.translator.trans('fof-user-directory.forum.search.users_heading', {
      query: query
    }))));
  });
  Object(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_common_components_IndexPage__WEBPACK_IMPORTED_MODULE_4___default.a.prototype, 'navItems', function (items) {
    if (app.forum.attribute('canSeeUserDirectoryLink')) {
      items.add('fof-user-directory', flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        href: app.route('fof_user_directory'),
        icon: 'far fa-address-book'
      }, app.translator.trans('fof-user-directory.forum.page.nav')), 85);
    }
  });
});

/***/ }),

/***/ "./src/forum/states/UserDirectoryState.js":
/*!************************************************!*\
  !*** ./src/forum/states/UserDirectoryState.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserDirectoryState; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _common_utils_SortMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/utils/SortMap */ "./src/common/utils/SortMap.js");


/**
 * Based on Flarum's DiscussionListState
 */


var UserDirectoryState = /*#__PURE__*/function () {
  function UserDirectoryState(params, app) {
    if (params === void 0) {
      params = {};
    }

    if (app === void 0) {
      app = window.app;
    }

    this.params = params;
    this.app = app;
    this.users = [];
    this.moreResults = false;
    this.loading = false;
    this.qBuilder = {};
  }

  var _proto = UserDirectoryState.prototype;

  _proto.requestParams = function requestParams() {
    var params = {
      include: [],
      filter: {}
    };
    var sortKey = this.params.sort || app.forum.attribute('userDirectoryDefaultSort'); // sort might be set to null if no sort params has been passed

    params.sort = this.sortMap()[sortKey];

    if (this.params.q) {
      params.filter.q = this.params.q;
    }

    return params;
  };

  _proto.sortMap = function sortMap() {
    return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      "default": ''
    }, new _common_utils_SortMap__WEBPACK_IMPORTED_MODULE_1__["default"]().sortMap());
  };

  _proto.getParams = function getParams() {
    return this.params;
  };

  _proto.clear = function clear() {
    this.users = [];
    m.redraw();
  };

  _proto.refreshParams = function refreshParams(newParams) {
    var _this = this;

    if (!this.hasUsers() || Object.keys(newParams).some(function (key) {
      return _this.getParams()[key] !== newParams[key];
    })) {
      this.params = newParams;

      Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(this.qBuilder, newParams.qBuilder || {});

      this.params.q = Object.values(this.qBuilder).join(' ').trim();
      this.refresh();
    }
  };

  _proto.refresh = function refresh() {
    var _this2 = this;

    this.loading = true;
    this.clear();
    return this.loadResults().then(function (results) {
      _this2.users = [];

      _this2.parseResults(results);
    }, function () {
      _this2.loading = false;
      m.redraw();
    });
  };

  _proto.loadResults = function loadResults(offset) {
    var preloadedUsers = this.app.preloadedApiDocument();

    if (preloadedUsers) {
      return Promise.resolve(preloadedUsers);
    }

    var params = this.requestParams();
    params.page = {
      offset: offset
    };
    params.include = params.include.join(',');
    return this.app.store.find('users', params);
  };

  _proto.loadMore = function loadMore() {
    this.loading = true;
    this.loadResults(this.users.length).then(this.parseResults.bind(this));
  };

  _proto.parseResults = function parseResults(results) {
    var _this$users;

    (_this$users = this.users).push.apply(_this$users, results);

    this.loading = false;
    this.moreResults = !!results.payload.links && !!results.payload.links.next;
    m.redraw();
    return results;
  };

  _proto.hasUsers = function hasUsers() {
    return this.users.length > 0;
  };

  _proto.isLoading = function isLoading() {
    return this.loading;
  };

  _proto.isSearchResults = function isSearchResults() {
    return !!this.params.q;
  };

  _proto.empty = function empty() {
    return !this.hasUsers() && !this.isLoading();
  };

  return UserDirectoryState;
}();



/***/ }),

/***/ "flarum/common/Component":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/Component']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/Component'];

/***/ }),

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/app'];

/***/ }),

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/Dropdown":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['common/components/Dropdown']" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Dropdown'];

/***/ }),

/***/ "flarum/common/components/IndexPage":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['common/components/IndexPage']" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/IndexPage'];

/***/ }),

/***/ "flarum/common/components/LinkButton":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['common/components/LinkButton']" ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/LinkButton'];

/***/ }),

/***/ "flarum/common/components/LoadingIndicator":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/LoadingIndicator']" ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/LoadingIndicator'];

/***/ }),

/***/ "flarum/common/components/Page":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/components/Page']" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Page'];

/***/ }),

/***/ "flarum/common/components/Placeholder":
/*!**********************************************************************!*\
  !*** external "flarum.core.compat['common/components/Placeholder']" ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Placeholder'];

/***/ }),

/***/ "flarum/common/components/Select":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Select']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Select'];

/***/ }),

/***/ "flarum/common/components/SelectDropdown":
/*!*************************************************************************!*\
  !*** external "flarum.core.compat['common/components/SelectDropdown']" ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/SelectDropdown'];

/***/ }),

/***/ "flarum/common/components/Separator":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['common/components/Separator']" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Separator'];

/***/ }),

/***/ "flarum/common/components/UserCard":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['common/components/UserCard']" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/UserCard'];

/***/ }),

/***/ "flarum/common/components/UsersSearchSource":
/*!****************************************************************************!*\
  !*** external "flarum.core.compat['common/components/UsersSearchSource']" ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/UsersSearchSource'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/helpers/icon":
/*!************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/icon']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/helpers/icon'];

/***/ }),

/***/ "flarum/common/helpers/listItems":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/listItems']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/helpers/listItems'];

/***/ }),

/***/ "flarum/common/utils/ItemList":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['common/utils/ItemList']" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/utils/ItemList'];

/***/ }),

/***/ "flarum/common/utils/withAttr":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['common/utils/withAttr']" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/utils/withAttr'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map