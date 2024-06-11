import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import { selectPosts } from '../../reducers/postSlice';
import Post from '../Post/Post';
import styles from './PostList.module.css';

const PostList = () => {
  const posts = useSelector(selectPosts);

  return (
    <Container maxWidth="md" className={styles.postList}>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
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

export default PostList;

