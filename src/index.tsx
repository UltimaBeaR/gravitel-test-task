import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux'
import { ApolloProvider } from '@apollo/client';
import App from 'components/App';
import { apolloClient } from 'apolloClient';
import { store } from 'store';
import 'main.scss';

const rootElement = (
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>
    </ApolloProvider>
  </React.StrictMode>
);

const rootHtmlElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootHtmlElement);
root.render(rootElement);
