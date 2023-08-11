import { useState, useEffect } from 'react';
import axios from 'axios';

import PostComponent from '../components/PostComponent.tsx';

import { Post } from '../sharedTypes.tsx';

interface Props {
  id: string;
}

export default function Following({ id }: Props) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    axios
      .request({
        method: 'post',
        url: 'http://localhost:3000/api/v1/posts/following',
        data: { userId: id },
        headers,
      })
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
        return <PostComponent post={result} key={result._id} />;
      }) && (
        <div className="w-full flex justify-center">
          <h2 className="text-2xl mt-40">No posts by people you follow</h2>
        </div>
      )}
    </div>
  );
}
