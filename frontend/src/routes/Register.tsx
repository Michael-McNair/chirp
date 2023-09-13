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
            label: 'User name',
            placeholder: 'User name',
            type: 'text',
          },
          {
            label: 'Email',
            placeholder: 'Email',
            type: 'email',
          },
          {
            label: 'Password',
            placeholder: 'Password',
            type: 'text',
          },
        ]}
        onSubmit={(formStates: any) => {
          axios
            .post('http://localhost:3000/api/v1/register', {
              email: formStates.email,
              name: formStates.name,
              password: formStates.password,
            })
            .then((res) => {
              navigate('/home');
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      />
    </div>
  );
}
