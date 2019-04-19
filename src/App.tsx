import React from "react";
import { Component } from "react";
import { AppContainer } from "./navigation/FlowerNavigation";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink, ApolloLink } from "apollo-boost";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

const cache = new InMemoryCache();

const http = new HttpLink({
  uri: "http://192.168.219.143:4000/graphql"
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([http])
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
