'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.topPosition = topPosition;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// measures top position of DOM element
function topPosition(domElt) {
  if (!domElt) {
    return 0;
  }
  return domElt.offsetTop + topPosition(domElt.offsetParent);
}

var ReduxLazyScroll = function (_Component) {
  _inherits(ReduxLazyScroll, _Component);

  function ReduxLazyScroll(props) {
    _classCallCheck(this, ReduxLazyScroll);

    var _this = _possibleConstructorReturn(this, (ReduxLazyScroll.__proto__ || Object.getPrototypeOf(ReduxLazyScroll)).call(this, props));

    _this.scrollFunction = _this.scrollListener.bind(_this);
    return _this;
  }

  _createClass(ReduxLazyScroll, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.attachScrollListener();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.attachScrollListener();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.detachScrollListener();
    }
  }, {
    key: 'targetElement',
    value: function targetElement() {
      return this.props.isParentScrollable ? _reactDom2.default.findDOMNode(this) : window;
    }
  }, {
    key: 'attachScrollListener',
    value: function attachScrollListener() {
      if (!this.props.hasMore || this.props.isFetching || this.props.errorMessage) return;
      var el = this.targetElement();
      el.addEventListener('scroll', this.scrollFunction, true);
      el.addEventListener('resize', this.scrollFunction, true);
      this.scrollListener();
    }
  }, {
    key: 'windowScrollListener',
    value: function windowScrollListener() {
      var el = _reactDom2.default.findDOMNode(this);

      var windowScrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      var elTotalHeight = topPosition(el) + el.offsetHeight;
      return elTotalHeight - windowScrollTop - window.innerHeight;
    }
  }, {
    key: 'parentScrollListener',
    value: function parentScrollListener() {
      var el = _reactDom2.default.findDOMNode(this);
      var topScrollPos = el.scrollTop;
      var totalContainerHeight = el.scrollHeight;
      var containerFixedHeight = el.offsetHeight;
      var bottomScrollPos = topScrollPos + containerFixedHeight;

      return totalContainerHeight - bottomScrollPos;
    }
  }, {
    key: 'scrollListener',
    value: function scrollListener() {
      var bottomPosition = this.props.isParentScrollable ? this.parentScrollListener() : this.windowScrollListener();

      if (bottomPosition < Number(this.props.threshold)) {
        this.detachScrollListener();
        this.props.loadMore();
      }
    }
  }, {
    key: 'detachScrollListener',
    value: function detachScrollListener() {
      var el = this.targetElement();
      el.removeEventListener('scroll', this.scrollFunction, true);
      el.removeEventListener('resize', this.scrollFunction, true);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'redux-lazy-scroll', style: { height: this.props.parentHeight, overflow: 'scroll' } },
        this.props.children
      );
    }
  }]);

  return ReduxLazyScroll;
}(_react.Component);

ReduxLazyScroll.propTypes = {
  hasMore: _propTypes2.default.bool,
  isFetching: _propTypes2.default.bool,
  errorMessage: _propTypes2.default.string,
  loadMore: _propTypes2.default.func,
  threshold: _propTypes2.default.number,
  isParentScrollable: _propTypes2.default.bool,
  parentHeight: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};
ReduxLazyScroll.defaultProps = {
  hasMore: true,
  isFetching: false,
  threshold: 100,
  errorMessage: "",
  loadMore: function loadMore() {},
  isParentScrollable: false,
  parentHeight: '100%'
};

exports.default = ReduxLazyScroll;