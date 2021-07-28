/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/binder.js":
/*!***********************!*\
  !*** ./src/binder.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Binder; }\n/* harmony export */ });\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './util.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var _watcher_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./watcher.js */ \"./src/watcher.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n//バインド\n\n\nvar watcher = new _watcher_js__WEBPACK_IMPORTED_MODULE_1__.default();\n\nvar Bind = /*#__PURE__*/function () {\n  function Bind(node, variable) {\n    _classCallCheck(this, Bind);\n\n    this.node = node;\n    this.attribute_name = \"\";\n    this.variables = [];\n    this.watches = [];\n  }\n\n  _createClass(Bind, [{\n    key: \"feedBack\",\n    value: function feedBack(value) {\n      if (value === undefined) {\n        var node = this.node;\n\n        if (node.getAttribute(\"type\") === \"checkbox\") {\n          value = node.checked;\n        } else if (node.getAttribute(\"type\") === \"radio\") {\n          value = node.value;\n        } else {\n          value = node.value;\n\n          if (node.hasAttribute(\"number\")) {\n            value = Number(value);\n          }\n        }\n      } //バインド変数にコントロールの値をセットする\n\n\n      var val = this.watches[0].setValue(value);\n    }\n  }, {\n    key: \"refresh\",\n    value: function refresh() {\n      //バインドされた変数の値をノード属性にセット\n      var bind = this;\n      var check = false;\n      this.watches.forEach(function (w, idx) {\n        if (w.change_flg) {\n          check = true;\n        }\n      });\n\n      if (!check) {\n        return;\n      }\n\n      var node = bind.node;\n      var value = bind.watches[0].getValue(0);\n\n      if (bind.func) {\n        var old = bind.watches.map(function (w) {\n          return w.old_value;\n        });\n        value = bind.func(old);\n      }\n\n      if (bind.attribute_name !== \"\") {\n        node.setAttribute(bind.attribute_name, value);\n        return;\n      }\n\n      switch (node.tagName) {\n        case \"INPUT\":\n        case \"SELECT\":\n        case \"TEXTAREA\":\n          if (node.getAttribute(\"type\") === \"checkbox\") {\n            node.checked = value;\n          }\n\n          if (node.getAttribute(\"type\") === \"radio\") {\n            node.checked = Boolean(value === node.value);\n          } else {\n            node.value = value;\n          }\n\n          Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './util.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(node, \"input\");\n          break;\n\n        default:\n          if (value && (value instanceof HTMLElement || value.nodeName)) {\n            node.innerHTML = \"\";\n            node.appendChild(value);\n          } else {\n            node.textContent = value;\n          }\n\n      }\n    }\n  }]);\n\n  return Bind;\n}();\n\nvar Binder = /*#__PURE__*/function () {\n  function Binder() {\n    _classCallCheck(this, Binder);\n\n    this.binds = [];\n    this.variable_root = window;\n  }\n\n  _createClass(Binder, [{\n    key: \"init\",\n    value: function init(_variable_root) {\n      var _this = this;\n\n      //初期化&バインド\n      if (_variable_root) {\n        this.variable_root = _variable_root;\n      } //this.binds=[];\n\n\n      var bindedNodes = document.querySelectorAll(\"*\");\n      bindedNodes.forEach(function (node) {\n        for (var i = 0; i < node.attributes.length; i++) {\n          var attribute_name = node.attributes[i].name;\n          if (attribute_name.indexOf(\"bind:\") !== 0) continue;\n          var variable_name = node.getAttribute(attribute_name);\n          attribute_name = attribute_name.replace(\"bind:\", \"\");\n          var func = null;\n\n          if (node.hasAttribute(\"bindfunc\")) {\n            func = node.getAttribute(\"bindfunc\");\n            func = new Function('arg', func);\n          }\n\n          _this.bind(node, attribute_name, null, variable_name, func);\n        }\n\n        ;\n      });\n\n      var func = function func() {\n        _this.refresh();\n\n        window.requestAnimationFrame(func);\n      };\n\n      func();\n    }\n  }, {\n    key: \"bind\",\n    value: function bind(node, attribute_name, variable_root, variable_names, func) {\n      var bind = this.binds.find(function (e) {\n        return e.node == node && e.attribute_name == attribute_name;\n      });\n\n      if (bind) {\n        return bind;\n      } //ノードとバインド変数を渡してバインド情報を登録する\n\n\n      bind = new Bind();\n      bind.node = node;\n      bind.attribute_name = attribute_name;\n\n      if (!variable_root) {\n        variable_root = this.variable_root;\n      }\n\n      if (!Array.isArray(variable_names)) {\n        variable_names = [variable_names];\n      }\n\n      variable_names.forEach(function (name) {\n        bind.watches.push(watcher.watch(variable_root, name));\n      });\n      bind.func = func;\n      bind.binder = this;\n      this.binds.push(bind);\n\n      if (node.hasAttribute(\"feedback\")) {\n        node.addEventListener(\"change\", function () {\n          bind.feedBack();\n        });\n      }\n\n      return bind;\n    }\n  }, {\n    key: \"bindNodes\",\n    value: function bindNodes(node, variable_root) {\n      var _this2 = this;\n\n      var bindedNodes = node.querySelectorAll(\"*\");\n      bindedNodes.forEach(function (node) {\n        for (var i = 0; i < node.attributes.length; i++) {\n          var attribute_name = node.attributes[i].name;\n          if (attribute_name.indexOf(\"bind:\") !== 0) continue;\n          var variable_name = node.getAttribute(attribute_name);\n          attribute_name = attribute_name.replace(\"bind:\", \"\");\n\n          _this2.bind(node, attribute_name, variable_root, variable_name);\n        }\n\n        ;\n      });\n    }\n  }, {\n    key: \"refresh\",\n    value: function refresh() {\n      watcher.refresh(); //バインドしたノードに変数の値をセット\n\n      for (var i = 0; i < this.binds.length; i++) {\n        this.binds[i].refresh();\n      }\n    }\n  }]);\n\n  return Binder;\n}();\n\n\n\n//# sourceURL=webpack://bc/./src/binder.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ \"./src/main.js\");\n\n\n//# sourceURL=webpack://bc/./src/index.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _binder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binder.js */ \"./src/binder.js\");\n\n\n\n\nvar onloadfunc = function onloadfunc() {\n  binder.init(values);\n  main.reCalc();\n};\n\nonloadfunc();\n\n//# sourceURL=webpack://bc/./src/main.js?");

