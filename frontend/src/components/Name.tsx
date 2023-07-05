import { Link } from 'react-router-dom';

export default function Name(props: {
  name: string;
  _id: string;
  className: string;
}) {
  return (
    <Link to={`/user/${props._id}`}>
      <h4 className={props.className}>{props.name}</h4>
    </Link>
  );
}
