import { LoginManager, AccessToken } from 'react-native-fbsdk';
import {
  Text,
  View
} from 'react-native';
import React, { Component } from 'react';
import { StackNavigator} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SplashPageView from '../../Splash/splashPageView';

class LogoutScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Logout',
    drawerIcon: ({tintColor}) => {
      return (
        <MaterialIcons
          name="exit-to-app"
          size={24}
          style={{color: tintColor}}
        >
        </MaterialIcons>
      );
    }
  }
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    // logic to logout
    AccessToken.getCurrentAccessToken()
    .then(data => {
      let accessToken = data.accessToken;
      if (accessToken !== null) {
        LoginManager.logOut();
        this.props.navigation.navigate('Menu');
      }
    })
    .catch(error => {
      this.props.navigation.navigate('Menu');
    });
  }

  render() {
    return (
      <View></View>
    )
  }
}

export default LogoutScreen;