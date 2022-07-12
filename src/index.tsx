import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { appConfig } from 'appConfig';

import './main.scss';

const apolloClient = new ApolloClient({
  uri: appConfig.graphqlUrl,
  cache: new InMemoryCache(),
});

const rootElement = (
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

const rootHtmlElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootHtmlElement);
root.render(rootElement);
