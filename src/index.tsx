import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from 'components/App';
import { appConfig } from 'appConfig';
import { store } from 'store';
import 'main.scss';

const apolloClient = new ApolloClient({
  uri: appConfig.graphqlUrl,
  cache: new InMemoryCache(),
});

const rootElement = (
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ApolloProvider>
  </React.StrictMode>
);

const rootHtmlElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootHtmlElement);
root.render(rootElement);
