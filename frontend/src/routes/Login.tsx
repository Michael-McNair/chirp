import { useState } from 'react';
import axios from 'axios';
interface Props {
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

export default function Register({ setUserName }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="App">
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => {
          axios
            .post('http://localhost:3000/api/v1/login', {
              email: email,
              password: password,
            })
            .then((res) => {
              setUserName(res.data.user.name);
              localStorage.setItem('token', res.data.token);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        login
      </button>
    </div>
  );
}
