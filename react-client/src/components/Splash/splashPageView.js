import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
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
import LogoutScreen from '../Logout/Logout';
import ChatsScreen from '../Messages/chatList';
import ViewOwnerProfileScreen from '../Profiles/viewOwnerProfile';
import ViewDogProfileScreen from '../Profiles/viewDogProfile';
import AddDogProfileScreen from '../Profiles/addDogProfile';
import DogProfileScreen from '../Likes/likedDogProfile';

class SplashPage extends React.Component {
  static navigationOptions = {
    title: 'Splash Page Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>
          Pupdates logo!
        </Text>
        <Image
          style={{width: 200, height: 140}}
          source={{uri: 'https://en.fontke.com/d/file/content/2017/02/5895352e54002.gif'}}
        />
        <Text>
          Sign Up
        </Text>
        <Text>
          Login with FB
        </Text>
        <Text>  
        </Text>
        <Text>
          logging in will auto navigate to View Dogs
        </Text>
        <Button
          title="Dogs (with drawer nav)"
          onPress={() =>
            navigate('DrawerMenu')
          }
        />
      </View>
    );
  }
}

const NavigationApp = StackNavigator({
  Menu: { screen: SplashPage },
  DrawerMenu: { screen: DrawerMenuScreen },
  Dogs: { screen: ViewDogsScreen },

  Likes: { screen : LikesScreen },
  Filter: { screen : FilterScreen },
  Logout: { screen: LogoutScreen },
  Chats: { screen: ChatsScreen },
  ViewOwnerProfile: { screen: ViewOwnerProfileScreen },
  ViewDogProfile: { screen: ViewDogProfileScreen },
  AddDogProfile: { screen: AddDogProfileScreen },
  DogProfile: { screen: DogProfileScreen },
});

export default NavigationApp;