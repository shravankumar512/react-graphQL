import React from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import App from './App';
import { setContext } from '@apollo/client/link/context';
import { JWT_TOKEN } from './context/auth';

const authLink = setContext(() => {
    const token = localStorage.getItem(JWT_TOKEN);
    return {
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/',
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default (
    <ApolloProvider client={client}>
        <App></App>
    </ApolloProvider>
);