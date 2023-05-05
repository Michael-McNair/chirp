import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/for-you">Home</Link>
        </li>
        <li>Explore</li>
        <li>Notifications</li>
        <li>Messages</li>
        <li>Bookmarks</li>
        <li>Chirp Blue</li>
        <li>Profile</li>
        <li>More</li>
      </ul>
      <Link to="/post">Post</Link>
    </nav>
  );
}
