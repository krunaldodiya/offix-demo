import {ApolloProvider} from '@apollo/react-hooks';
import {NavigationNativeContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {OffixProvider} from 'react-offix-hooks';
import {offixClient} from './src/graphql/offix';
import InitialScreen from './src/screens/InitialScreen';

const App = () => {
  const [apolloClient, setApolloClientClient] = useState();

  useEffect(() => {
    offixClient.init().then((apolloClient: any) => {
      setApolloClientClient(apolloClient);
    });
  }, []);

  if (!apolloClient) {
    return (
      <ActivityIndicator
        size="small"
        color="black"
        style={{flex: 1, justifyContent: 'center'}}
      />
    );
  }

  return (
    <NavigationNativeContainer>
      <OffixProvider client={offixClient}>
        <ApolloProvider client={apolloClient}>
          <InitialScreen />
        </ApolloProvider>
      </OffixProvider>
    </NavigationNativeContainer>
  );
};

export default App;
