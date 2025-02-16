/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/extend.ts":
/*!*****************************!*\
  !*** ./src/admin/extend.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extenders */ "flarum/common/extenders");
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils_SortMap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/utils/SortMap */ "./src/common/utils/SortMap.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Admin)().setting(() => ({
  setting: 'fof-user-directory-link',
  label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-user-directory.admin.settings.link'),
  type: 'boolean'
})).setting(() => ({
  setting: 'fof-user-directory.use-small-cards',
  label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-user-directory.admin.settings.use-small-cards'),
  type: 'boolean'
})).setting(() => ({
  setting: 'fof-user-directory.disable-global-search-source',
  label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-user-directory.admin.settings.disable-global-search-source'),
  type: 'boolean'
})).setting(() => ({
  setting: 'fof-user-directory.link-group-mentions',
  label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-user-directory.admin.settings.link-group-mentions'),
  type: 'boolean'
})).setting(() => {
  const sortOptions = {
    '': flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-user-directory.lib.sort.not_specified')
  };
  Object.keys(new _common_utils_SortMap__WEBPACK_IMPORTED_MODULE_2__["default"]().sortMap()).forEach(sort => {
    sortOptions[sort] = flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-user-directory.lib.sort.' + sort);
  });
  return {
    setting: 'fof-user-directory.default-sort',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-user-directory.admin.settings.default-sort'),
    options: sortOptions,
    type: 'select',
    default: ''
  };
}).permission(() => ({
  icon: 'far fa-address-book',
  label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans('fof-user-directory.admin.permissions.view_user_directory'),
  permission: 'fof.user-directory.view',
  allowGuest: true
}), 'view')]);

/***/ }),

/***/ "./src/admin/index.ts":
/*!****************************!*\
  !*** ./src/admin/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SortMap: () => (/* reexport safe */ _common_utils_SortMap__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   extend: () => (/* reexport safe */ _extend__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_utils_SortMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils/SortMap */ "./src/common/utils/SortMap.js");
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extend */ "./src/admin/extend.ts");




flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('fof-user-directory', () => {
  //
});

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

/***/ "flarum/admin/app":
/*!******************************************************!*\
  !*** external "flarum.reg.get('core', 'admin/app')" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'admin/app');

/***/ }),

/***/ "flarum/common/extenders":
/*!*************************************************************!*\
  !*** external "flarum.reg.get('core', 'common/extenders')" ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.reg.get('core', 'common/extenders');

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
  !*** ./admin.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SortMap: () => (/* reexport safe */ _src_admin__WEBPACK_IMPORTED_MODULE_0__.SortMap),
/* harmony export */   extend: () => (/* reexport safe */ _src_admin__WEBPACK_IMPORTED_MODULE_0__.extend)
/* harmony export */ });
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.ts");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map