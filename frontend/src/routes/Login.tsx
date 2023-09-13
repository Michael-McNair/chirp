import axios from 'axios';
import SimpleForm from '../components/SimpleForm';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-3xl mb-4">Login</h1>
      <SimpleForm
        button="register"
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
            type: 'text',
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
              } else {
                console.log(err);
              }
            });
        }}
      />
      <Link
        to="/register"
        className="text-xl mt-3 text-blue-700 hover:underline"
      >
        Don't have an account?
      </Link>
    </div>
  );
}
