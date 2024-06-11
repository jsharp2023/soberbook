import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder, ThumbUp, ThumbUpAltOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addLike, addComment } from '../../reducers/postSlice';
import styles from './Post.module.css';

const Post = React.memo(({ post }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');

  const handleLike = () => {
    if (!liked) {
      dispatch(addLike(post.id));
      setLiked(true);
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      dispatch(addComment({ postId: post.id, comment }));
      setComment('');
    }
  };

  return (
    <Card className={styles.post}>
      <CardContent>
        <Typography variant="h5">{post.title}</Typography>
        <img src={post.url} alt={post.title} style={{ maxWidth: '100%' }} />
        <Typography variant="body1">{post.body}</Typography>
        <div className={styles.actions}>
          <IconButton onClick={handleLike}>
            {liked ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
          <IconButton onClick={handleLike}>
            {liked ? <ThumbUp color="primary" /> : <ThumbUpAltOutlined />}
          </IconButton>
        </div>
        <div className={styles.commentsSection}>
          <Typography variant="body2">Comments:</Typography>
          {post.comments.map((comment, index) => (
            <Typography key={index} variant="body2">{comment}</Typography>
          ))}
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Button onClick={handleAddComment} variant="contained" color="primary">
            Comment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

export default Post;



