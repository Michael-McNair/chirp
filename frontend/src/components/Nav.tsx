import { Link } from 'react-router-dom';
import { User } from '../sharedTypes';
import Icon from './Icon';
import home from '../images/home.svg';
import profile from '../images/profile.svg';
import logout from '../images/logout.svg';
import post from '../images/post.svg';

export default function Nav(props: { user: User }) {
  return (
    <section className="h-screen w-16 md:w-52 flex-shrink-0">
      <div className="w-full h-0"></div>

      <nav className="md:flex hidden flex-col justify-stretch fixed w-52 h-[calc(100%-4rem)] my-8 p-7 pt-0 rounded-md bg-slate-50 shadow-md ">
        <ul className="flex h-full flex-col justify-around my-2">
          <Link to="/home/for-you" className="text-2xl">
            Home
          </Link>
          <Link to={`/home/user/${props.user.id}`} className="text-2xl">
            Profile
          </Link>
          <Link to="/register" className="text-2xl">
            Logout
          </Link>
          <Link
            to="/post"
            className="text-2xl bg-black p-4 text-slate-50 rounded-full text-center hidden md:block"
          >
            Post
          </Link>

          <div className="flex items-center gap-1.5">
            <Icon name={props.user.name} size={10} color={props.user.color} />

            <h3 className="text-xl">{props.user.name}</h3>
          </div>
        </ul>
      </nav>

      <nav className="flex md:hidden flex-col justify-stretch fixed w-16 h-[calc(100%-4rem)] my-8 p-2 rounded-md bg-slate-50 shadow-md py-7">
        <ul className="h-full flex flex-col justify-around my-2">
          <Link to="/home/for-you">
            <img src={home} alt="home" />
          </Link>

          <Link to={`/home/user/${props.user.id}`}>
            <img src={profile} alt="profile" />
          </Link>

          <Link to="/register">
            <img src={logout} alt="logout" />
          </Link>
          <Link to="/post">
            <img src={post} alt="post" />
          </Link>

          <div>
            <div
              className="rounded-full flex items-center justify-center aspect-square"
              style={{ background: `#${props.user.color}` }}
            >
              <h2 className="text-white text-3xl">
                {props.user.name
                  ? props.user.name.split('')[0].toUpperCase()
                  : ''}
              </h2>
            </div>
          </div>
        </ul>
      </nav>
    </section>
  );
}
