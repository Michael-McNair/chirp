import Nav from './components/Nav.tsx';

import Root from './routes/Home.tsx';
import Register from './routes/Register.tsx';
import Login from './routes/Login.tsx';
import Post from './routes/Post.tsx';

import './App.css';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div
      className="App"
      style={{
        display: 'flex',
        width: '50vw',
        justifyContent: 'space-between',
      }}
    >
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="*" element={<Root />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<Post />} />
        </Routes>
        <section>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          {localStorage.getItem('token') && <h3>token present</h3>}
        </section>
      </BrowserRouter>
    </div>
  );
}
