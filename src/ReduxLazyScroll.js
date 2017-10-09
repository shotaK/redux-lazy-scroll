import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// measures top position of DOM element
export function topPosition(domElt) {
  if (!domElt) {
    return 0;
  }
  return domElt.offsetTop + topPosition(domElt.offsetParent);
}

class ReduxLazyScroll extends Component {

  constructor(props) {
    super(props);
    this.scrollFunction = this.scrollListener.bind(this);
  }

  componentDidMount () {
    this.attachScrollListener();
  }

  componentDidUpdate () {
    this.attachScrollListener();
  }

  componentWillUnmount () {
    this.detachScrollListener();
  }

  targetElement() {
    return this.props.isParentScrollable ? ReactDOM.findDOMNode(this) : window;
  }

  attachScrollListener () {
    if (!this.props.hasMore || this.props.isFetching || this.props.errorMessage) return;
    const el = this.targetElement();
    el.addEventListener('scroll', this.scrollFunction, true);
    el.addEventListener('resize', this.scrollFunction, true);
    this.scrollListener();
  }

  windowScrollListener() {
    const el = ReactDOM.findDOMNode(this);

    const windowScrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    const elTotalHeight = topPosition(el) + el.offsetHeight;
    return elTotalHeight - windowScrollTop - window.innerHeight;
  }

  parentScrollListener() {
    const el = ReactDOM.findDOMNode(this);
    const topScrollPos = el.scrollTop;
    const totalContainerHeight = el.scrollHeight;
    const containerFixedHeight = el.offsetHeight;
    const bottomScrollPos = topScrollPos + containerFixedHeight;

    return (totalContainerHeight - bottomScrollPos);
  }

  scrollListener() {
    const bottomPosition = this.props.isParentScrollable ? this.parentScrollListener() : this.windowScrollListener();

    if (bottomPosition < Number(this.props.threshold)) {
      this.detachScrollListener();
      this.props.loadMore();
    }
  }

  detachScrollListener () {
    const el = this.targetElement();
    el.removeEventListener('scroll', this.scrollFunction, true);
    el.removeEventListener('resize', this.scrollFunction, true);
  }

  render() {
    return (
      <div className="redux-lazy-scroll" style={{height: this.props.parentHeight, overflow: 'scroll'}}>
        {this.props.children}
      </div>
    );
  }
}

ReduxLazyScroll.propTypes = {
  hasMore: PropTypes.bool,
  isFetching: PropTypes.bool,
  errorMessage: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  loadMore: PropTypes.func,
  threshold: PropTypes.number,
  isParentScrollable: PropTypes.bool,
  parentHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
};
ReduxLazyScroll.defaultProps = {
  hasMore: true,
  isFetching: false,
  threshold: 100,
  errorMessage: false,
  loadMore: () => {},
  isParentScrollable: false,
  parentHeight: '100%'
};

export default ReduxLazyScroll;
