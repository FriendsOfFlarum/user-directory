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
/*! exports provided: SortMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SortMap", function() { return _src_admin__WEBPACK_IMPORTED_MODULE_0__["SortMap"]; });



/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! exports provided: SortMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_utils_SortMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils/SortMap */ "./src/common/utils/SortMap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SortMap", function() { return _common_utils_SortMap__WEBPACK_IMPORTED_MODULE_1__["default"]; });




flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializers.add('fof-user-directory', function (app) {
  var sortOptions = {
    '': app.translator.trans('fof-user-directory.lib.sort.not_specified')
  };
  Object.keys(new _common_utils_SortMap__WEBPACK_IMPORTED_MODULE_1__["default"]().sortMap()).forEach(function (sort) {
    sortOptions[sort] = app.translator.trans('fof-user-directory.lib.sort.' + sort);
  });
  app.extensionData["for"]('fof-user-directory').registerSetting({
    setting: 'fof-user-directory-link',
    label: app.translator.trans('fof-user-directory.admin.settings.link'),
    type: 'boolean'
  }).registerSetting({
    setting: 'fof-user-directory.default-sort',
    label: app.translator.trans('fof-user-directory.admin.settings.default-sort'),
    options: sortOptions,
    type: 'select',
    "default": ''
  }).registerPermission({
    icon: 'far fa-address-book',
    label: app.translator.trans('fof-user-directory.admin.permissions.view_user_directory'),
    permission: 'fof.user-directory.view',
    allowGuest: true
  }, 'view');
});

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

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/app'];

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map