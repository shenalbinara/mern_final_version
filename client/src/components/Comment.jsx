import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';

export default function Comment({ comment, onLike }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  

  return (
    <div className="flex p-4 norder-b dark:border-gray-600 text-sm">
      <div className='flex-shrink-0 mr-3'>
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className='flex-1'>
        <div className="flex items-center space-x-2">
          <span className="font-bold text-sm">{user?.username ? `@${user.username}` : 'anonymous user'}</span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        <p className='text-gray-500 pb-2'>{comment.content}</p>

        <div className='flex items-center pt-2 text-xs'>
          <button
            className={`text-gray-400 hover:text-blue-500 ${
              comment.likes.includes(localStorage.getItem('userId')) && '!text-blue-500'
            }`}
            type='button'
            onClick={() => onLike(comment._id)}
          >
            <FaThumbsUp className='text-sm' />
          </button>

          <p className='text-gray-400'>
            {
              comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "Like" : "Likes")
            }
          </p>

         
        </div>
      </div>
    </div>
  );
}
