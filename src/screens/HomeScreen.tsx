import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {useOfflineMutation} from 'react-offix-hooks';
import uuidv4 from 'uuid/v4';
import {createOptimisticResponse} from 'offix-cache';

const countries = gql`
  query Countries {
    countries {
      id
    }
  }
`;

const add_message = gql`
  mutation addPrivateMessage($id: ID!, $text: String!, $chatroom_id: ID!) {
    addPrivateMessage(id: $id, text: $text, chatroom_id: $chatroom_id) {
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
  const uuid = uuidv4();

  const {data: countries_data} = useQuery(countries);
  const [addMessage, {data: add_message_data}] = useOfflineMutation(
    add_message,
  );

  console.log(countries_data, 'countries_data');
  console.log(add_message_data, 'add_message_data');

  const handleAddMessage = () => {
    try {
      addMessage({
        variables: {
          id: uuid,
          chatroom_id: '6adf54ac-3a19-49a6-9b6b-fb01cdafb77e',
          text: 'hello',
        },
        // optimisticResponse: createOptimisticResponse({
        //   idField: 'id',
        // }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>HomeScreen</Text>

      <Button
        title="go to tabs"
        onPress={() => props.navigation.replace('TabsScreen')}
      />

      <Button title="add message" onPress={handleAddMessage} />
    </View>
  );
};

export default React.memo(HomeScreen);
