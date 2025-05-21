import React from 'react';
import { useSelector } from 'react-redux';
import { selectPosts } from '../../reducers/postSlice';
import Post from '../Post/Post';

const PostList = () => {
  const posts = useSelector(selectPosts);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6">Posts</h2>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
