import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducers/postSlice';
import profileReducer from './reducers/profileSlice';

const store = configureStore({
  reducer: {
    posts: postReducer,
    profile: profileReducer,
  },
});

export default store;



