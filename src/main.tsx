import React from 'react'
import ReactDOM from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from './App.tsx'

import "./App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css";


const client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
