import { useState, useEffect } from 'react';
import axios from 'axios';

import PostComponent from '../components/PostComponent';

import { Post } from '../sharedTypes';

export default function ForYou() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    axios
      .get('http://localhost:3000/api/v1/posts', { headers })
      .then((res) => {
        setResults(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="px-6">
      {results.map((result: Post) => {
        return <PostComponent post={result} />;
      })}
    </div>
  );
}
