import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-9xl font-extrabold">404</h1>
      <p className="text-xl my-3">Page not found</p>
      <Link to="/" className="text-blue-700 text-2xl hover:underline">
        Go To Home
      </Link>
    </div>
  );
}
