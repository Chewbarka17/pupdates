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
import SplashPageView from '../Splash/splashPageView';

import LikesScreen from '../Likes/likedDogsView';
import FilterScreen from '../FilterDog/filterDog';
import LogoutScreen from '../Logout/Logout';
import ChatsScreen from '../Messages/chatList';
import ViewOwnerProfileScreen from '../Profiles/viewOwnerProfile';
import ViewDogProfileScreen from '../Profiles/viewDogProfile';
import EditDogProfileScreen from '../Profiles/editDogProfile';
import DogProfileScreen from '../Likes/likedDogProfile';
import DrawerMenuScreen from '../Navbar/drawerNav';
import LogoutScreen from '../Logout/Logout';
import SignupScreen from '../Signup/Signup';

class MenuScreen extends React.Component {
    static navigationOptions = {
      title: 'Splash Page Home',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
          <View>
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
        </View>
        <Text>
           
        </Text>
        <Text>
          logging in will auto navigate to View Dogs
        </Text>
      </View>
          <Button
            title="Dogs (with drawer nav)"
            onPress={() =>
              navigate('DrawerMenu')
            }
          />
          <Button
            title="Signup"
            onPress={() =>
              navigate('Signup')
            }
          />
        </View>
      );
    }
  }

const NavigationApp = StackNavigator({
  Menu: { screen: MenuScreen },
  Dogs: { screen: ViewDogsScreen },
  Likes: { screen : LikesScreen },
  Filter: { screen : FilterScreen },
  //Profile: { screen : OwnerProfileScreen },
  Logout: { screen: LogoutScreen },
  Chats: { screen: ChatsScreen },
  ViewOwnerProfile: { screen: ViewOwnerProfileScreen },
  ViewDogProfile: { screen: ViewDogProfileScreen },
  EditDogProfile: { screen: EditDogProfileScreen },
  DogProfile: { screen: DogProfileScreen },
  DrawerMenu: { screen: DrawerMenuScreen },
  SplashPage: { screen: SplashPageView },
  Signup: { screen: SignupScreen }
});

export default NavigationApp;