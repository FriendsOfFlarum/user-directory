/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(e, r, t) {
  return (r = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function toPrimitive(t, r) {
  if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function toPropertyKey(t) {
  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(t, "string");
  return "symbol" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i) ? i : i + "";
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}


/***/ }),

/***/ "./src/common/utils/SortMap.js":
/*!*************************************!*\
  !*** ./src/common/utils/SortMap.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SortMap)
/* harmony export */ });
/**
 * The sort options.
 * We use a class and not just a POJO/function because we want extensions to be able to extend it
 */
class SortMap {
  sortMap() {
    return {
      username_az: 'username',
      username_za: '-username',
      newest: '-joinedAt',
      oldest: 'joinedAt',
      most_discussions: '-discussionCount',
      least_discussions: 'discussionCount'
    };
  }
}
flarum.reg.add('fof-user-directory', 'common/utils/SortMap', SortMap);

/***/ }),

/***/ "./src/forum/components/CheckableButton.js":
/*!*************************************************!*\
  !*** ./src/forum/components/CheckableButton.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckableButton)
/* harmony export */ });
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Icon */ "flarum/common/components/Icon");
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_1__);


class CheckableButton extends (flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_0___default()) {
  /**
   * Get the template for the button's content.
   *
   * @return {*}
   * @protected
   */
  getButtonContent(children) {
    const prev = super.getButtonContent(children);
    if (this.attrs.checked) prev.push(m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_1___default()), {
      name: "fas fa-check",
      className: "Button-icon ButtonCheck"
    }));
    return prev;
  }
}
flarum.reg.add('fof-user-directory', 'forum/components/CheckableButton', CheckableButton);

/***/ }),

/***/ "./src/forum/components/SearchField.js":
/*!*********************************************!*\
  !*** ./src/forum/components/SearchField.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchField)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/utils/withAttr */ "flarum/common/utils/withAttr");
/* harmony import */ var flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_utils_KeyboardNavigatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/utils/KeyboardNavigatable */ "flarum/common/utils/KeyboardNavigatable");
/* harmony import */ var flarum_common_utils_KeyboardNavigatable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_KeyboardNavigatable__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _searchTypes_TextFilter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../searchTypes/TextFilter */ "./src/forum/searchTypes/TextFilter.js");
/* harmony import */ var _searchTypes_GroupFilter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../searchTypes/GroupFilter */ "./src/forum/searchTypes/GroupFilter.js");








class SearchField extends (flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default()) {
  oninit(vnode) {
    super.oninit(vnode);
    this.searchIndex = 0;
    this.navigator = new (flarum_common_utils_KeyboardNavigatable__WEBPACK_IMPORTED_MODULE_4___default())();
    this.navigator.when(event => {
      // Do not handle keyboard when TAB is pressed and there's nothing in field
      // Without this it's impossible to TAB out of the field
      return event.key !== 'Tab' || !!this.filter;
    }).onUp(() => {
      if (this.searchIndex > 0) {
        this.searchIndex--;
        m.redraw();
      }
    }).onDown(() => {
      if (this.searchIndex < this.allSuggestions().length - 1) {
        this.searchIndex++;
        m.redraw();
      }
    }).onSelect(() => {
      if (this.filter) {
        this.selectResult(this.allSuggestions()[this.searchIndex]);
        m.redraw();
      } else {
        this.applyFiltering();
      }
    }).onRemove(() => {
      this.appliedFilters.pop();
    });
    this.availableFilters = this.filterTypes().toArray();
    this.appliedFilters = [];
    this.filter = '';
    this.focused = false;

    // When the page loads, initialize UI with filters from the parameters
    this.availableFilters.forEach(filter => {
      filter.initializeFromParams({
        sort: m.route.param('sort'),
        q: m.route.param('q')
      }).then(resources => {
        this.appliedFilters.push(...resources);
        m.redraw();
      });
    });
  }
  view() {
    const suggestions = this.allSuggestions();
    const loading = this.availableFilters.some(filter => filter.loading);
    return m("div", {
      className: "Form-group Usersearchbox"
    }, m("label", {
      className: `UserDirectorySearchInput FormControl ${this.focused ? 'focus' : ''}`
    }, m("span", {
      className: "UserDirectorySearchInput-selected"
    }, this.appliedFilters.map((recipient, index) => m("span", {
      className: "UserDirectorySearchInput-filter",
      onclick: () => {
        this.appliedFilters.splice(index, 1);
        this.applyFiltering();
      },
      title: this.searchResultKind(recipient)
    }, this.recipientLabel(recipient)))), m("input", {
      className: "FormControl",
      placeholder: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-user-directory.forum.search.field.placeholder'),
      value: this.filter,
      oninput: flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_3___default()('value', value => {
        this.filter = value;
        this.performNewSearch();
      }),
      onkeydown: this.navigator.navigate.bind(this.navigator),
      onfocus: () => {
        this.focused = true;
      },
      onblur: () => {
        this.focused = false;
      }
    }), loading && m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2___default()), null), !!suggestions.length && m("ul", {
      className: "Dropdown-menu"
    }, suggestions.map((result, index) => m("li", {
      className: this.searchIndex === index ? 'active' : '',
      onclick: () => {
        this.selectResult(result);
        this.applyFiltering();
      }
    }, m("button", {
      type: "button"
    }, m("span", {
      className: "UserDirectorySearchKind"
    }, this.searchResultKind(result)), this.recipientLabel(result)))))));
  }
  filterTypes() {
    const items = new (flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_5___default())();
    items.add('text', new _searchTypes_TextFilter__WEBPACK_IMPORTED_MODULE_6__["default"](), 10);
    items.add('group', new _searchTypes_GroupFilter__WEBPACK_IMPORTED_MODULE_7__["default"](), 20);
    return items;
  }
  filterForResource(resource) {
    return this.availableFilters.find(f => f.resourceType() === resource.data.type);
  }
  recipientLabel(resource) {
    const filter = this.filterForResource(resource);
    if (filter) {
      return filter.renderLabel(resource);
    }
    return '[unknown]';
  }
  searchResultKind(resource) {
    const filter = this.filterForResource(resource);
    if (filter) {
      return filter.renderKind(resource);
    }
    return '[unknown]';
  }
  selectResult(result) {
    if (!result) {
      return;
    }
    this.appliedFilters.push(result);
    this.clearSuggestions();
  }
  clearSuggestions() {
    this.filter = '';
    this.availableFilters.forEach(filter => {
      filter.search('');
    });
  }
  allSuggestions() {
    return [].concat(...this.availableFilters.map(filter => filter.suggestions));
  }
  performNewSearch() {
    this.searchIndex = 0;
    this.availableFilters.forEach(filter => {
      filter.search(this.filter);
    });
    this.attrs.state.refreshParams({
      ...this.attrs.state.getParams(),
      qBuilder: this.qBuilder()
    });
  }
  qBuilder(params) {
    if (params === void 0) {
      params = {};
    }
    this.appliedFilters.forEach(resource => {
      const filter = this.filterForResource(resource);
      if (filter) {
        filter.applyFilter(params, resource);
      } else {
        console.warn('Cannot find filter class for resource', resource);
      }
    });
    return {
      filter: `${this.filter} ${params.q || ''}`
    };
  }
  applyFiltering() {
    const params = {
      sort: m.route.param('sort')
    };
    this.qBuilder(params);
    m.route.set(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().route('fof_user_directory', params));
  }
}
flarum.reg.add('fof-user-directory', 'forum/components/SearchField', SearchField);

