import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchComments as fetchCommentsAPI } from '../api/commentService';

const initialState = {
  comments: [],
  status: 'idle',
  error: null
};

// Async thunk to fetch comments
export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId) => {
  const response = await fetchCommentsAPI(postId);
  return response;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// Selector to get comments from the state
export const selectComments = (state) => state.comments.comments;

export default commentsSlice.reducer;
