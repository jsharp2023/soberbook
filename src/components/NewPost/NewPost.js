import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { fetchPosts } from '../../reducers/postSlice';
import styles from './NewPost.module.css';

const NewPost = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(fetchPosts({ title, content }));
      setTitle('');
      setContent('');
    }
  };

  return (
    <Paper className={styles.newPost} elevation={3}>
      <Typography variant="h1" gutterBottom>
        Create a New Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Post
        </Button>
        <Button type="Share" variant="contained" color="secondary" fullWidth>
            <h1>Share</h1>
        </Button>
      </form>
    </Paper>
  );
};

export default NewPost;
