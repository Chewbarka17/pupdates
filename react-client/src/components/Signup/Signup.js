const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken
} = FBSDK;

import React, { Component } from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';
import {
  Text,
  View,
  AsyncStorage,
} from 'react-native';

import { SocialIcon, FormLabel, FormInput } from 'react-native-elements';
import axios from 'axios';

class SignupScreen extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount = () => {
    // const navigateAction = NavigationActions.navigate({
    //   routeName: 'Dogs',
    // });
    AccessToken.getCurrentAccessToken()
    .then(data => {
      let accessToken = data.accessToken;
      if (accessToken !== null) {
        this._getPublicProfile();
        alert('Access Token');
        this.props.navigation.navigate('Dogs');
        // this.props.navigation.dispatch(navigateAction);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  _fbAuth = () => {
    LoginManager.logInWithReadPermissions(['public_profile'])
    .then((result) => {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          this._getPublicProfile();
        }
    })
    .catch((error) => {
        alert('Login fail with error: ' + error);
    });
  }

  _getPublicProfile = () => {
    AccessToken.getCurrentAccessToken()
    .then(data => {
      let accessToken = data.accessToken;

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
    })
    .catch(error => {
      console.log(error);
    });
  // end getPublicProfile
  }

  _checkUserInDB = (fb) => {
    // if user not in db add to db
      // navigate to view dogs
    console.log('facebook', fb);

    axios.get('http://localhost:8000/api/users/' + fb.id)
    .then(({data}) => {
      console.log('User retrieved from data base', data);
      AsyncStorage.setItem('mongoOwner', JSON.stringify(data), (error) => {
        if (error) {
          alert('Failure! Could not save user to async storage', error);
        }
      });
    })
    .catch((err) => {
      console.log('User not in db, adding user to db', err)
      this._addUserToDB(fb);
    });

  }

  _addUserToDB = (fb) => {
    const user = {
      fb_id: fb.id,
      name: fb.name,
      picture: fb.picture.data.url
    }
    axios.post('http://localhost:8000/api/users', user)
    .then(({data}) => {
      console.log(data);
      AsyncStorage.setItem('mongoOwner', JSON.stringify(data), (error) => {
        if (error) {
          alert('Failure! Could not save user to async storage', error);
        }
      });
    })
    .catch((err) => {
      console.log(err)
    });
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
  // end of class
}

export default SignupScreen;
