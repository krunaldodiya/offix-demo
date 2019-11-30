import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';
import {Button, Text, View} from 'react-native';

const countries = gql`
  query Countries {
    countries {
      id
    }
  }
`;

const HomeScreen = (props: any) => {
  const {data: countries_data} = useQuery(countries);

  console.log(countries_data, 'countries_data');

  return (
    <View>
      <Text>HomeScreen</Text>

      <Button
        title="go to tabs"
        onPress={() => props.navigation.replace('TabsScreen')}
      />
    </View>
  );
};

export default React.memo(HomeScreen);
