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
    const { navigation } = this.props;
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
        <LoginScreen navigation={navigation}/>
      </View>
    );
  }
}

export default SplashPage;