/***/ }),

/***/ "./src/watcher.js":
/*!************************!*\
  !*** ./src/watcher.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Watcher; }\n/* harmony export */ });\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './util.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n//�ϐ��Ď�\n\n\nvar Watch = /*#__PURE__*/function () {\n  function Watch(variable_root, variable_name, callback) {\n    _classCallCheck(this, Watch);\n\n    this.variable_root = variable_root;\n    this.variable_direction = variable_name.split(\".\");\n    this.callback = callback;\n    this.old_value = {};\n  }\n\n  _createClass(Watch, [{\n    key: \"getValue\",\n    value: function getValue(n) {\n      //�Ď��Ώۂ̕ϐ��̒l���擾\n      var value = this.variable_root;\n      var v = this.variable_direction;\n\n      for (var j = 0; j < v.length - n; j++) {\n        value = value[v[j]];\n\n        if (value == undefined) {\n          value = null;\n          break;\n        }\n      }\n\n      return value;\n    }\n  }, {\n    key: \"setValue\",\n    value: function setValue(value) {\n      //�Ď��ϐ��ɒl���Z�b�g����\n      var val = this.getValue(1); //�Ώۂ̕ϐ��̐e���擾\n\n      val[this.variable_direction[this.variable_direction.length - 1]] = value;\n    }\n  }, {\n    key: \"refresh\",\n    value: function refresh() {\n      //�o�C���h���ꂽ�ϐ��̒l���m�[�h�����ɃZ�b�g\n      var value = this.getValue(0);\n      this.change_flg = this.old_value !== value;\n      this.old_value = value;\n    }\n  }]);\n\n  return Watch;\n}();\n\nvar Watcher = /*#__PURE__*/function () {\n  function Watcher() {\n    _classCallCheck(this, Watcher);\n\n    this.watches = [];\n  }\n\n  _createClass(Watcher, [{\n    key: \"init\",\n    value: function init() {//������&�o�C���h\n      //\t\tvar func =()=>{\n      //\t\t\tthis.refresh();\n      //\t\t\twindow.requestAnimationFrame(func);\n      //\t\t}\n      //\t\tfunc();\n    }\n  }, {\n    key: \"watch\",\n    value: function watch(variable_root, variable_name, func) {\n      //�Ď��ϐ���ǉ�\n      var watch = new Watch(variable_root, variable_name, func);\n      this.watches.push(watch);\n      return watch;\n    }\n  }, {\n    key: \"refresh\",\n    value: function refresh() {\n      //�Ď��Ώۂ��`�F�b�N\n      this.watches.forEach(function (w) {\n        w.refresh();\n      });\n    }\n  }]);\n\n  return Watcher;\n}();\n\n\n\n//# sourceURL=webpack://bc/./src/watcher.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;