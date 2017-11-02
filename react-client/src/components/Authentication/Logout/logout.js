import { LoginManager, AccessToken } from 'react-native-fbsdk';
import {
  Text,
  View
} from 'react-native';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SplashPageView from '../../Splash/splashPageView';

class LogoutScreen extends React.Component {
  // static navigationOptions = {
  //   drawerLabel: 'Logout',
  //   drawerIcon: ({tintColor}) => {
  //     return (
  //       <MaterialIcons
  //         name="exit-to-app"
  //         size={24}
  //         style={{color: tintColor}}
  //       >
  //       </MaterialIcons>
  //     );
  //   }
  // }
  constructor(props) {
    super(props);

    this.navigateToHome = this.navigateToHome.bind(this);
  }
  
  componentDidMount() {
    // logic to logout
    AccessToken.getCurrentAccessToken()
    .then(data => {
      let accessToken = data.accessToken;
      if (accessToken !== null) {
        LoginManager.logOut();
        this.navigateToHome();
      }
    })
    .catch(error => {
      this.navigateToHome();
    });
  }

  navigateToHome() {
    const navigateToHome = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Home'})
      ]
    });
    this.props.navigation.dispatch(navigateToHome);
  }

  render() {
    return (
      <View></View>
    )
  }
}

export default LogoutScreen;