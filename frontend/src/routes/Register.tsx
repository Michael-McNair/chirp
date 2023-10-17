import axios from 'axios';
import SimpleForm from '../components/SimpleForm';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

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
            });
        }}
      />
      <Link to="/login" className="text-xl mt-3 text-blue-700 hover:underline">
        Already have an account?
      </Link>
    </div>
  );
}
