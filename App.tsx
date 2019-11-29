import {ApolloProvider, useQuery, useSubscription} from '@apollo/react-hooks';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationNativeContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import gql from 'graphql-tag';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {client} from './client';

const countries = gql`
  query Countries {
    countries {
      id
    }
  }
`;

const message_added = gql`
  subscription PrivateMessageAdded {
    privateMessageAdded {
      id
      text
      sender {
        id
        name
        avatar
      }
    }
  }
`;

const HomeScreen = (props: any) => {
  const {data: countries_data} = useQuery(countries);
  const {data: message_added_data} = useSubscription(message_added);

  console.log(countries_data, 'countries_data');
  console.log(message_added_data, 'message_added_data');

  return (
    <View>
      <Text>HomeScreen</Text>

      <Button
        title="go to tabs"
        onPress={() => props.navigation.push('DrawerScreen')}
      />
    </View>
  );
};

const FeedsScreen = () => {
  return (
    <View>
      <Text>FeedsScreen</Text>
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View>
      <Text>SettingsScreen</Text>
    </View>
  );
};

const TabsScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator lazy={true} initialRouteName="FeedsScreen">
      <Tab.Screen name="FeedsScreen" component={FeedsScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const DrawerScreen = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="TabsScreen" component={TabsScreen} />
    </Drawer.Navigator>
  );
};

const InitialScreen = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DrawerScreen" component={DrawerScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationNativeContainer>
        <InitialScreen />
      </NavigationNativeContainer>
    </ApolloProvider>
  );
};

export default App;
