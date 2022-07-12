import { gql, useMutation } from '@apollo/client';
import { storageService } from 'services';

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

export function useGqlLoginMutation() {
  const gqlLoginCompletedHandler = (data: GqlLoginData) => {
    storageService.setJwtAccessToken(data.login.token);
  };

  const [
    gqlLoginMutation,
    {
      data: gqlLoginData,
      loading: gqlLoginLoading,
      error: gqlLoginError
    }
  ] = useMutation<GqlLoginData>(GQL_LOGIN, { onCompleted: gqlLoginCompletedHandler });

  const gqlLogin = async (username: string, password: string) => {
    await gqlLoginMutation({
      variables: { username: username, password: password }
    });
  };

  return {
    gqlLogin,
    gqlLoginData,
    gqlLoginLoading,
    gqlLoginError
  };
}