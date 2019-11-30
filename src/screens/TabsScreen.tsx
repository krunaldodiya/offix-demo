import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text, View} from 'react-native';

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

const TabsScreen = (props: any) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator lazy={true} initialRouteName="FeedsScreen">
      <Tab.Screen name="FeedsScreen" component={FeedsScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default React.memo(TabsScreen);
