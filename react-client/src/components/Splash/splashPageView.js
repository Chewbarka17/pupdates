// TODO:
// remove button
// styling

import React, { Component } from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';

import ViewDogsScreen from '../ViewDogs/doglist';
import DrawerMenuScreen from '../Navbar/drawerNav';
import LikesScreen from '../Likes/likedDogsView';
import FilterScreen from '../FilterDog/filterDog';
import LogoutScreen from '../Authentication/Logout/logout';
import LoginScreen from '../Authentication/Login/login';
import ChatsScreen from '../Messages/chatList';
import ChatRoomScreen from '../Messages/chatRoom';
import ViewOwnerProfileScreen from '../Profiles/viewOwnerProfile';
import ViewDogProfileScreen from '../Profiles/viewDogProfile';
import AddDogProfileScreen from '../Profiles/addDogProfile';
import DogProfileScreen from '../Likes/likedDogProfile';
import EditDogProfileScreen from '../Profiles/editDogProfile';
import EditOwnerProfileScreen from '../Profiles/editOwnerProfile'
import Maps from '../Profiles/maps';

class SplashPage extends React.Component {
  static navigationOptions = {
    title: 'Splash Page Home',
  };

  constructor() {
    super();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <Image
          style={{width: 390, height: 160}}
          source={require('./whiteBlueLogo.png')}
        />
        <Image
          style={{width: 380, height: 240}}
          source={require('./laptopCorgi.gif')}
        />
        <LoginScreen navigate={navigate}/>
      </View>
    );
  }
}

// style={{width: 200, height: 140}}

// style={{flex:1, height: undefined, width: undefined}}
// resizeMode="contain"

const NavigationApp = StackNavigator({
  Menu: {
    screen: SplashPage,
    navigationOptions: {
      header: null,
    }
  },
  DrawerMenu: { screen: DrawerMenuScreen },
  Dogs: { screen: ViewDogsScreen },
  Likes: { screen : LikesScreen },
  Filter: { screen : FilterScreen },
  Logout: { screen: LogoutScreen },
  Chats: { screen: ChatsScreen },
  ChatRoom: { screen: ChatRoomScreen},
  ViewOwnerProfile: { screen: ViewOwnerProfileScreen },
  ViewDogProfile: { screen: ViewDogProfileScreen },
  AddDogProfile: { screen: AddDogProfileScreen },
  DogProfile: { screen: DogProfileScreen },
  EditDogProfile: { screen: EditDogProfileScreen },
  EditOwnerProfile: { screen: EditOwnerProfileScreen},
  Maps: { screen: Maps },
});

export default NavigationApp;