import { useState, useEffect } from 'react';
import axios from 'axios';

import Icon from './Icon';
import Name from './Name';

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
    <div className="for-you">
      {results.map(
        (result: {
          _id: string;
          createdBy: { name: string; color: string; _id: string };
          textContent: string;
        }) => {
          return (
            <div key={result._id} className="my-6">
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
        }
      )}
    </div>
  );
}
