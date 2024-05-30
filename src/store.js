// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducers/postSlice';

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export default store;


