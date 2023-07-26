import Nav from '../components/Nav';

import { User } from '../sharedTypes.tsx';

import { Outlet, Link } from 'react-router-dom';

export default function Home(props: { user: User }) {
  return (
    <div className="w-full flex gap-6">
      <Nav user={props.user} />
      <div className="bg-slate-50 shadow-md w-full">
        <div className="flex">
          <div className="h-12 flex-1 flex justify-center relative">
            <Link
              to="for-you"
              className="text-xl h-full w-full duration-150 hover:bg-slate-200 flex items-center justify-center"
            >
              For you
            </Link>
            {/* {page === 'for-you' && (
            <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-3 h-1 bg-blue-600"></div>
          )} */}
          </div>
          <div className="h-12 flex-1 flex justify-center relative">
            <Link
              to="following"
              className="text-xl h-full w-full duration-150 hover:bg-slate-200 flex items-center justify-center"
            >
              Following
            </Link>
            {/* {page === 'following' && (
            <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-3 h-1 bg-blue-600"></div>
          )} */}
          </div>
        </div>

        <Outlet />
      </div>
      <div className="w-40">
        <Link to="/login">login</Link>
        <br />
        <Link to="/register">register</Link>
      </div>
    </div>
  );
}
