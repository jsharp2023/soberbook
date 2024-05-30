import { combineReducers } from 'redux';
import postsReducer from '../features/posts/postSlice';
import usersReducer from '../features/users/userSlice';
import commentsReducer from '../features/comments/commentSlice';

const rootReducer = combineReducers({
posts: postsReducer,
users: usersReducer,
comments: commentsReducer
});
export default rootReducer;