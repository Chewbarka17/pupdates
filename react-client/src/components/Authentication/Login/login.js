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

  componentWillMount() {
    // AccessToken.getCurrentAccessToken()
    // .then(data => {
    //   let accessToken = data.accessToken;
    //   if (accessToken !== null) {
    //     this._getPublicProfile(accessToken);
    //   }
    // })
    // .catch(error => {
    // });
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
        // utils.checkUserInDB(data, this.props.navigate);
        // console.log('what utils', utils);
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
    // if user not in db add to db
      // navigate to view dogs
    // console.log('facebook', fb);
    // this.props.actions.getOwner(fb, this.props.navigate, this._addUserToDB);
    this.props.actions.getOwner(fb, this.props.navigate);
    // axios.get('http://localhost:8000/api/users/' + fb.id)
    // .then(({data}) => {
    //   console.log('User retrieved from data base', data);
    //   if (data.length === 0) {
    //     this._addUserToDB(fb);
    //   } else {
    //     // dispatch({type: 'GET_OWNER_FROM_MONGO_FULFILLED', payload: data});
    //     AsyncStorage.setItem('mongoOwner', JSON.stringify(data), (error) => {
    //       if (error) {
    //         alert('Failure! Could not save user to async storage', error);
    //       }
    //     });
    //     this.props.navigate('DrawerMenu');
    //   }
      
    // })
    // .catch((err) => {
    //   // dispatch({type: 'GET_OWNER_FROM_MONGO_REJECTED', payload: err});
    //   console.log('User not in db, adding user to db', err)
    //   this._addUserToDB(fb);
    // });
  }

  // _addUserToDB = (fb) => {
  //   const user = {
  //     fb_id: fb.id,
  //     name: fb.name,
  //     picture: fb.picture.data.url
  //   }
  //   console.log('add user to db', user);
  //   axios.post('http://localhost:8000/api/users', user)
  //   .then(({data}) => {
  //     console.log(data);
  //     // dispatch({type: 'POST_OWNER_FROM_MONGO_FULFILLED', payload: data});
  //     AsyncStorage.setItem('mongoOwner', JSON.stringify(data), (error) => {
  //       if (error) {
  //         alert('Failure! Could not save user to async storage', error);
  //       }
  //     });
  //     this.props.navigate('DrawerMenu');
  //   })
  //   .catch((err) => {
  //     // dispatch({type: 'POST_OWNER_FROM_MONGO_REJECTED', payload: err});
  //     console.log(err);
  //   });
  // }

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
