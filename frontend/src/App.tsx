import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './routes/Home.tsx';
import Register from './routes/Register.tsx';
import Login from './routes/Login.tsx';
import Post from './routes/MakePost.tsx';
import NotFound from './routes/NotFound.tsx';

export default function App() {
  return (
    <div className="flex justify-center items-start w-screen bg-slate-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<Post />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
