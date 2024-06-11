import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=8');
  return response.data;
});

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.items.unshift({ id: Date.now(), ...action.payload, likes: 0, comments: [] });
    },
    addLike: (state, action) => {
      const post = state.items.find(post => post.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.items.find(post => post.id === postId);
      if (post) {
        post.comments.push(comment);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.map(post => ({ ...post, likes: 0, comments: [] }));
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addPost, addLike, addComment } = postSlice.actions;

export const selectPosts = state => state.posts.items;

export default postSlice.reducer;




