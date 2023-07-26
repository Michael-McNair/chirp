import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserWithPosts, Post } from '../sharedTypes';
import Icon from '../components/Icon';
import Name from '../components/Name';

export default function UserPage() {
  const { id } = useParams();

  console.log(id);

  const [success, setSuccess] = useState(false);

  const [user, setUser] = useState<UserWithPosts>({
    id: '',
    name: '',
    email: '',
    color: '',
    posts: [],
  });

  const follow = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    axios
      .post(
        `http://localhost:3000/api/v1/follow`,
        { userIdToFollow: user.id },
        { headers }
      )
      .then((res) => {
        if (!res.data.success) {
          console.log('user not found');
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    axios
      .get(`http://localhost:3000/api/v1/user-info/${id}`, { headers })
      .then((res) => {
        if (!res.data.success) {
          console.log('user not found');
          setSuccess(false);
        } else {
          console.log(res.data.response);
          setSuccess(true);
          setUser(res.data.response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {success ? (
        <div className="w-full" style={{ backgroundColor: `#${user.color}` }}>
          <div className="w-full">
            <h2 className="text-7xl text-slate-100">
              {user.name.toUpperCase()}
            </h2>
          </div>
          <div className="rounded-t-2xl bg-slate-50 p-4">
            <button
              className="bg-slate-50 rounded-full text-white text-xl px-4 py-1 mb-4 hover:opacity-70 duration-150"
              style={{ backgroundColor: `#${user.color}` }}
              onClick={() => follow()}
            >
              follow
            </button>
            {user.posts.map((post: Post) => {
              return (
                <div key={post._id} className="mb-6">
                  <div className="flex items-center gap-3 justify-start">
                    <Icon size={12} color={user.color} userName={user.name} />
                    <Name
                      name={user.name}
                      _id={user.id}
                      className={'text-2xl'}
                    />
                  </div>
                  <h2 className="text-xl mt-3">{post.textContent}</h2>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-full">user not found</div>
      )}
    </div>
  );
}
