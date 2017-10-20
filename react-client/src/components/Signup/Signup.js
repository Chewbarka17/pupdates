const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken
} = FBSDK;

import React, { Component } from 'react';
// import { StackNavigator} from 'react-navigation';
import {
  // Platform,
  // StyleSheet,
  Text,
  View,
  // TouchableOpacity
} from 'react-native';

import { SocialIcon } from 'react-native-elements';

const _fbAuth = () => {
  let that = this;

  
  LoginManager.logInWithReadPermissions(['public_profile'])
  .then(
    (result) => {
      // console.log('fbauth loginmanager .then', result)
      console.log('what is this, promise', that);
      if (result.isCancelled) {
        alert('Login cancelled');
      } else {
        console.log('what is this, fbauth', that);
        alert('Login success with permissions: '
          +result.grantedPermissions.toString());
        hello();
        getPublicProfile();
        // this.hello();
        // route user on success to view dogs
        console.log('end of loginmanager .then')
      }
    })
    .catch(
    (error) => {
      alert('Login fail with error: ' + error);
    }
  );
}

const getPublicProfile = () => {
  console.log('public profile');
  AccessToken.getCurrentAccessToken()
    .then(data => {
      let accessToken = data.accessToken;
      alert(accessToken.toString());
    });
  }

const hello = () => {
  console.log('hello has been pressed');
} 
  // const responseInfoCallback = (error, result) => {
  //   if (error) {
  //     console.log(error)
  //     alert('Error fetching data: ' + error.toString());
  //   } else {
  //     console.log(result)
  //     alert('Success fetching data: ' + result.toString());
  //   }
  // }
  
  // const infoRequest = new GraphRequest(
  //   '/me',
  //   {
  //     accessToken: accessToken,
  //     parameters: {
  //       fields: {
  //         string: 'id, cover, name, first_name, last_name, locale, picture'  
  //       }
  //     }
  //   },
  //   responseInfoCallback
  // );

  // new GraphRequestManager().addRequest(infoRequest).start()
              
const SignupScreen = (props) => {
// render() {
  return (
    <View>
      <SocialIcon onPress={_fbAuth}
        title='Sign In With Facebook'
        button
        type='facebook'
      />
    </View>
  );
  // }
};

export default SignupScreen;