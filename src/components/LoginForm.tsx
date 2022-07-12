import { gql, useMutation } from '@apollo/client';

interface GqlLoginData {
  login: {
    token: string
  }
}

const GQL_LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

function App() {
  const [
    gqlLogin,
    {
      data: gqlLoginData,
      loading: gqlLoginLoading,
      error: gqlLoginError
    }
  ] = useMutation<GqlLoginData>(GQL_LOGIN);

  const loginHandler = async () => {
    await gqlLogin({
      variables: { username: "UserOne", password: "pass" }
    });
  };

  return (
    <div>
      Hello world { !gqlLoginError && gqlLoginData?.login.token }
      { gqlLoginLoading && "loading..." }
      { gqlLoginError && "error " + JSON.stringify(gqlLoginError) }
      <button onClick={loginHandler}>Login</button>
    </div>
  );
}

export default App;
