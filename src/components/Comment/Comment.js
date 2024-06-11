import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Button, CardActions, TextField, Collapse } from '@mui/material';
import { addLike, addComment } from '../../reducers/postSlice';
import styles from './Post.module.css';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');

  const handleLike = () => {
    dispatch(addLike(post.id));
  };

  const handleComment = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleAddComment = () => {
    if (comment) {
      dispatch(addComment({ postId: post.id, comment }));
      setComment('');
      setShowCommentBox(false);
    }
  };

  return (
    <Card className={styles.post}>
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleLike}>
          Like {post.likes || 0}
        </Button>
        <Button size="small" color="primary" onClick={handleComment}>
          Comment
        </Button>
      </CardActions>
      <Collapse in={showCommentBox}>
        <div className={styles.commentBox}>
          <TextField
            label="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
          />
          <Button size="small" color="primary" onClick={handleAddComment}>
            Submit
          </Button>
        </div>
        {post.comments && post.comments.length > 0 && (
          <div className={styles.comments}>
            {post.comments.map((comment, index) => (
              <Typography key={index} variant="body2">
                {comment}
              </Typography>
            ))}
          </div>
        )}
      </Collapse>
    </Card>
  );
};

export default Post;

