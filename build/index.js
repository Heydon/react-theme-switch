'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

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

    _this.css = '\n      html { filter: invert(100%); background: #fefefe; }\n      * { background-color: inherit }\n    ';

    if (_this.props.preserveRasters) {
      _this.css += 'img:not([src*=".svg"]), video, [style*="url("] { filter: invert(100%) }';
    }

    _this.state = {
      active: 'false'
    };

    _this.toggle = _this.props.bind(_this);
    return _this;
  }

  _createClass(ThemeSwitch, [{
    key: 'toggle',
    value: function toggle() {
      var _this2 = this;

      this.setState({
        active: !this.state.active
      }, function () {
        localStorage.setItem(_this2.props.storeKey, _this2.state.active);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        active: localStorage.getItem(this.props.storeKey) === 'true'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var active = this.state.active;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'button',
          {
            'aria-pressed': active,
            onClick: this.toggle,
            style: { outline: 'none' } },
          this.props.children ? this.props.children : active ? 'Light' : 'Dark'
        ),
        _react2.default.createElement(
          'style',
          { media: active ? 'screen' : 'none' },
          active ? this.css.trim() : this.css
        )
      );
    }
  }]);

  return ThemeSwitch;
}(_react.Component);

ThemeSwitch.defaultProps = {
  preserveRasters: true,
  storeKey: 'ThemeSwitch'
};

exports.default = ThemeSwitch;