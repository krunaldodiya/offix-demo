import {useSubscription} from '@apollo/react-hooks';
import {createStackNavigator} from '@react-navigation/stack';
import gql from 'graphql-tag';
import React from 'react';
import HomeScreen from './HomeScreen';
import TabsScreen from './TabsScreen';

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

const InitialScreen = () => {
  const Stack = createStackNavigator();

  const {data: message_added_data} = useSubscription(message_added);
  console.log(message_added_data, 'message_added_data');

  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="TabsScreen" component={TabsScreen} />
    </Stack.Navigator>
  );
};

export default React.memo(InitialScreen);
