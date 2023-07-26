import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="mx-4">
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
              localStorage.setItem('token', res.data.token);
              window.location.reload();
            })
            .catch((err) => {
              if (err.response) {
                console.log(err.response.data.msg);
              } else {
                console.log(err);
              }
            });
        }}
      >
        login
      </button>
    </div>
  );
}
