import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducers/postSlice';
import profileReducer from './reducers/profileSlice';
import authReducer from './reducers/AuthSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    profile: profileReducer,
  },
});

export default store;



