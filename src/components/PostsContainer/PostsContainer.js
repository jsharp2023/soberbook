// src/components/PostsContainer/PostsContainer.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid } from '@mui/material';
import { fetchPosts } from '../../reducers/postSlice';
import Post from '../Post/Post';

const PostsContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Container>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PostsContainer;
