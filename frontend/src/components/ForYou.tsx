import { useState, useEffect } from 'react';
import axios from 'axios';

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
          createdBy: { name: string };
          textContent: string;
        }) => {
          return (
            <div key={result._id}>
              <p>{result.createdBy.name}</p>
              <h2>{result.textContent}</h2>
            </div>
          );
        }
      )}
    </div>
  );
}
