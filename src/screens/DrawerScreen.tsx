import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {Text, View} from 'react-native';

const ProfileScreen = (props: any) => {
  return (
    <View>
      <Text>hello</Text>
    </View>
  );
};

const DrawerScreen = (props: any) => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator drawerType="front" lazy={true}>
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default React.memo(DrawerScreen);