/***/ }),

/***/ "./src/forum/components/SmallUserCard.js":
/*!***********************************************!*\
  !*** ./src/forum/components/SmallUserCard.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SmallUserCard)
/* harmony export */ });
/* harmony import */ var flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/components/UserCard */ "flarum/forum/components/UserCard");
/* harmony import */ var flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/utils/ItemList */ "flarum/common/utils/ItemList");
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_utils_humanTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/utils/humanTime */ "flarum/common/utils/humanTime");
/* harmony import */ var flarum_common_utils_humanTime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_humanTime__WEBPACK_IMPORTED_MODULE_2__);



class SmallUserCard extends (flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_0___default()) {
  //Overriding infoItems so that other extensions can separately add items to small cards
  infoItems() {
    const items = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_1___default())();
    const user = this.attrs.user;
    items.add('joined', app.translator.trans('core.forum.user.joined_date_text', {
      ago: flarum_common_utils_humanTime__WEBPACK_IMPORTED_MODULE_2___default()(user.joinTime())
    }));
    return items;
  }
}
flarum.reg.add('fof-user-directory', 'forum/components/SmallUserCard', SmallUserCard);

/***/ }),

/***/ "./src/forum/components/UserDirectoryHero.tsx":
/*!****************************************************!*\
  !*** ./src/forum/components/UserDirectoryHero.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserDirectoryHero)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Icon */ "flarum/common/components/Icon");
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_helpers_textContrastClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/helpers/textContrastClass */ "flarum/common/helpers/textContrastClass");
/* harmony import */ var flarum_common_helpers_textContrastClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_textContrastClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/utils/classList */ "flarum/common/utils/classList");
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/utils/ItemList */ "flarum/common/utils/ItemList");
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_5__);






class UserDirectoryHero extends (flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default()) {
  view() {
    const color = this.heroColor();
    return m("header", {
      className: flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_4___default()('Hero', 'UserDirectoryHero', {
        'UserDirectoryHero--colored': color,
        [flarum_common_helpers_textContrastClass__WEBPACK_IMPORTED_MODULE_3___default()(color)]: color
      }),
      style: color ? {
        '--hero-bg': color
      } : undefined
    }, m("div", {
      className: "container"
    }, this.viewItems().toArray()));
  }
  viewItems() {
    const items = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_5___default())();
    items.add('content', m("div", {
      className: "containerNarrow"
    }, this.contentItems().toArray()), 80);
    return items;
  }
  contentItems() {
    const items = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_5___default())();
    items.add('user-directory-title', m("h1", {
      className: "Hero-title"
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_2___default()), {
      name: this.heroIcon()
    }), " ", flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-user-directory.forum.hero.title')), 100);
    return items;
  }
  heroColor() {
    // Example return a color string to display a colored hero
    //return app.forum.attribute<string>('themeSecondaryColor');
    return null;
  }
  heroIcon() {
    return 'far fa-address-book';
  }
}
flarum.reg.add('fof-user-directory', 'forum/components/UserDirectoryHero', UserDirectoryHero);

/***/ }),

/***/ "./src/forum/components/UserDirectoryList.js":
/*!***************************************************!*\
  !*** ./src/forum/components/UserDirectoryList.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserDirectoryList)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Placeholder */ "flarum/common/components/Placeholder");
/* harmony import */ var flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _UserDirectoryListItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UserDirectoryListItem */ "./src/forum/components/UserDirectoryListItem.js");







/**
 * Based on Flarum's DiscussionList
 */
class UserDirectoryList extends (flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default()) {
  view() {
    const {
      state
    } = this.attrs;
    const params = state.getParams();
    const useSmallCards = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('userDirectorySmallCards');
    let loading;
    if (state.isLoading()) {
      loading = flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default().component();
    } else if (state.moreResults) {
      loading = flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
        className: 'Button',
        onclick: state.loadMore.bind(state)
      }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-user-directory.forum.page.load_more_button'));
    }
    if (state.empty()) {
      const text = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-user-directory.forum.page.empty_text');
      return m("div", {
        className: "DiscussionList"
      }, flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_4___default().component({
        text
      }));
    }
    return m("div", {
      className: 'UserDirectoryList' + (state.isSearchResults() ? ' UserDirectoryList--searchResults' : '') + (useSmallCards ? ' UserDirectoryList--small-cards' : '')
    }, m("ul", {
      className: "UserDirectoryList-users"
    }, state.users.map(user => {
      return m("li", {
        key: user.id(),
        "data-id": user.id()
      }, _UserDirectoryListItem__WEBPACK_IMPORTED_MODULE_5__["default"].component({
        user,
        params,
        useSmallCards
      }));
    })), m("div", {
      className: "UserDirectoryList-loadMore"
    }, loading));
  }
}
flarum.reg.add('fof-user-directory', 'forum/components/UserDirectoryList', UserDirectoryList);

/***/ }),

