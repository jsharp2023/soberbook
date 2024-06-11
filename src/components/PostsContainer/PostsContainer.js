import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, CircularProgress } from '@mui/material';
import { fetchPosts, selectPosts } from '../../reducers/postSlice';
import Post from '../Post/Post';

const PostsContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const postStatus = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === 'loading') {
    content = <CircularProgress />;
  } else if (postStatus === 'succeeded') {
    content = (
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    );
  } else if (postStatus === 'failed') {
    content = <p>Error loading posts</p>;
  }

  return <Container>{content}</Container>;
};

export default PostsContainer;

