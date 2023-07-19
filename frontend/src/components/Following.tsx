import { useState, useEffect } from 'react';
import axios from 'axios';

import Name from './Name.tsx';
import Icon from './Icon.tsx';

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
    <div className="following">
      {results.map((result: Post) => {
        return (
          <div key={result._id} className="mb-6">
            <div className="flex items-center gap-3 justify-start">
              <Icon
                size={12}
                color={result.createdBy.color}
                userName={result.createdBy.name}
              />
              <Name
                name={result.createdBy.name}
                _id={result.createdBy._id}
                className={'text-2xl'}
              />
            </div>
            <h2 className="text-xl mt-3">{result.textContent}</h2>
          </div>
        );
      })}
    </div>
  );
}
