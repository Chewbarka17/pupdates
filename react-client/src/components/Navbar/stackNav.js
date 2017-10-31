import { TabNavigator, StackNavigator } from "react-navigation";
import React, { Component } from 'react';

import SplashPageView from '../Splash/splashPageView';
import Login from '../Authentication/Login/login';
import TabBar from '../Navbar/tabBar';
import likedDogProfile from '../Likes/likedDogProfile'
import ChatRoom from '../Messages/chatRoom';
import EditOwnerProfile from '../Profiles/editOwnerProfile';
import AddDogProfile from '../Profiles/addDogProfile';
import ViewDogProfile from '../Profiles/viewDogProfile';
import EditDogProfile from '../Profiles/editDogProfile';
import LogoutScreen from '../Authentication/Logout/logout';

const SimpleApp = StackNavigator({
  Home: { 
    screen: SplashPageView,
    navigationOptions: {
      header: null,
    },
  },
  TabBar: {screen: TabBar,
    navigationOptions: {
      header: null,
    }
  },
  LikedDogProfile: { screen: likedDogProfile },
  ChatRoom: { screen: ChatRoom },
  EditOwnerProfile: {screen: EditOwnerProfile},
  AddDogProfile: {screen: AddDogProfile},
  ViewDogProfile: {screen: ViewDogProfile},
  EditDogProfile: {screen: EditDogProfile},
  LogoutScreen: {screen: LogoutScreen},
});

export default SimpleApp;