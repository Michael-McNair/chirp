import { useParams } from 'react-router-dom';

export default function App() {
  const { _id } = useParams();

  return (
    <div>
      <h1>User Page</h1>
      <p>User ID: {_id}</p>
    </div>
  );
}
