import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

export default function Home() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    axios
      .get('http://localhost:3000/api/v1/posts', { headers })
      .then((res) => {
        console.log(res.data.posts);
        setResults(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div
        className="nav"
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <Link to="/for-you">For You</Link>
        <Link to="/following">Following</Link>
      </div>
      <Routes>
        <Route
          path="/for-you"
          element={results.map((result: any) => {
            console.log(result);
            return (
              <div key={result._id}>
                <p>{result.createdBy.name}</p>
                <h2>{result.textContent}</h2>
              </div>
            );
          })}
        />
        <Route path="/following" element={<h2>following</h2>} />
      </Routes>
    </div>
  );
}
