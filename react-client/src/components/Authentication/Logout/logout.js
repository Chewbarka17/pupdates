import { LoginManager, AccessToken } from 'react-native-fbsdk';
import {
  Text,
  View
} from 'react-native';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SplashPageView from '../../Splash/splashPageView';
import * as ownerActions from '../../../actions/Profiles/ownerActions';

class LogoutScreen extends React.Component {

  constructor(props) {
    super(props);

    this.navigateToHome = this.navigateToHome.bind(this);
  }
  
  componentDidMount() {
    AccessToken.getCurrentAccessToken()
    .then(data => {
      let accessToken = data.accessToken;
      if (accessToken !== null) {
        LoginManager.logOut();
        this.props.actions.logOut();
        this.navigateToHome();
      }
    })
    .catch(error => {
      this.props.actions.logOutFailure(error);
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

const ownerDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(ownerActions, dispatch),
  }
};

export default connect(null, ownerDispatch)(LogoutScreen);
