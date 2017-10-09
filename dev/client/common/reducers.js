import {combineReducers} from 'redux';
import posts from '../posts/posts.reducer';

const rootReducer = combineReducers({
  posts
});

export default rootReducer