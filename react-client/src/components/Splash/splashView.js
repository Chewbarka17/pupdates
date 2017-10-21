import React from 'react';
import { Button, Text, Platform, ScrollView, StyleSheet } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import FirstScreen from '../Splash/FirstScreen';
import SecondScreen from '../Splash/SecondScreen';

const DrawerExample = DrawerNavigator(
  {
    First: {
      path: '/',
      screen: FirstScreen,
    },
      Second: {
        path: '/sent',
        screen: SecondScreen,
      },
  },
  {
    initialRouteName: 'First',
    drawerPosition: 'left'
  }
);

export default DrawerExample;