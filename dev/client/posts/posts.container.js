import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as postsActions from './posts.actions';
import PostsLazyScroll from './PostsLazyScroll';

const mapDispatchToProps = (dispatch) => ({
  postsActions: bindActionCreators(postsActions, dispatch)
});

const mapStateToProps = state => {
  return {
    postEntity: state.posts
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsLazyScroll);