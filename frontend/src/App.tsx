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
  });
  const [page, setPage] = useState('for-you');

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    axios
      .get('http://localhost:3000/api/v1/user-info', { headers })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex justify-between max-w-screen-md w-full px-8">
      <BrowserRouter>
        <Nav user={user} />
        <Routes>
          <Route
            path="/home"
            element={<Home page={page} setPage={setPage} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<Post />} />
          <Route path="/user/:_id" element={<UserPage />} />
        </Routes>
        {user ? (
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
  );
}
