import { combineReducers } from 'redux';
import postsReducer from './postSlice';
import commentsReducer from './commentsSlice';

const rootReducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
});

export default rootReducer;
