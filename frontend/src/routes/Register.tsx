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
      <h1 className="text-3xl mb-4">Register</h1>
      <SimpleForm
        button="register"
        inputs={[
          {
            label: 'User name',
            placeholder: 'User name',
            type: 'text',
            variable: 'name',
          },
          {
            label: 'Email',
            placeholder: 'Email',
            type: 'email',
            variable: 'email',
          },
          {
            label: 'Password',
            placeholder: 'Password',
            type: 'text',
            variable: 'password',
          },
        ]}
        onSubmit={(formStates: any) => {
          console.log(formStates);
          axios
            .post('http://localhost:3000/api/v1/register', {
              email: formStates.email,
              name: formStates.name,
              password: formStates.password,
            })
            .then((res) => {
              localStorage.setItem('token', res.data.token);
              navigate('/home');
              window.location.reload();
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
              setPopupShown(true);
              setPopupText('Something Went Wrong');
            });
        }}
      />
      <Link to="/login" className="text-xl mt-3 text-blue-700 hover:underline">
        Already have an account?
      </Link>

      <Popup shown={popupShown}>
        <button
          className="w-10 h-10 relative mb-3"
          onClick={() => setPopupShown(false)}
        >
          <div className="h-1 w-full bg-black absolute top-1/2 -translate-y-1/2 rotate-45"></div>
          <div className="h-1 w-full bg-black absolute top-1/2 -translate-y-1/2 -rotate-45"></div>
        </button>

        <h2 className="text-center text-4xl mb-10 whitespace-nowrap">
          {popupText}
        </h2>

        <button
          className="bg-black text-white p-3 text-3xl w-full"
          onClick={() => setPopupShown(false)}
        >
          Close
        </button>
      </Popup>
    </div>
  );
}
