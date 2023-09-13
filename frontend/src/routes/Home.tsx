import {
  Route,
  Link,
  useLocation,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { User } from '../sharedTypes.tsx';

import Nav from '../components/Nav';
import WhoToFollow from '../components/WhoToFollow.tsx';
import ForYou from './ForYou.tsx';
import Following from './Following.tsx';
import UserPage from './UserPage.tsx';

export default function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    color: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/register');
    } else {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .get('http://localhost:3000/api/v1/my-info', { headers })
        .then((res) => {
          setUser(res.data.response);
        })
        .catch(() => {
          localStorage.removeItem('token');
          navigate('/register');
        });
    }
  }, []);

  const location = useLocation();

  const [page, setPage] = useState<string>();

  useEffect(() => {
    setPage(location.pathname.split('/')[2]);
  }, [location]);

  return (
    <div className="flex justify-between max-w-6xl w-full px-8 lg:px-20 gap-6">
      <Nav user={user} />
      <div className="bg-slate-50 shadow-md w-full">
        <div className="flex">
          <div className="h-12 flex-1 flex justify-center relative">
            <Link
              to="for-you"
              className="text-xl h-full w-full duration-150 hover:bg-slate-200 flex items-center justify-center"
            >
              For you
            </Link>
            {page === 'for-you' && (
              <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-3 h-1 bg-black"></div>
            )}
          </div>
          <div className="h-12 flex-1 flex justify-center relative">
            <Link
              to="following"
              className="text-xl h-full w-full duration-150 hover:bg-slate-200 flex items-center justify-center"
            >
              Following
            </Link>
            {page === 'following' && (
              <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-3 h-1 bg-black"></div>
            )}
          </div>
        </div>
        <Routes>
          <Route path="for-you" element={<ForYou />} />
          <Route path="following" element={<Following id={user.id} />} />
          <Route path="user/:id" element={<UserPage />} />
          <Route path="*" element={<Navigate to="for-you" />} />
        </Routes>
      </div>
      <WhoToFollow />
    </div>
  );
}
