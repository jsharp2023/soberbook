import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import styles from './Comment.module.css';

const Comment = ({ comment }) => {
  return (
    <Card className={styles.commentCard}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comment.email}
        </Typography>
        <Typography variant="body1">
          {comment.body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
