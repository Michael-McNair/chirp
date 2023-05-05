import React, { useState } from 'react';
import axios from 'axios';

export default function Post() {
  const [post, setPost] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder="What's happening"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <button
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
  );
}
