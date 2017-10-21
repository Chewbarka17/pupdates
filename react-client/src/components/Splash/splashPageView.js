import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
//import { StackNavigator } from 'react-navigation';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ViewDogsScreen from '../ViewDogs/doglist';

class splashPageView extends React.Component {
  static navigationOptions = {
    title: 'Splash Page Home'
  };
  render() {
    //const { navigate } = this.props.navigation;
    return (
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
    );
  }
}

export default splashPageView;