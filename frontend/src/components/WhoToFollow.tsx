import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Icon from './Icon';

import { User } from '../sharedTypes';

export default function WhoToFollow() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/users-to-follow')
      .then((res) => setResult(res.data.response));
  }, []);

  return (
    <section className="hidden lg:block h-screen w-48 flex-shrink-0">
      <div className="w-full h-0"></div>

      <div className="flex flex-col justify-stretch fixed w-48 h-[calc(100%-4rem)] my-8 rounded-md bg-slate-50 shadow-md">
        <h2 className="text-2xl mb-3 px-5 pt-5">who to follow</h2>

        {result.map((user: User) => (
          <Link
            to={`/home/user/${user.id}`}
            key={user.id}
            className="flex gap-1.5 items-center py-2 px-3 hover:bg-slate-200"
          >
            <Icon size={7} color={user.color} name={user.name} />
            <h4 className="text-lg">{user.name}</h4>
          </Link>
        ))}
      </div>
    </section>
  );
}
