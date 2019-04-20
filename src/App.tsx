import React from "react";
import { Component } from "react";
import { AppContainer } from "./navigation/FlowerNavigation";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink, ApolloLink, NextLink } from "apollo-boost";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { setContext } from "apollo-link-context";

const cache = new InMemoryCache();

const http = new HttpLink({
  uri: "http://localhost:4000/graphql"
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization:
        "eyJhbGciOiJIUzI1NiJ9.YXNkYXNkQG5hdmVyLmNvbQ.UG4ss98EA2SHhCFDpXVOqADt0-_HqA9itvfryawrWk8"
    }
  };
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(http)
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <AppContainer />
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}