/***/ "./src/forum/components/UserDirectoryListItem.js":
/*!*******************************************************!*\
  !*** ./src/forum/components/UserDirectoryListItem.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserDirectoryListItem)
/* harmony export */ });
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/components/UserCard */ "flarum/forum/components/UserCard");
/* harmony import */ var flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _SmallUserCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SmallUserCard */ "./src/forum/components/SmallUserCard.js");
/* harmony import */ var _UserDirectoryUserCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UserDirectoryUserCard */ "./src/forum/components/UserDirectoryUserCard.js");




class UserDirectoryListItem extends (flarum_common_Component__WEBPACK_IMPORTED_MODULE_0___default()) {
  view(vnode) {
    const {
      user,
      useSmallCards
    } = this.attrs;
    const attributes = {
      user,
      className: `UserCard--directory${useSmallCards ? ' UserCard--small' : ''}`,
      controlsButtonClassName: 'Button Button--icon Button--flat'
    };
    return m("div", {
      className: "User"
    }, useSmallCards ? _SmallUserCard__WEBPACK_IMPORTED_MODULE_2__["default"].component(attributes) : _UserDirectoryUserCard__WEBPACK_IMPORTED_MODULE_3__["default"].component(attributes));
  }
}
flarum.reg.add('fof-user-directory', 'forum/components/UserDirectoryListItem', UserDirectoryListItem);

/***/ }),

/***/ "./src/forum/components/UserDirectoryPage.js":
/*!***************************************************!*\
  !*** ./src/forum/components/UserDirectoryPage.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserDirectoryPage)
/* harmony export */ });
/* harmony import */ var flarum_forum_components_IndexSidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/components/IndexSidebar */ "flarum/forum/components/IndexSidebar");
/* harmony import */ var flarum_forum_components_IndexSidebar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_IndexSidebar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_forum_components_PageStructure__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/components/PageStructure */ "flarum/forum/components/PageStructure");
/* harmony import */ var flarum_forum_components_PageStructure__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_PageStructure__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Page */ "flarum/common/components/Page");
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/utils/ItemList */ "flarum/common/utils/ItemList");
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/helpers/listItems */ "flarum/common/helpers/listItems");
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/forum/components/IndexPage */ "flarum/forum/components/IndexPage");
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/common/components/LinkButton */ "flarum/common/components/LinkButton");
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var flarum_common_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/common/components/SelectDropdown */ "flarum/common/components/SelectDropdown");
/* harmony import */ var flarum_common_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! flarum/common/components/Dropdown */ "flarum/common/components/Dropdown");
/* harmony import */ var flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! flarum/common/utils/extractText */ "flarum/common/utils/extractText");
/* harmony import */ var flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _UserDirectoryList__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./UserDirectoryList */ "./src/forum/components/UserDirectoryList.js");
/* harmony import */ var _states_UserDirectoryState__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../states/UserDirectoryState */ "./src/forum/states/UserDirectoryState.js");
/* harmony import */ var _CheckableButton__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./CheckableButton */ "./src/forum/components/CheckableButton.js");
/* harmony import */ var _SearchField__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./SearchField */ "./src/forum/components/SearchField.js");
/* harmony import */ var flarum_common_components_Separator__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! flarum/common/components/Separator */ "flarum/common/components/Separator");
/* harmony import */ var flarum_common_components_Separator__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Separator__WEBPACK_IMPORTED_MODULE_17__);



















/**
 * This page re-uses Flarum's IndexPage CSS classes
 */
