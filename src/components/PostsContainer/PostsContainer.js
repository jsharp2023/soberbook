import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    content = (
      <div className="flex justify-center py-10">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  } else if (postStatus === 'succeeded') {
    content = (
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))}
      </div>
    );
  } else if (postStatus === 'failed') {
    content = (
      <p className="text-red-500 font-semibold text-center py-4">
        Error loading posts.
      </p>
    );
  }

  return <div className="max-w-3xl mx-auto px-4 py-6">{content}</div>;
};

export default PostsContainer;
