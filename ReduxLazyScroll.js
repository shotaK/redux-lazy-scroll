import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

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

  attachScrollListener () {
    if (!this.props.hasMore || this.props.isLoading || this.props.errorMessage) return;
    let el = window;
    el.addEventListener('scroll', this.scrollFunction, true);
    el.addEventListener('resize', this.scrollFunction, true);
    this.scrollListener();
  }

  windowScrollListener() {
    let el = ReactDOM.findDOMNode(this);

    let windowScrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    let elTotalHeight = topPosition(el) + el.offsetHeight;
    return elTotalHeight - windowScrollTop - window.innerHeight;
  }

  scrollListener() {
    if (this.windowScrollListener() < Number(this.props.threshold)) {
      this.detachScrollListener();
      this.props.loadMore();
    }
  }

  detachScrollListener () {
    let el = window;
    el.removeEventListener('scroll', this.scrollFunction, true);
    el.removeEventListener('resize', this.scrollFunction, true);
  }

  render() {
    return (
      <div>
      {this.props.children}
  </div>
  );
  }
}

ReduxLazyScroll.propTypes = {
  hasMore: React.PropTypes.bool,
  isLoading: React.PropTypes.bool,
  errorMessage: PropTypes.string,
  loadMore: PropTypes.func
};
ReduxLazyScroll.defaultProps = {
  hasMore: true,
  loadingMore: false,
  threshold: 100,
  errorMessage: ""
};

export default ReduxLazyScroll;
