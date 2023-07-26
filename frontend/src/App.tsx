import Home from './routes/Home.tsx';
import Register from './routes/Register.tsx';
import Login from './routes/Login.tsx';
import Post from './routes/Post.tsx';
import ForYou from './routes/ForYou.tsx';
import Following from './routes/Following.tsx';
import UserPage from './routes/UserPage.tsx';

import { User } from './sharedTypes.tsx';

import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    color: '',
  });

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    axios
      .get('http://localhost:3000/api/v1/my-info', { headers })
      .then((res) => {
        setUser(res.data.response);
      })
      .catch(() => {
        console.log('invalid token');
        localStorage.removeItem('token');
      });
  }, []);

  return (
    <div className="flex justify-center items-start w-screen bg-slate-100">
      <div className="flex justify-between max-w-6xl w-full px-8 lg:px-20 gap-5">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post" element={<Post />} />
          <Route path="/home" element={<Home user={user} />}>
            <Route path="for-you" element={<ForYou />} />
            <Route path="following" element={<Following id={user.id} />} />
            <Route path="user/:id" element={<UserPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
