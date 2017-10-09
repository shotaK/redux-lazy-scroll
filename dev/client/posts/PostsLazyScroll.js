import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../assets/bootstrap.min.css';
import '../assets/core.css';
import ReduxLazyScroll from '../../../src/ReduxLazyScroll';
import Post from './Post';

class PostsLazyScroll extends Component {

  constructor(props) {
    super(props);
    this.loadPosts = this.loadPosts.bind(this);
  }

  loadPosts() {
    const {skip, limit} = this.props.postEntity;
    this.props.postsActions.fetchPosts(skip, limit);
  }

  render() {
    const {posts, isFetching, errorMessage, hasMore} = this.props.postEntity;
    return (
      <div className="container posts-lazy-scroll">
        <ReduxLazyScroll
          isFetching={isFetching}
          errorMessage={errorMessage}
          loadMore={this.loadPosts}
          hasMore={hasMore}
        >
          {posts.map(post => (
            <Post
              key={post._id}
              post={post}
            />
            ))
          }
        </ReduxLazyScroll>
        <div className="row posts-lazy-scroll__messages">
          {isFetching && <div className="alert alert-info"> Loading more posts... </div>}

          {!hasMore && !errorMessage &&
            <div className="alert alert-success">All the posts has been loaded successfully.</div>
          }

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        </div>
      </div>
    );
  }
}

PostsLazyScroll.propTypes = {
  postEntity: PropTypes.shape({
    errorMessage: PropTypes.string,
    isFetching: PropTypes.bool,
    limit: PropTypes.number,
    skip: PropTypes.number,
    posts: PropTypes.array,
    hasMore: PropTypes.bool
  }),
  postsActions: PropTypes.shape({
    fetchPosts: PropTypes.func
  })
};
PostsLazyScroll.defaultProps = {};

export default PostsLazyScroll;

