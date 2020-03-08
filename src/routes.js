import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const { Navigator, Screen } = createStackNavigator();

function Routes() {
  return (
    <Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
      }}
    >
      <Screen
        name="Main"
        component={Main}
        options={{
          title: 'Usuários',
        }}
      />
      <Screen name="User" component={User} />
    </Navigator>
  );
}

export default Routes;
