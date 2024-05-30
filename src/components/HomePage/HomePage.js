import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import { fetchPosts } from '../../reducers/postSlice';
import Post from '../Post/Post';
import NewPost from '../NewPost/NewPost';

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (postStatus === 'succeeded') {
    content = posts.map((post) => (
      <Grid item xs={12} key={post.id}>
        <Post post={post} />
      </Grid>
    ));
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create a New Post
      </Typography>
      <NewPost />
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Grid container spacing={3}>
        {content}
      </Grid>
    </Container>
  );
};

export default HomePage;
