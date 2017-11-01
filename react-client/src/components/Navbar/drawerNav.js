import React from 'react';
import { Button, Text, Platform, ScrollView, StyleSheet, Image } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import ViewDogsScreen from '../ViewDogs/doglist';
import LikesScreen from '../Likes/likedDogsView';
import ViewOwnerProfileScreen from '../Profiles/viewOwnerProfile';
import ChatsScreen from '../Chat/chatList';
import LogoutScreen from '../Authentication/Logout/logout';

const DrawerExample = DrawerNavigator(
  {
    Dogs: {
      path: '/',
      screen: ViewDogsScreen,
    },
    Likes: {
      path: '/',
      screen: LikesScreen,
    },
    viewProfile: {
      path: '/',
      screen: ViewOwnerProfileScreen,
    },
    Chat: {
      path: '/',
      screen: ChatsScreen,
    },
    Logout: {
      path: '/',
      screen: LogoutScreen,
    },
  },
  {
    initialRouteName: 'Dogs',
    drawerPosition: 'left',
  },
);

export default DrawerExample;
