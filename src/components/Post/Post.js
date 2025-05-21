import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLike, addComment } from '../../reducers/postSlice';

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
    <div className="mb-6 rounded-lg shadow-md border border-gray-300 p-4 bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      {post.url && (
        <img
          src={post.url}
          alt={post.title}
          className="w-full max-h-80 object-cover rounded mb-2"
        />
      )}
      <p className="mb-4">{post.body}</p>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-red-500 hover:text-red-600 transition"
        >
          {liked ? '❤️' : '🤍'}
          <span className="text-sm">Like</span>
        </button>

        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition"
        >
          {liked ? '👍' : '👎'}
          <span className="text-sm">Thumb</span>
        </button>
      </div>

      <div className="mt-4">
        <p className="font-semibold text-sm mb-1">Comments:</p>
        <div className="space-y-1 mb-3 text-sm text-gray-700 dark:text-gray-300">
          {post.comments.map((comment, index) => (
            <p key={index}>• {comment}</p>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          rows={2}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={handleAddComment}
          className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Comment
        </button>
      </div>
    </div>
  );
});

export default Post;
