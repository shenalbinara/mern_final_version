import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert, Button, Textarea } from 'flowbite-react';
import Comment from './Comment.jsx';

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  // ✅ Generate anonymous user ID on first load
  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      const anonId = 'anon-' + Math.random().toString(36).substring(2, 10);
      localStorage.setItem('userId', anonId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) return;

    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser?._id || localStorage.getItem('userId'), // fallback to anon userId
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      const userId = localStorage.getItem('userId');

      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), // ✅ send anon userId
      });

      if (res.ok) {
        const data = await res.json();
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex item-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img
            className='h-7 w-7 object-cover rounded-full'
            src={currentUser.profilePicture}
            alt=''
          />
          <Link
            to={'/dashboard?tab=profile'}
            className='text-xs text-teal-500 border-teal-500 hover:underline'>
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link to={'/sign-in'} className='text-blue-500 hover:underline'>
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-4'>
          <Textarea
            placeholder='Add a Comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} Characters remaining!
            </p>
            <Button
              type='submit'
              className='border border-teal-500 text-gray hover:bg-gradient-to-r from-teal-500 to-blue-500 transition duration-300 rounded-md flex items-center'>
              Submit
            </Button>
          </div>

          {commentError && (
            <Alert color='failure' className='mt-5'>
              {commentError}
            </Alert>
          )}
        </form>
      )}

      {comments.length === 0 ? (
        <p className='text-sm my-5'>No Comments Yet</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>

          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} onLike={handleLike} />
          ))}
        </>
      )}
    </div>
  );
}