class UserDirectoryPage extends (flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3___default()) {
  oninit(vnode) {
    super.oninit(vnode);
    this.state = new _states_UserDirectoryState__WEBPACK_IMPORTED_MODULE_14__["default"]({});
    this.state.refreshParams(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().search.state.params());
    this.bodyClass = 'User--directory';
    let idSegments = [];
    if (this.params().q) {
      Array.from(this.params().q.matchAll(/group:([\d,]+)/g)).forEach(match => {
        idSegments.push(match[1]);
      });
    }
    this.enabledGroupFilters = idSegments.join(',').split(',').filter(id => id);
    this.enabledSpecialGroupFilters = [];
    if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().initializers.has('flarum-suspend') && flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute('hasSuspendPermission')) {
      // If there is a special group filter int the params, enable it here
      if (this.params()?.q?.includes('is:suspended')) {
        this.enabledSpecialGroupFilters['flarum-suspend'] = 'is:suspended';
      }
    }
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().history.push('users', flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('fof-user-directory.forum.header.back_to_user_directory_tooltip'));
  }
  oncreate(vnode) {
    super.oncreate(vnode);
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().setTitle(flarum_common_utils_extractText__WEBPACK_IMPORTED_MODULE_12___default()(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('fof-user-directory.forum.page.nav')));
  }
  view() {
    return m((flarum_forum_components_PageStructure__WEBPACK_IMPORTED_MODULE_1___default()), {
      className: "UserDirectoryPage",
      hero: () => flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_6___default().prototype.hero(),
      sidebar: () => m((flarum_forum_components_IndexSidebar__WEBPACK_IMPORTED_MODULE_0___default()), null)
    }, m("div", {
      className: "UserDirectoryPage-toolbar"
    }, m("ul", {
      className: "IndexPage-toolbar-view"
    }, flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_5___default()(this.viewItems().toArray())), m("ul", {
      className: "IndexPage-toolbar-action"
    }, flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_5___default()(this.actionItems().toArray()))), m(_UserDirectoryList__WEBPACK_IMPORTED_MODULE_13__["default"], {
      state: this.state
    }));
  }

  /**
   * Our own sidebar. Re-uses Index.sidebarItems as the base
   * Elements added here will only show up on the user directory page
   *
   * @return {ItemList}
   */
  sidebarItems() {
    const items = flarum_forum_components_IndexSidebar__WEBPACK_IMPORTED_MODULE_0___default().prototype.items();
    items.setContent('nav', flarum_common_components_SelectDropdown__WEBPACK_IMPORTED_MODULE_10___default().component({
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
  navItems() {
    const items = flarum_forum_components_IndexSidebar__WEBPACK_IMPORTED_MODULE_0___default().prototype.navItems();
    const params = this.stickyParams();
    items.add('fof-user-directory', flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_9___default().component({
      href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().route('fof_user_directory', params),
      icon: 'far fa-address-book'
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('fof-user-directory.forum.page.nav')), 85);
    return items;
  }
  viewItems() {
    const items = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_4___default())();
    const sortMap = this.state.sortMap();
    const sortOptions = {};
    for (const i in sortMap) {
      sortOptions[i] = flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('fof-user-directory.lib.sort.' + i);
    }
    items.add('sort', flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_7___default().component({
      options: sortOptions,
      value: this.state.getParams().sort || flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute('userDirectoryDefaultSort'),
      onchange: this.changeParams.bind(this)
    }), 100);
    items.add('filterGroups', flarum_common_components_Dropdown__WEBPACK_IMPORTED_MODULE_11___default().component({
      caretIcon: 'fas fa-filter',
      label: flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('fof-user-directory.forum.page.filter_button'),
      buttonClassName: 'FormControl',
      className: 'GroupFilterDropdown'
    }, this.groupItems().toArray()), 80);
    items.add('search', _SearchField__WEBPACK_IMPORTED_MODULE_16__["default"].component({
      state: this.state
    }), 60);
    return items;
  }
  groupItems() {
    const items = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_4___default())();
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().store.all('groups').filter(group => group.id() !== '2' && group.id() !== '3').forEach(group => {
      items.add(group.namePlural(), _CheckableButton__WEBPACK_IMPORTED_MODULE_15__["default"].component({
        className: 'GroupFilterButton',
        icon: group.icon(),
        checked: this.enabledGroupFilters.includes(group.id()),
        onclick: () => {
          const id = group.id();
          if (this.enabledGroupFilters.includes(id)) {
            this.enabledGroupFilters = this.enabledGroupFilters.filter(e => e != id);
          } else {
            this.enabledGroupFilters.push(id);
            // Empty the special group filters
            this.enabledSpecialGroupFilters = [];
          }
          this.changeParams(this.params().sort);
        }
      }, group.namePlural()));
    });
    if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().initializers.has('flarum-suspend') && flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute('hasSuspendPermission')) {
      items.add('suspend', _CheckableButton__WEBPACK_IMPORTED_MODULE_15__["default"].component({
        className: 'GroupFilterButton',
        icon: 'fas fa-ban',
        checked: this.enabledSpecialGroupFilters['flarum-suspend'] === 'is:suspended',
        onclick: () => {
          const id = 'flarum-suspend';
          if (this.enabledSpecialGroupFilters[id] === 'is:suspended') {
            this.enabledSpecialGroupFilters[id] = '';
          } else {
            this.enabledSpecialGroupFilters[id] = 'is:suspended';
            // Empty the group filters
            this.enabledGroupFilters = [];
          }
          this.changeParams(this.params().sort);
        }
      }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('flarum-suspend.forum.user_badge.suspended_tooltip')), 90);
      items.add('seperator', flarum_common_components_Separator__WEBPACK_IMPORTED_MODULE_17___default().component(), 50);
    }
    return items;
  }
  actionItems() {
    const items = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_4___default())();
    items.add('refresh', flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_8___default().component({
      title: flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('fof-user-directory.forum.page.refresh_tooltip'),
      icon: 'fas fa-sync',
      className: 'Button Button--icon',
      onclick: () => {
        this.state.refresh();
        if ((flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().session).user) {
          flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().store.find('users', flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().session.user.id());
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
  changeParams(sort) {
    const params = this.params();
    if (sort === flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute('userDirectoryDefaultSort')) {
      delete params.sort;
    } else {
      params.sort = sort;
    }
    let moreQ = '';
    for (const filter in this.enabledSpecialGroupFilters) {
      moreQ += this.enabledSpecialGroupFilters[filter] + ' ';
    }
    if (this.enabledGroupFilters.length > 0) {
      const groupsQ = this.enabledGroupFilters.reduce((prev, curr) => {
        return `${prev}${prev ? ' ' : ''}group:${curr}`;
      }, '');
      params.qBuilder = {
        groups: groupsQ
      };
    } else {
      params.qBuilder = {
        groups: '',
        q: moreQ.trim()
      };
    }
    this.state.refreshParams(params);
    const routeParams = {
      ...params
    };
    delete routeParams.qBuilder;
    m.route.set(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().route('fof_user_directory', routeParams));
  }
  stickyParams() {
    return {
      sort: m.route.param('sort'),
      q: m.route.param('q')
    };
  }
  params() {
    return this.stickyParams();
  }
}
flarum.reg.add('fof-user-directory', 'forum/components/UserDirectoryPage', UserDirectoryPage);

/***/ }),

/***/ "./src/forum/components/UserDirectoryUserCard.js":
/*!*******************************************************!*\
  !*** ./src/forum/components/UserDirectoryUserCard.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserDirectoryUserCard)
/* harmony export */ });
/* harmony import */ var flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/components/UserCard */ "flarum/forum/components/UserCard");
/* harmony import */ var flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/utils/ItemList */ "flarum/common/utils/ItemList");
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_utils_humanTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/utils/humanTime */ "flarum/common/utils/humanTime");
/* harmony import */ var flarum_common_utils_humanTime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_humanTime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Icon */ "flarum/common/components/Icon");
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_4__);





class UserDirectoryUserCard extends (flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_0___default()) {
  /**
   * Allowing to add additonal items unique to the user directory.
   *
   * @return {ItemList<import('mithril').Children>}
   */
  infoItems() {
    const items = super.infoItems();
    const user = this.attrs.user;
    if (items.has('lastSeen')) items.setPriority('lastSeen', 100);
    if (items.has('joined')) items.setPriority('joined', 95);
    if (items.has('points')) items.setPriority('points', 60);
    if (items.has('best-answer-count')) items.setPriority('best-answer-count', 68);
    if (items.has('masquerade-bio')) items.setPriority('masquerade-bio', 50);
    items.add('discussion-count', m("div", {
      className: "userStat"
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3___default()), {
      name: "fas fa-comment"
    }), flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('fof-user-directory.forum.page.usercard.discussion-count', {
      count: user.discussionCount()
    })), 70);
    items.add('comment-count', m("div", {
      className: "userStat"
    }, m((flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_3___default()), {
      name: "fas fa-comments"
    }), flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('fof-user-directory.forum.page.usercard.post-count', {
      count: user.commentCount()
    })), 69);
    return items;
  }
}
flarum.reg.add('fof-user-directory', 'forum/components/UserDirectoryUserCard', UserDirectoryUserCard);

