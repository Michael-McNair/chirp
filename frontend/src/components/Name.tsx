import { Link } from 'react-router-dom';

export default function Name(props: { name: string; _id: string }) {
  return (
    <Link to={`/user/${props._id}`}>
      <h4>{props.name}</h4>
    </Link>
  );
}
