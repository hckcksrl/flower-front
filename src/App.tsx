import React from "react";
import { Component } from "react";
import { AppContainer } from "./navigation/FlowerNavigation";
import { ApolloClient, DefaultOptions } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { setContext } from "apollo-link-context";
import { getToken } from "./helper/Auth";
import AsyncStorage from "@react-native-community/async-storage";
import SplashScreen from "react-native-splash-screen";
import { NavigationScreenProp } from "react-navigation";

const cache = new InMemoryCache();

const http = new HttpLink({
  uri: "http://172.20.10.2:4000/graphql"
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  };
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only",
    errorPolicy: "ignore"
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  },
  mutate: {
    errorPolicy: "all"
  }
};

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([authLink, http]),
  defaultOptions: defaultOptions,
  resolvers: {
    Mutation: {
      Logout: async (_, __) => {
        await AsyncStorage.clear();
        return null;
      }
    }
  }
});

export default class App extends Component<NavigationScreenProp<any, any>> {
  componentDidMount() {
    SplashScreen.hide();
  }

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
