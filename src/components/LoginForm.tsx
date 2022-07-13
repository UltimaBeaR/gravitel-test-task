import { useNavigate } from 'react-router-dom';
import { useGqlLoginMutation } from 'hooks/graphql/loginMutation';

function LoginForm() {
  const { gqlLogin, gqlLoginData, gqlLoginLoading, gqlLoginError } = useGqlLoginMutation();

  const navigate = useNavigate();

  if (gqlLoginData) {
    navigate('/');
    return <div>Переадресация...</div>;
  }

  const loginHandler = async () => {
    await gqlLogin('UserOne', 'pass');
  };

  return (
    <div>
      { gqlLoginLoading && 'loading...' }
      { gqlLoginError && 'error ' + JSON.stringify(gqlLoginError) }
      <button onClick={loginHandler}>Login</button>
    </div>
  );
}

export default LoginForm;
