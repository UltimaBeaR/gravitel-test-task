import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { appConfig } from 'appConfig';
import { storageService } from 'services';

const httpLink = createHttpLink({
  uri: appConfig.graphqlUrl,
});

const authLink = setContext((_, { headers }) => {
  const jwtAccessToken = storageService.getJwtAccessToken();
  
  return {
    headers: {
      ...headers,
      authorization: jwtAccessToken ? `Bearer ${jwtAccessToken}` : '',
    }
  }
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});