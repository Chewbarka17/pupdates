const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken
} = FBSDK;

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StackNavigator, NavigationActions } from 'react-navigation';
import {
  Text,
  View,
  AsyncStorage,
} from 'react-native';

import { SocialIcon, FormLabel, FormInput } from 'react-native-elements';
import axios from 'axios';
import * as authActions from '../../../actions/Authentication/authActions';

class LoginScreen extends Component {
  constructor(props){
    super(props);
  }

  _fbAuth = () => {
    AccessToken.getCurrentAccessToken()
    .then(data => {
      let accessToken = data.accessToken;
      if (accessToken !== null) {
        this._getPublicProfile(accessToken);
      }
    })
    .catch(error => {
      LoginManager.logInWithReadPermissions(['public_profile'])
      .then((result) => {
          if (result.isCancelled) {
            alert('Login cancelled');
          } else {
            AccessToken.getCurrentAccessToken()
            .then(data => {
              let accessToken = data.accessToken;
                this._getPublicProfile(accessToken);
              
            });
          }
      })
      .catch((error) => {
          alert('Login fail with error: ' + error);
      });
    });
  }

  _getPublicProfile = (accessToken) => {
    const responseInfoCallback = (error, data) => {
      if (error) {
        alert('Error fetching data: ' + error.toString());
      } else {
        this._checkUserInDB(data);
      }
    }

    const fb_params = {
      accessToken: accessToken,
      parameters: {
        fields: {
          string: 'id, name, first_name, last_name, picture'  
        }
      },
    }

    const infoRequest = new GraphRequest('/me', fb_params, responseInfoCallback);
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  _checkUserInDB = (fb) => {
    this.props.actions.getOwner(fb, this.props.navigate);
  }

  render() {
    return (
      <View>
        <SocialIcon onPress={this._fbAuth}
          title='Sign In With Facebook'
          button
          type='facebook'
        />
      </View>
    );
  }
} // end of class

const authState = (store) => {
  return {
    auth: store.Auth.ownerInfo
  }
}

const authDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch),
  }
};

export default connect(authState, authDispatch)(LoginScreen);
