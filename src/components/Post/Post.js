// src/components/Post/Post.js

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Post = ({ post }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{post.title}</Typography>
        <Typography variant="body2" color="textSecondary">{post.body}</Typography>
      </CardContent>
    </Card>
  );
};

export default Post;


