import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Post() {
  const [post, setPost] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('auto');

  return (
    <div className="h-screen w-full flex items-center justify-center relative">
      <Link
        to="/home"
        className="w-12 h-12 absolute top-3 left-3 flex justify-center items-center"
      >
        <div className="bg-black h-1 w-full rotate-45 -translate-y-1/2 absolute"></div>
        <div className="bg-black h-1 w-full -rotate-45 -translate-y-1/2 absolute"></div>
      </Link>
      <div className="rounded-md shadow-md w-96 w-2/1 p-6 bg-slate-50">
        <textarea
          className="w-full min-h-[27px] max-h-[500px] resize-none p-2 focus:outline-none bg-slate-200"
          placeholder="What's happening"
          value={post}
          onChange={(e) => {
            setTextareaHeight(e.target.scrollHeight + 'px');

            if (post.length < 300) {
              return setPost(e.target.value);
            }
            setPost(e.target.value.substring(0, 300));
          }}
          rows={1}
          style={{ height: textareaHeight }}
        />
        <h4 className={`text-lg ${post.length >= 300 && 'text-red-700'}`}>
          {post.length}/300
        </h4>
        <button
          className="px-4 py-2 bg-black text-white text-xl"
          onClick={() => {
            const headers = {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            };

            axios
              .post(
                'http://localhost:3000/api/v1/posts',
                { textContent: post },
                { headers }
              )
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
}