/***/ }),

/***/ "./src/forum/components/index.ts":
/*!***************************************!*\
  !*** ./src/forum/components/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   components: () => (/* binding */ components)
/* harmony export */ });
/* harmony import */ var _CheckableButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckableButton */ "./src/forum/components/CheckableButton.js");
/* harmony import */ var _SearchField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchField */ "./src/forum/components/SearchField.js");
/* harmony import */ var _SmallUserCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SmallUserCard */ "./src/forum/components/SmallUserCard.js");
/* harmony import */ var _UserDirectoryList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UserDirectoryList */ "./src/forum/components/UserDirectoryList.js");
/* harmony import */ var _UserDirectoryListItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UserDirectoryListItem */ "./src/forum/components/UserDirectoryListItem.js");
/* harmony import */ var _UserDirectoryPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UserDirectoryPage */ "./src/forum/components/UserDirectoryPage.js");
/* harmony import */ var _UserDirectoryUserCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UserDirectoryUserCard */ "./src/forum/components/UserDirectoryUserCard.js");







const components = {
  CheckableButton: _CheckableButton__WEBPACK_IMPORTED_MODULE_0__["default"],
  SearchField: _SearchField__WEBPACK_IMPORTED_MODULE_1__["default"],
  SmallUserCard: _SmallUserCard__WEBPACK_IMPORTED_MODULE_2__["default"],
  UserDirectoryList: _UserDirectoryList__WEBPACK_IMPORTED_MODULE_3__["default"],
  UserDirectoryListItem: _UserDirectoryListItem__WEBPACK_IMPORTED_MODULE_4__["default"],
  UserDirectoryPage: _UserDirectoryPage__WEBPACK_IMPORTED_MODULE_5__["default"],
  UserDirectoryUserCard: _UserDirectoryUserCard__WEBPACK_IMPORTED_MODULE_6__["default"]
};
flarum.reg.add('fof-user-directory', 'forum/components', null);

/***/ }),

/***/ "./src/forum/extend.ts":
/*!*****************************!*\
  !*** ./src/forum/extend.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extenders */ "flarum/common/extenders");
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_UserDirectoryPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/UserDirectoryPage */ "./src/forum/components/UserDirectoryPage.js");
/* harmony import */ var _models_Text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/Text */ "./src/forum/models/Text.ts");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Routes)() //
.add('fof_user_directory', '/users', _components_UserDirectoryPage__WEBPACK_IMPORTED_MODULE_1__["default"]), new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Store)() //
.add('fof-user-directory-text', _models_Text__WEBPACK_IMPORTED_MODULE_2__["default"])]);

/***/ }),

/***/ "./src/forum/extenders/extendCommentPost.tsx":
/*!***************************************************!*\
  !*** ./src/forum/extenders/extendCommentPost.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ extendCommentPost),
/* harmony export */   linkGroupMentions: () => (/* binding */ linkGroupMentions)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/CommentPost */ "flarum/forum/components/CommentPost");
/* harmony import */ var flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_2__);



const linkGroupMentions = function () {
  if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('canSeeUserDirectoryLink') && flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('userDirectoryLinkGroupMentions')) {
    // @ts-ignore
    this.$('.GroupMention').each(function () {
      // @ts-ignore
      if ($(this).hasClass('GroupMention--linked')) return;

      // @ts-ignore
      const name = $(this).find('.GroupMention-name').text();
      const group = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().store.getBy('groups', 'namePlural', name.slice(1));
      if (group) {
        const link = $(`<a class="GroupMention-link" href="${flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().route('fof_user_directory', {
          q: `group:${group.id()}`
        })}"></a>`);
        link.on('click', function (e) {
          // @ts-ignore
          m.route.set(this.getAttribute('href'));
          e.preventDefault();
        });

        // @ts-ignore
        $(this).addClass('GroupMention--linked').wrap(link);
      }
    });
  }
};
function extendCommentPost() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'oncreate', linkGroupMentions);
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'onupdate', linkGroupMentions);
}
flarum.reg.add('fof-user-directory', 'forum/extenders/extendCommentPost', extendCommentPost);

/***/ }),

/***/ "./src/forum/extenders/extendIndexPage.tsx":
/*!*************************************************!*\
  !*** ./src/forum/extenders/extendIndexPage.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ extendIndexPage)
/* harmony export */ });
/* harmony import */ var flarum_forum_components_IndexSidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/components/IndexSidebar */ "flarum/forum/components/IndexSidebar");
/* harmony import */ var flarum_forum_components_IndexSidebar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_IndexSidebar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/components/IndexPage */ "flarum/forum/components/IndexPage");
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/LinkButton */ "flarum/common/components/LinkButton");
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_UserDirectoryHero__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/UserDirectoryHero */ "./src/forum/components/UserDirectoryHero.tsx");






function extendIndexPage() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.extend)((flarum_forum_components_IndexSidebar__WEBPACK_IMPORTED_MODULE_0___default().prototype), 'navItems', items => {
    if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().forum.attribute('canSeeUserDirectoryLink') && flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().forum.attribute('canSearchUsers')) {
      items.add('fof-user-directory', m((flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_4___default()), {
        href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().route('fof_user_directory'),
        icon: "far fa-address-book"
      }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-user-directory.forum.page.nav')), 85);
    }
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.override)((flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3___default().prototype), 'hero', function (original) {
    if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().current.get('routeName') === 'fof_user_directory') {
      return m(_components_UserDirectoryHero__WEBPACK_IMPORTED_MODULE_5__["default"], null);
    }
    return original();
  });
}
flarum.reg.add('fof-user-directory', 'forum/extenders/extendIndexPage', extendIndexPage);

/***/ }),

/***/ "./src/forum/extenders/extendUsersSearchSource.tsx":
/*!*********************************************************!*\
  !*** ./src/forum/extenders/extendUsersSearchSource.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ extendUsersSearchSource)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_UsersSearchSource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/UsersSearchSource */ "flarum/forum/components/UsersSearchSource");
/* harmony import */ var flarum_forum_components_UsersSearchSource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_UsersSearchSource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/LinkButton */ "flarum/common/components/LinkButton");
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3__);




