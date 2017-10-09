import * as actions from './posts.actions';

const initialState = {isFetching: false, posts: [], errorMessage: '', skip: 0, limit: 12, hasMore: true};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case actions.POSTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        skip: action.skip,
        limit: action.limit,
        hasMore: true
      });
    case actions.POSTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        posts: state.posts.concat(action.posts),
        hasMore: action.hasMore
      });
    case actions.POSTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.errorMessage,
        hasMore: false
      });
    default:
      return state
  }
}