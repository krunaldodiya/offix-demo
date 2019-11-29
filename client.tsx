import AsyncStorage from '@react-native-community/async-storage';
import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from 'apollo-boost';
import {setContext} from 'apollo-link-context';
import {PusherLink} from './pusher';
import Pusher from 'pusher-js/react-native';

const httpUrlProd = 'https://graphql.pauzr.com/graphql';

const authLink = setContext(async (req, {headers}) => {
  const token = await AsyncStorage.getItem('token');
  const customToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ3JhcGhxbC5wYXV6ci5jb21cL2dyYXBocWwiLCJpYXQiOjE1NzUwMzAwMDIsImV4cCI6MTYwNjU2NjAwMiwibmJmIjoxNTc1MDMwMDAyLCJqdGkiOiJCYTEwWXJVTk5lRG9jNnZ3Iiwic3ViIjoiYzEzZDE4ZjItNjQzOS00NjgwLThhNjItYjIwYjA3NGRjNThlIiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.ulaBoMobSowtapXRMru85E8UHyx0dEdmxH-kSVqRU-g';

  if (!token) {
    await AsyncStorage.setItem('token', customToken);
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const pusher = new Pusher('60d3868f66b0ab455b41', {
  cluster: 'ap2',
  authEndpoint: `${httpUrlProd}/subscriptions/auth`,
});

const pusherLink = new PusherLink({
  pusher,
});

const httpLink = new HttpLink({
  uri: httpUrlProd,
});

const link = ApolloLink.from([authLink, pusherLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
