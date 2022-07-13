import { gql, useMutation } from '@apollo/client';
import { useAppDispatch } from 'hooks';
import { storageService } from 'services';
import { setIsAuthenticated } from 'store/authSlice';

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
  const dispatch = useAppDispatch();

  const gqlLoginCompletedHandler = (data: GqlLoginData) => {
    const jwtAccessToken = data.login.token;

    storageService.setJwtAccessToken(jwtAccessToken);
    dispatch(setIsAuthenticated(true));
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