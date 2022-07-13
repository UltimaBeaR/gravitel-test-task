import { gql, useMutation } from '@apollo/client';
import { useAppDispatch } from 'hooks';
import { storageService } from 'services';
import { setIsAuthenticated } from 'store/authSlice';

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
  const dispatch = useAppDispatch();

  const gqlLoginCompletedHandler = (data: GqlLoginData) => {
    const jwtAccessToken = data.login.token;

    storageService.setJwtAccessToken(jwtAccessToken);
    dispatch(setIsAuthenticated(true));
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
    storageService.setJwtAccessToken(null);
    dispatch(setIsAuthenticated(false));

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