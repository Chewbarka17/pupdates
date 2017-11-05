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
    return (
      <View>
        <Image
          style={{width:380, height:250, backgroundColor:'#e45c7d'}}
          source={require('../../../images/longPinkLogo.png')}
        />
        <Image
          style={{width:400, height:351, backgroundColor:'#e45c7d'}}
          source={require('../../../images/splashHeartsCorgi.gif')}
        />
        <View style={{backgroundColor:'#e45c7d'}}>
          <LoginScreen />
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  boxContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e45c7d',
  },
  boxOne: {
    flex: 1,
    backgroundColor: '#e45c7d',
  },
  boxTwo: {
    flex: 1,
    backgroundColor: '#e45c7d',
  },
  boxThree: {
    flex: 1,
    backgroundColor: 'white',
    backgroundColor: '#e45c7d',
  },
});

export default SplashPage;