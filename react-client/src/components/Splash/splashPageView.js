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
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={[styles.boxContainer, styles.boxOne]}>
          <Image
            style={{width:430, height:430, marginLeft:25}}
            source={require('../../../images/largePinkLogo.png')}
          />
        </View>
        <View style={[styles.boxContainer, styles.boxTwo]}>
          <Image
            style={{width:430, height:430}}
            source={require('../../../images/splashHeartsCorgi.gif')}
          />
        </View>
        <View style={[styles.boxContainer, styles.boxThree]}>
          <LoginScreen navigate={navigate}/>
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
    flex: 4,
  },
  boxTwo: {
    flex: 4,
  },
  boxThree: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default SplashPage;