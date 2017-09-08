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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ThemeSwitch = function (_Component) {
  _inherits(ThemeSwitch, _Component);

  function ThemeSwitch(props) {
    _classCallCheck(this, ThemeSwitch);

    var _this = _possibleConstructorReturn(this, (ThemeSwitch.__proto__ || Object.getPrototypeOf(ThemeSwitch)).call(this, props));

    _this.store = typeof localStorage === 'undefined' ? null : localStorage;

    _this.css = '\n      html { filter: invert(100%); background: #fefefe; }\n      * { background-color: inherit }\n      ' + (_this.props.preserveRasters === 'true' ? 'img:not([src*=".svg"]), [style*="url("] { filter: invert(100%) }' : '');

    _this.state = {
      active: 'false',
      supported: true
    };

    _this.toggle = _this.toggle.bind(_this);
    return _this;
  }

  _createClass(ThemeSwitch, [{
    key: 'invertSupported',
    value: function invertSupported(property, value) {
      var prop = property + ':',
          el = document.createElement('test'),
          mStyle = el.style;
      el.style.cssText = prop + value;
      return mStyle[property];
    }
  }, {
    key: 'isActive',
    value: function isActive() {
      return this.state.active === 'true';
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.setState({
        active: this.isActive() ? 'false' : 'true'
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.store) {
        this.setState({
          supported: this.invertSupported('filter', 'invert(100%)'),
          active: this.store.getItem('ThemeSwitch') || 'false'
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.store) {
        this.store.setItem('ThemeSwitch', this.state.active);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.state.supported ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { 'aria-pressed': this.isActive() ? 'true' : 'false', onClick: this.toggle },
            'inverted theme: ',
            _react2.default.createElement(
              'span',
              { 'aria-hidden': 'true' },
              this.isActive() ? 'on' : 'off'
            )
          ),
          _react2.default.createElement(
            'style',
            { media: this.isActive() ? 'screen' : 'none' },
            this.isActive() ? this.css.trim() : this.css
          )
        ) : ''
      );
    }
  }]);

  return ThemeSwitch;
}(_react.Component);

ThemeSwitch.defaultProps = { preserveRasters: 'true' };

exports.default = ThemeSwitch;

/***/ })
/******/ ]);