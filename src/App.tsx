import React from "react";
import { Component } from "react";
import { AppContainer } from "./navigation/FlowerNavigation";
import { ApolloClient, DefaultOptions } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { HttpLink, ApolloLink } from "apollo-boost";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { setContext } from "apollo-link-context";
import { getToken } from "./helper/Auth";
import AsyncStorage from "@react-native-community/async-storage";
import SplashScreen from "react-native-splash-screen";
import { NavigationScreenProp } from "react-navigation";
import { NetInfo } from "react-native";

const cache = new InMemoryCache();

const http = new HttpLink({
  uri: "http://localhost:4000/graphql"
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

const state = withClientState({
  cache,
  resolvers: {
    Mutation: {
      Logout: async (_, __, { client }) => {
        await AsyncStorage.removeItem("token");
        return null;
      }
    }
  }
});

const defaultOptions: DefaultOptions = {
  // watchQuery: {
  //   fetchPolicy: "cache-and-network",
  //   errorPolicy: "ignore"
  // },
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
  link: ApolloLink.from([state, authLink, http]),
  defaultOptions: defaultOptions
});

export default class App extends Component<NavigationScreenProp<any, any>> {
  componentWillMount = async () => {
    // AsyncStorage.setItem(
    //   "token",
    //   "eyJhbGciOiJIUzI1NiJ9.MTEyMzEyMw.r7ehiKH37_H5AtlUxvHne4nWmpgJWg3iQsBUK3LEKhc"
    // );
    // try {
    //   // await AsyncStorage.setItem(
    //   //   "token",
    //   //   "eyJhbGciOiJIUzI1NiJ9.MTA3Mjk4MDg2NQ.8sVd5-Nro7obXk4rItuWg6YlrGlNWIjv99kJwV2jrNY"
    //   // );
    // await AsyncStorage.clear();
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log(await isSignedIn());
    // console.log(await AsyncStorage.getItem("token"));
    // NetInfo.isConnected.fetch().then(re)
  };

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