function extendUsersSearchSource() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_UsersSearchSource__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'view', function (view, query) {
    if (!view || !flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('canSeeUserDirectoryLink') || flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('userDirectoryDisableGlobalSearchSource')) {
      return;
    }
    query = query.toLowerCase();
    view.splice(1, 0, m("li", null, m((flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_3___default()), {
      className: "Button Button--link",
      href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().route('fof_user_directory', {
        q: query
      }),
      icon: "fas fa-search"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-user-directory.forum.search.users_heading', {
      query
    }))));
  });
}
flarum.reg.add('fof-user-directory', 'forum/extenders/extendUsersSearchSource', extendUsersSearchSource);

/***/ }),

/***/ "./src/forum/index.ts":
/*!****************************!*\
  !*** ./src/forum/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckableButton: () => (/* reexport safe */ _components_CheckableButton__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   SortMap: () => (/* reexport safe */ _common_utils_SortMap__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   UserDirectoryList: () => (/* reexport safe */ _components_UserDirectoryList__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   UserDirectoryListItem: () => (/* reexport safe */ _components_UserDirectoryListItem__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   UserDirectoryPage: () => (/* reexport safe */ _components_UserDirectoryPage__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   UserDirectoryState: () => (/* reexport safe */ _states_UserDirectoryState__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   components: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_11__.components),
/* harmony export */   extend: () => (/* reexport safe */ _extend__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   searchTypes: () => (/* reexport safe */ _searchTypes__WEBPACK_IMPORTED_MODULE_12__.searchTypes)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_UserDirectoryPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/UserDirectoryPage */ "./src/forum/components/UserDirectoryPage.js");
/* harmony import */ var _components_UserDirectoryList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/UserDirectoryList */ "./src/forum/components/UserDirectoryList.js");
/* harmony import */ var _components_UserDirectoryListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/UserDirectoryListItem */ "./src/forum/components/UserDirectoryListItem.js");
/* harmony import */ var _states_UserDirectoryState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./states/UserDirectoryState */ "./src/forum/states/UserDirectoryState.js");
/* harmony import */ var _common_utils_SortMap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/utils/SortMap */ "./src/common/utils/SortMap.js");
/* harmony import */ var _components_CheckableButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/CheckableButton */ "./src/forum/components/CheckableButton.js");
/* harmony import */ var _extenders_extendCommentPost__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./extenders/extendCommentPost */ "./src/forum/extenders/extendCommentPost.tsx");
/* harmony import */ var _extenders_extendUsersSearchSource__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./extenders/extendUsersSearchSource */ "./src/forum/extenders/extendUsersSearchSource.tsx");
/* harmony import */ var _extenders_extendIndexPage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./extenders/extendIndexPage */ "./src/forum/extenders/extendIndexPage.tsx");
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./extend */ "./src/forum/extend.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components */ "./src/forum/components/index.ts");
/* harmony import */ var _searchTypes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./searchTypes */ "./src/forum/searchTypes/index.js");












// Allow other extensions to extend the page.
// Removing this and using the usual export ./components will break integrations using these, so they must stay for now.
// TODO: Remove in Flarum 2.0

flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('fof-user-directory', function () {
  (0,_extenders_extendCommentPost__WEBPACK_IMPORTED_MODULE_7__["default"])();
  (0,_extenders_extendUsersSearchSource__WEBPACK_IMPORTED_MODULE_8__["default"])();
  (0,_extenders_extendIndexPage__WEBPACK_IMPORTED_MODULE_9__["default"])();
});



/***/ }),

/***/ "./src/forum/models/Text.ts":
/*!**********************************!*\
  !*** ./src/forum/models/Text.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Text)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Special model used only client-side to hold a free text search value in the search field
 */
class Text extends (flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()) {
  constructor() {
    super(...arguments);
    (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "text", flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('text'));
  }
}
flarum.reg.add('fof-user-directory', 'forum/models/Text', Text);

/***/ }),

/***/ "./src/forum/searchTypes/AbstractType.js":
/*!***********************************************!*\
  !*** ./src/forum/searchTypes/AbstractType.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractType)
/* harmony export */ });
/**
 * @abstract
 */
class AbstractType {
  constructor() {
    this.suggestions = [];
    this.loading = false;
  }

  /**
   * The `type` property of the Models used in suggestions and applied filters for this type
   * @return {String}
   */
  resourceType() {
    //
  }

  /**
   * Executed when the search query changes
   * The method should update this.suggestions with the new results
   * If asynchronous loading is used, this.loading should be set to true during the process
   * @param {String} query
   */
  search(query) {
    //
  }

  /**
   * Renders the "kind" label next to the value indicating what kind of information that result is
   * Should probably just be a translated text
   * @param {Model} resource
   * @return {vnode}
   */
  renderKind(resource) {
    //
  }

  /**
   * Renders the Label containing the suggestion's value
   * Should be a vdom template using the .UserDirectorySearchLabel class or similar
   * @param {Model} resource
   * @return {vnode}
   */
  renderLabel(resource) {
    //
  }

  /**
   * Applies a filter on a params object to use in the page request
   * @param {Object} params Object. Might or might not contain a `q` property or `sort` property. In the future, `filters` object might be supported
   * @param {Model} resource
   */
  applyFilter(params, resource) {
    //
  }

  /**
   * Used to populate the search field on page load with values from the querystring
   * A promise must be returned, and the UI will auto-update once the promise returns
   * @param {Object} params Object with a `q` and `sort` property. `filters` might be supported in the future
   * @return {Promise<Model[]>}
   */
  initializeFromParams(params) {
    //
  }
}
flarum.reg.add('fof-user-directory', 'forum/searchTypes/AbstractType', AbstractType);

/***/ }),

/***/ "./src/forum/searchTypes/GroupFilter.js":
/*!**********************************************!*\
  !*** ./src/forum/searchTypes/GroupFilter.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GroupFilter)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_models_Group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/models/Group */ "flarum/common/models/Group");
/* harmony import */ var flarum_common_models_Group__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_models_Group__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Icon */ "flarum/common/components/Icon");
/* harmony import */ var flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _AbstractType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AbstractType */ "./src/forum/searchTypes/AbstractType.js");





/* global m */

