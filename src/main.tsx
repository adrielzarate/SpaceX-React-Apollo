import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import App from './App.tsx'

import "./App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css";

const httpLink = createHttpLink({
  uri: 'https://spacex-production.up.railway.app/',
});

const authLink = setContext((_, { headers }) => {
  const access_token = 'my_access_token_abc123';
  return {
    headers: {
      ...headers,
      authorization: access_token ? `Bearer ${access_token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
