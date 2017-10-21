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
  Dogs: { screen: ViewDogsScreen }
});

export default NavigationApp;