class GroupFilter extends _AbstractType__WEBPACK_IMPORTED_MODULE_3__["default"] {
  resourceType() {
    return 'groups';
  }
  search(query) {
    this.suggestions = [];
    if (!query) {
      return;
    }
    query = query.toLowerCase();
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().store.all('groups').forEach(group => {
      // Do not allow Guest group as it wouldn't do anything
      if (group.id() === (flarum_common_models_Group__WEBPACK_IMPORTED_MODULE_1___default().GUEST_ID)) {
        return;
      }
      if (group.nameSingular().toLowerCase().indexOf(query) !== -1 || group.namePlural().toLowerCase().indexOf(query) !== -1) {
        this.suggestions.push(group);
      }
    });
  }
  renderKind() {
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-user-directory.forum.search.kinds.group');
  }
  renderLabel(group) {
    return m('.UserDirectorySearchLabel', group.color() ? {
      className: 'colored',
      style: {
        backgroundColor: group.color()
      }
    } : {}, [group.icon() ? [flarum_common_components_Icon__WEBPACK_IMPORTED_MODULE_2___default().component({
      name: group.icon()
    }), ' '] : null, group.namePlural()]);
  }
  applyFilter(params, group) {
    params.q = params.q ? params.q + ' ' : '';
    params.q += 'group:' + group.id();
  }
  initializeFromParams(params) {
    if (!params.q) {
      return Promise.resolve([]);
    }
    const qWithSpacesAround = ' ' + params.q + ' ';
    const groups = [];
    const queryGroups = qWithSpacesAround.split(' ').filter(q => q.startsWith('group:'));
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().store.all('groups').forEach(group => {
      queryGroups.forEach(queryGroup => {
        const groupIds = queryGroup.replace('group:', '').split(',');
        if (groupIds.includes(group.id())) {
          groups.push(group);
        }
      });
    });
    return Promise.resolve(groups);
  }
}
flarum.reg.add('fof-user-directory', 'forum/searchTypes/GroupFilter', GroupFilter);

/***/ }),

/***/ "./src/forum/searchTypes/TextFilter.js":
/*!*********************************************!*\
  !*** ./src/forum/searchTypes/TextFilter.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextFilter)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractType */ "./src/forum/searchTypes/AbstractType.js");



/* global m */

class TextFilter extends _AbstractType__WEBPACK_IMPORTED_MODULE_1__["default"] {
  resourceType() {
    return 'fof-user-directory-text';
  }
  search(query) {
    if (!query) {
      this.suggestions = [];
      return;
    }
    this.suggestions = [flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().store.createRecord('fof-user-directory-text', {
      attributes: {
        text: query
      }
    })];
  }
  renderKind() {
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('fof-user-directory.forum.search.kinds.text');
  }
  renderLabel(resource) {
    return m('.UserDirectorySearchLabel', resource.text());
  }
  applyFilter(params, resource) {
    params.q = params.q ? params.q + ' ' : '';
    params.q += resource.text();
  }
  initializeFromParams(params) {
    if (!params.q) {
      return Promise.resolve([]);
    }
    return Promise.resolve(params.q.split(' ')
    // Words with : are gambits and we will ignore them
    .filter(word => word.indexOf(':') === -1).map(word => flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().store.createRecord('fof-user-directory-text', {
      attributes: {
        text: word
      }
    })));
  }
}
flarum.reg.add('fof-user-directory', 'forum/searchTypes/TextFilter', TextFilter);

/***/ }),

/***/ "./src/forum/searchTypes/index.js":
/*!****************************************!*\
  !*** ./src/forum/searchTypes/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   searchTypes: () => (/* binding */ searchTypes)
/* harmony export */ });
/* harmony import */ var _AbstractType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractType */ "./src/forum/searchTypes/AbstractType.js");
/* harmony import */ var _GroupFilter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GroupFilter */ "./src/forum/searchTypes/GroupFilter.js");
/* harmony import */ var _TextFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TextFilter */ "./src/forum/searchTypes/TextFilter.js");



const searchTypes = {
  AbstractType: _AbstractType__WEBPACK_IMPORTED_MODULE_0__["default"],
  GroupFilter: _GroupFilter__WEBPACK_IMPORTED_MODULE_1__["default"],
  TextFilter: _TextFilter__WEBPACK_IMPORTED_MODULE_2__["default"]
};
flarum.reg.add('fof-user-directory', 'forum/searchTypes', null);

/***/ }),

/***/ "./src/forum/states/UserDirectoryState.js":
/*!************************************************!*\
  !*** ./src/forum/states/UserDirectoryState.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserDirectoryState)
/* harmony export */ });
/* harmony import */ var _common_utils_SortMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/utils/SortMap */ "./src/common/utils/SortMap.js");
/**
 * Based on Flarum's DiscussionListState
 */

class UserDirectoryState {
  constructor(params, app) {
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
  requestParams() {
    const params = {
      include: [],
      filter: {}
    };
    const sortKey = this.params.sort || app.forum.attribute('userDirectoryDefaultSort');

    // sort might be set to null if no sort params has been passed
    params.sort = this.sortMap()[sortKey];
    if (this.params.q) {
      params.filter.q = this.params.q;
    }
    return params;
  }
  sortMap() {
    return {
      default: '',
      ...new _common_utils_SortMap__WEBPACK_IMPORTED_MODULE_0__["default"]().sortMap()
    };
  }
  getParams() {
    return this.params;
  }
  clear() {
    this.users = [];
    m.redraw();
  }
  refreshParams(newParams) {
    if (!this.hasUsers() || Object.keys(newParams).some(key => this.getParams()[key] !== newParams[key])) {
      const q = '';
      this.params = newParams;
      if (newParams.qBuilder) {
        Object.assign(this.qBuilder, newParams.qBuilder || {});
        this.params.q = Object.values(this.qBuilder).join(' ').trim();
      }
      if (!this.params.q && q) {
        this.params.q = q;
      }
      this.refresh();
    }
  }
  refresh() {
    this.loading = true;
    this.clear();
    return this.loadResults().then(results => {
      this.users = [];
      this.parseResults(results);
    }, () => {
      this.loading = false;
      m.redraw();
    });
  }
  loadResults(offset) {
    const preloadedUsers = this.app.preloadedApiDocument();
    if (preloadedUsers) {
      return Promise.resolve(preloadedUsers);
    }
    const params = this.requestParams();
    params.page = {
      offset
    };
    params.include = params.include.join(',');
    return this.app.store.find('users', params);
  }
  loadMore() {
    this.loading = true;
    this.loadResults(this.users.length).then(this.parseResults.bind(this));
  }
  parseResults(results) {
    this.users.push(...results);
    this.loading = false;
    this.moreResults = !!results.payload.links && !!results.payload.links.next;
    m.redraw();
    return results;
  }
  hasUsers() {
    return this.users.length > 0;
  }
  isLoading() {
    return this.loading;
  }
  isSearchResults() {
    return !!this.params.q;
  }
  empty() {
    return !this.hasUsers() && !this.isLoading();
  }
}
flarum.reg.add('fof-user-directory', 'forum/states/UserDirectoryState', UserDirectoryState);

/***/ }),

