import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { UserWithPosts, Post } from '../sharedTypes';

import Icon from '../components/Icon';

export default function UserPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const [user, setUser] = useState<UserWithPosts>({
    id: '',
    name: '',
    email: '',
    color: '',
    posts: [],
  });

  const [following, setFollowing] = useState<string[]>([]);

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
        console.log(res.data.message);
        checkFollowingUsers();
      })
      .catch((err) => {
        console.log(err.response.data.message);
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
          setSuccess(true);
          setUser(res.data.response);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    checkFollowingUsers();
  }, [id]);

  const checkFollowingUsers = () => {
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
          setFollowing(res.data.response.following);
        })
        .catch(() => {
          localStorage.removeItem('token');
          navigate('/register');
        });
    }
  };

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
              {following.includes(user.id) ? 'Unfollow' : 'Follow'}
            </button>
            {user.posts.map((post: Post) => {
              return (
                <div key={post._id} className="mb-6">
                  <div className="flex items-center gap-3 justify-start">
                    <Icon size={12} color={user.color} name={user.name} />

                    <Link to={`/home/user/${user.id}`}>
                      <h4 className="text-2xl">{user.name}</h4>
                    </Link>
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
