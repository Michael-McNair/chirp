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
    <div className="px-6 mt-2 flex-1">
      {results.map((result: Post) => {
        return <PostComponent post={result} key={result._id} />;
      }) && (
        <div className="w-full h-full flex justify-center items-center">
          <h2 className="text-2xl text-center">
            No posts by people you follow
          </h2>
        </div>
      )}
    </div>
  );
}
