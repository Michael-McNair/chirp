import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { UserWithPosts, Post } from '../sharedTypes';

import Icon from '../components/Icon';
import Popup from '../components/Popup';

export default function UserPage(props: { myId: string }) {
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

  const [popupShown, setPopupShown] = useState(false);
  const [popupState, setPopupState] = useState('');

  const [selectedPost, setSelectedPost] = useState('');
  const [editingPost, setEditingPost] = useState('');

  const [textareaHeight, setTextareaHeight] = useState('auto');

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

  const deletePost = (id: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/register');
    } else {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .delete(`http://localhost:3000/api/v1/posts/${id}`, { headers })
        .then((res) => {
          console.log(res);
          setPopupShown(true);
          setPopupState('deleted');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const editPost = (id: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/register');
    } else {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .patch(
          `http://localhost:3000/api/v1/posts/${id}`,
          { textContent: editingPost },
          { headers }
        )
        .then((res) => {
          console.log(res);
          setPopupShown(true);
          setEditingPost('');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div className="absolute top-0 left-0 h-screen w-full pointer-events-none">
        <Popup shown={popupShown}>
          {popupState === 'delete' && (
            <>
              <button
                className="w-10 h-10 relative mb-3"
                onClick={() => {
                  setPopupShown(false);
                }}
              >
                <div className="h-1 w-full bg-black absolute top-1/2 -translate-y-1/2 rotate-45"></div>
                <div className="h-1 w-full bg-black absolute top-1/2 -translate-y-1/2 -rotate-45"></div>
              </button>

              <h2 className="text-center text-4xl mb-10 whitespace-nowrap">
                Are you sure you want to delete this post?
              </h2>

              <button
                className="bg-black text-white p-3 text-3xl w-full"
                onClick={() => {
                  deletePost(selectedPost);
                }}
              >
                Delete
              </button>
            </>
          )}
          {popupState === 'deleted' && (
            <>
              <button
                className="w-10 h-10 relative mb-3"
                onClick={() => {
                  setPopupShown(false);

                  window.location.reload();
                }}
              >
                <div className="h-1 w-full bg-black absolute top-1/2 -translate-y-1/2 rotate-45"></div>
                <div className="h-1 w-full bg-black absolute top-1/2 -translate-y-1/2 -rotate-45"></div>
              </button>

              <h2 className="text-center text-4xl mb-10 whitespace-nowrap">
                Post successfully deleted
              </h2>

              <button
                className="bg-black text-white p-3 text-3xl w-full"
                onClick={() => {
                  setPopupShown(false);

                  window.location.reload();
                }}
              >
                Close
              </button>
            </>
          )}
          {popupState === 'edit' && (
            <>
              <button
                className="w-10 h-10 relative mb-3"
                onClick={() => {
                  setPopupShown(false);
                  setTextareaHeight('auto');
                  setEditingPost('');
                }}
              >
                <div className="h-1 w-full bg-black absolute top-1/2 -translate-y-1/2 rotate-45"></div>
                <div className="h-1 w-full bg-black absolute top-1/2 -translate-y-1/2 -rotate-45"></div>
              </button>

              <form
                onSubmit={() => {
                  editPost(selectedPost);
                  setPopupShown(false);
                  setPopupState('edited');
                  setTextareaHeight('auto');
                }}
              >
                <textarea
                  className="w-full min-h-[27px] max-h-[500px] resize-none p-2 focus:outline-none bg-slate-200"
                  placeholder="What's happening"
                  value={editingPost}
                  onChange={(e) => {
                    setTextareaHeight(e.target.scrollHeight + 'px');

                    if (editingPost.length < 300) {
                      return setEditingPost(e.target.value);
                    }
                    setEditingPost(e.target.value.substring(0, 300));
                  }}
                  rows={1}
                  style={{ height: textareaHeight }}
                />
                <h4
                  className={`py-1 text-lg ${
                    editingPost.length >= 300 && 'text-red-700'
                  }`}
                >
                  {editingPost.length}/300
                </h4>

                <button
                  className="bg-black text-white p-3 text-3xl w-full"
                  type="submit"
                >
                  Update post
                </button>
              </form>
            </>
          )}
          {popupState === 'edited' && (
            <>
              <button
                className="w-10 h-10 relative mb-3"
                onClick={() => {
                  setPopupShown(false);

                  window.location.reload();
                }}
              >
                <div className="h-1 w-full bg-black absolute top-1/2 -translate-y-1/2 rotate-45"></div>
                <div className="h-1 w-full bg-black absolute top-1/2 -translate-y-1/2 -rotate-45"></div>
              </button>

              <h2 className="text-center text-4xl mb-10 whitespace-nowrap">
                Post successfully edited
              </h2>

              <button
                className="bg-black text-white p-3 text-3xl w-full"
                onClick={() => {
                  setPopupShown(false);

                  window.location.reload();
                }}
              >
                Close
              </button>
            </>
          )}
        </Popup>
      </div>
      {success ? (
        <div className="w-full" style={{ backgroundColor: `#${user.color}` }}>
          <div className="w-full">
            <h2 className="text-7xl text-slate-100">
              {user.name.toUpperCase()}
            </h2>
          </div>
          <div className="rounded-t-2xl bg-slate-50 p-4">
            {props.myId === id ? (
              <>
                {user.posts.map((post: Post) => {
                  return (
                    <div key={post._id} className="mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 justify-start">
                          <Icon size={12} color={user.color} name={user.name} />

                          <Link to={`/home/user/${user.id}`}>
                            <h4 className="text-2xl">{user.name}</h4>
                          </Link>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            className="rounded-full text-white text-xl px-4 py-1 hover:opacity-70 duration-150"
                            style={{ backgroundColor: `#${user.color}` }}
                            onClick={() => {
                              setPopupState('edit');
                              setPopupShown(true);
                              setEditingPost(post.textContent);
                              setSelectedPost(post._id);
                            }}
                          >
                            edit
                          </button>
                          <button
                            className="rounded-full text-white text-xl px-4 py-1 hover:opacity-70 duration-150 bg-red-600"
                            onClick={() => {
                              setPopupState('delete');
                              setPopupShown(true);
                              setSelectedPost(post._id);
                            }}
                          >
                            delete
                          </button>
                        </div>
                      </div>
                      <h2 className="text-xl mt-3">{post.textContent}</h2>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <button
                  className="rounded-full text-white text-xl px-4 py-1 mb-4 hover:opacity-70 duration-150"
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
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full">user not found</div>
      )}
    </div>
  );
}
