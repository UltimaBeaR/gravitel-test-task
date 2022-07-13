import { useGqlLoginMutation } from 'hooks/graphql/loginMutation';

function LoginForm() {
  const { gqlLogin, gqlLoginData, gqlLoginLoading, gqlLoginError } = useGqlLoginMutation();

  const loginHandler = async () => {
    await gqlLogin('UserOne', 'pass');
  };

  return (
    <div>
      Hello world { !gqlLoginError && gqlLoginData?.login.token }
      { gqlLoginLoading && 'loading...' }
      { gqlLoginError && 'error ' + JSON.stringify(gqlLoginError) }
      <button onClick={loginHandler}>Login</button>
    </div>
  );
}

export default LoginForm;
