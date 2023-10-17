import axios from 'axios';
import SimpleForm from '../components/SimpleForm';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import Popup from '../components/Popup';

export default function Register() {
  const navigate = useNavigate();

  const [popupShown, setPopupShown] = useState(false);
  const [popupText, setPopupText] = useState('');

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-3xl mb-4">Login</h1>
      <SimpleForm
        button="login"
        inputs={[
          {
            label: 'Email',
            placeholder: 'Email',
            type: 'email',
            variable: 'email',
          },
          {
            label: 'Password',
            placeholder: 'Password',
            type: 'password',
            variable: 'password',
          },
        ]}
        onSubmit={(formStates: any) => {
          axios
            .post('http://localhost:3000/api/v1/login', {
              email: formStates.email,
              password: formStates.password,
            })
            .then((res) => {
              localStorage.setItem('token', res.data.token);
              navigate('/home');
            })
            .catch((err) => {
              if (err.response) {
                console.log(err.response.data.msg);
                setPopupText(err.response.data.msg);
              } else {
                console.log(err);
                setPopupText('Something Went Wrong');
              }
              setPopupShown(true);
            });
        }}
      />
      <Link
        to="/register"
        className="text-xl mt-3 text-blue-700 hover:underline"
      >
        Don't have an account?
      </Link>
      <Popup
        textContent={popupText}
        shown={popupShown}
        setPopupShown={setPopupShown}
      />
    </div>
  );
}
