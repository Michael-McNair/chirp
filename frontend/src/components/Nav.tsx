import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import { User } from '../sharedTypes';
import Icon from './Icon';

export default function Nav(props: { user: User }) {
  return (
    <nav className="w-1/4 flex flex-col justify-between h-screen">
      <div>
        <ul>
          <NavItem>
            <Link to="/home">Home</Link>
          </NavItem>
          <NavItem>Explore</NavItem>
          <NavItem>Notifications</NavItem>
          <NavItem>Messages</NavItem>
          <NavItem>Bookmarks</NavItem>
          <NavItem>Chirp Blue</NavItem>
          <NavItem>Profile</NavItem>
          <NavItem>More</NavItem>
        </ul>
        <Link to="/post">Post</Link>
      </div>

      <div className="my-4 flex items-center gap-1">
        <Icon userName={props.user.name} size={8} color={props.user.color} />

        <h3>{props.user.name}</h3>
      </div>
    </nav>
  );
}
