import { gql, useMutation } from '@apollo/client';
import { useAuth } from 'hooks/auth';

export interface GqlLoginData {
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

export function useGqlLoginMutation() {
  const { login: logIn, logout: logOut } = useAuth();

  const gqlLoginCompletedHandler = (data: GqlLoginData) => {
    const jwtAccessToken = data.login.token;
    logIn(jwtAccessToken);
  };

  const [
    mutation,
    {
      data,
      loading,
      error
    }
  ] = useMutation<GqlLoginData>(GQL_LOGIN, { onCompleted: gqlLoginCompletedHandler });

  const gqlLogin = async (username: string, password: string) => {
    logOut();

    await mutation({
      variables: { username: username, password: password }
    });
  };

  return {
    gqlLogin,
    gqlLoginData: data,
    gqlLoginLoading: loading,
    gqlLoginError: error
  };
}