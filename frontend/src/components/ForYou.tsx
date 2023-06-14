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
          console.log(result.createdBy);
          return (
            <div
              key={result._id}
              className="border-black border-solid border-2 my-1"
            >
              <div className="flex items-center gap-1 justify-start">
                <Icon
                  size={8}
                  color={result.createdBy.color}
                  userName={result.createdBy.name}
                />
                <Name name={result.createdBy.name} _id={result.createdBy._id} />
              </div>
              <h2>{result.textContent}</h2>
            </div>
          );
        }
      )}
    </div>
  );
}