/***/ "flarum/common/Component":
/*!*************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/Component')" ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/Component');

/***/ }),

/***/ "flarum/common/Model":
/*!*********************************************************!*\
  !*** external "flarum.reg.get('core', 'common/Model')" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/Model');

/***/ }),

/***/ "flarum/common/components/Button":
/*!*********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Button')" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Button');

/***/ }),

/***/ "flarum/common/components/Dropdown":
/*!***********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Dropdown')" ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Dropdown');

/***/ }),

/***/ "flarum/common/components/Icon":
/*!*******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Icon')" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Icon');

/***/ }),

/***/ "flarum/common/components/LinkButton":
/*!*************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/LinkButton')" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/LinkButton');

/***/ }),

/***/ "flarum/common/components/LoadingIndicator":
/*!*******************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/LoadingIndicator')" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/LoadingIndicator');

/***/ }),

/***/ "flarum/common/components/Page":
/*!*******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Page')" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Page');

/***/ }),

/***/ "flarum/common/components/Placeholder":
/*!**************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Placeholder')" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Placeholder');

/***/ }),

/***/ "flarum/common/components/Select":
/*!*********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Select')" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Select');

/***/ }),

/***/ "flarum/common/components/SelectDropdown":
/*!*****************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/SelectDropdown')" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/SelectDropdown');

/***/ }),

/***/ "flarum/common/components/Separator":
/*!************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/components/Separator')" ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/components/Separator');

/***/ }),

/***/ "flarum/common/extend":
/*!**********************************************************!*\
  !*** external "flarum.reg.get('core', 'common/extend')" ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/extend');

/***/ }),

/***/ "flarum/common/extenders":
/*!*************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/extenders')" ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/extenders');

/***/ }),

/***/ "flarum/common/helpers/listItems":
/*!*********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/helpers/listItems')" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/helpers/listItems');

/***/ }),

/***/ "flarum/common/helpers/textContrastClass":
/*!*****************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/helpers/textContrastClass')" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/helpers/textContrastClass');

/***/ }),

/***/ "flarum/common/models/Group":
/*!****************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/models/Group')" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/models/Group');

/***/ }),

/***/ "flarum/common/utils/ItemList":
/*!******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/ItemList')" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/ItemList');

/***/ }),

/***/ "flarum/common/utils/KeyboardNavigatable":
/*!*****************************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/KeyboardNavigatable')" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/KeyboardNavigatable');

/***/ }),

/***/ "flarum/common/utils/classList":
/*!*******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/classList')" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/classList');

/***/ }),

/***/ "flarum/common/utils/extractText":
/*!*********************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/extractText')" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/extractText');

/***/ }),

/***/ "flarum/common/utils/humanTime":
/*!*******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/humanTime')" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/humanTime');

/***/ }),

/***/ "flarum/common/utils/withAttr":
/*!******************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/utils/withAttr')" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/utils/withAttr');

/***/ }),

/***/ "flarum/forum/app":
/*!******************************************************!*\
  !*** external "flarum.reg.get('core', 'forum/app')" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'forum/app');

/***/ }),

/***/ "flarum/forum/components/CommentPost":
/*!*************************************************************************!*\
  !*** external "flarum.reg.get('core', 'forum/components/CommentPost')" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'forum/components/CommentPost');

/***/ }),

/***/ "flarum/forum/components/IndexPage":
/*!***********************************************************************!*\
  !*** external "flarum.reg.get('core', 'forum/components/IndexPage')" ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'forum/components/IndexPage');

/***/ }),

/***/ "flarum/forum/components/IndexSidebar":
/*!**************************************************************************!*\
  !*** external "flarum.reg.get('core', 'forum/components/IndexSidebar')" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'forum/components/IndexSidebar');

/***/ }),

/***/ "flarum/forum/components/PageStructure":
/*!***************************************************************************!*\
  !*** external "flarum.reg.get('core', 'forum/components/PageStructure')" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'forum/components/PageStructure');

/***/ }),

/***/ "flarum/forum/components/UserCard":
/*!**********************************************************************!*\
  !*** external "flarum.reg.get('core', 'forum/components/UserCard')" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'forum/components/UserCard');

/***/ }),

/***/ "flarum/forum/components/UsersSearchSource":
/*!*******************************************************************************!*\
  !*** external "flarum.reg.get('core', 'forum/components/UsersSearchSource')" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'forum/components/UsersSearchSource');

/***/ }),

/***/ "flarum/utils/ItemList":
/*!***********************************************************!*\
  !*** external "flarum.reg.get('core', 'utils/ItemList')" ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'utils/ItemList');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		flarum.reg._webpack_runtimes["fof-user-directory"] ||= __webpack_require__;// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckableButton: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_0__.CheckableButton),
/* harmony export */   SortMap: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_0__.SortMap),
/* harmony export */   UserDirectoryList: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_0__.UserDirectoryList),
/* harmony export */   UserDirectoryListItem: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_0__.UserDirectoryListItem),
/* harmony export */   UserDirectoryPage: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_0__.UserDirectoryPage),
/* harmony export */   UserDirectoryState: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_0__.UserDirectoryState),
/* harmony export */   components: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_0__.components),
/* harmony export */   extend: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_0__.extend),
/* harmony export */   searchTypes: () => (/* reexport safe */ _src_forum__WEBPACK_IMPORTED_MODULE_0__.searchTypes)
/* harmony export */ });
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.ts");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map