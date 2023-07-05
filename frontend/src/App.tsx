import Nav from './components/Nav.tsx';

import Home from './routes/Home.tsx';
import Register from './routes/Register.tsx';
import Login from './routes/Login.tsx';
import Post from './routes/Post.tsx';
import UserPage from './routes/UserPage.tsx';

import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { User } from './sharedTypes.tsx';

export default function App() {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    color: '',
    following: [],
  });
  const [page, setPage] = useState('for-you');

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    axios
      .get('http://localhost:3000/api/v1/user-info', { headers })
      .then((res) => {
        if (!res.data.success) {
          console.log('user not found');
          localStorage.removeItem('token');
        } else {
          console.log(res.data.response);
          setUser(res.data.response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex justify-center items-start w-screen bg-slate-100">
      <div className="flex justify-between max-w-6xl w-full px-20 gap-8">
        <BrowserRouter>
          <Nav user={user} />
          <Routes>
            <Route
              path="/home"
              element={
                <Home
                  page={page}
                  setPage={setPage}
                  following={user.following}
                />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post" element={<Post />} />
            <Route path="/user/:_id" element={<UserPage />} />
          </Routes>
          {user.id ? (
            <section className="w-1/4">
              <h3>Who to follow</h3>
            </section>
          ) : (
            <section className="w-1/4">
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </section>
          )}
        </BrowserRouter>
      </div>
    </div>
  );
}
