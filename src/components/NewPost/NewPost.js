import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { addPost } from '../../reducers/postSlice';
import styles from './NewPost.module.css';

const NewPost = ({ isDarkMode }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      const newPost = {
        title,
        body: content,
        url: file ? URL.createObjectURL(file) : null,
      };
      dispatch(addPost(newPost));
      setTitle('');
      setContent('');
      setFile(null);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Paper className={`${styles.newPost} ${isDarkMode ? 'dark' : ''}`} elevation={3}>
      <Typography variant="h5" gutterBottom>
        Create a New Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="AA or NA"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="dense" // Change margin to "dense"
          required
        />
        <TextField
          label="Whats on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="dense" // Change margin to "dense"
          required
        />
        <input type="file" onChange={handleFileChange} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Post
        </Button>
      </form>
    </Paper>
  );
};

export default NewPost;

 
