// TODO:
// styling

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';

import LoginScreen from '../Authentication/Login/login';

class SplashPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("splashpage this.props: ", this.props); // {empty}
    console.log("splashpage this.props.navigation: ", this.props.navigation); // undefined 
    console.log("splashpage this.state: ", this.state); // null
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

export default SplashPage;