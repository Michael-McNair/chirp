import axios from 'axios';
import SimpleForm from '../components/SimpleForm';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="mx-4">
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
    </div>
  );
}
