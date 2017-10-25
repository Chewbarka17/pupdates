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
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import awsmobile from '../../../../../config/aws-exports';
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
        console.log('current access token', accessToken);
        AWS.config.region = awsmobile.aws_cognito_region;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: awsmobile.aws_cognito_identity_pool_id,
          Logins: {
            'graph.facebook.com': accessToken
          }
        });

        AWS.config.credentials.get(() => {
          const accessKeyId = AWS.config.credentials.accessKeyId;
          const secretAccessKey = AWS.config.credentials.secretAccessKey;
          const sessionToken = AWS.config.credentials.sessionToken;
          console.log(AWS.config.credentials);
          console.log('accessKeyId', accessKeyId);
          console.log('secretAccessKey', secretAccessKey);
          console.log('sessionToken', sessionToken);
        });

        // AWS.config.update({
        //   region: awsmobile.aws_user_files_s3_bucket_region,
        //   credentials: new AWS.CognitoIdentityCredentials({
        //     IdentityPoolId: awsmobile.aws_cognito_identity_pool_id,
        //     Logins: {
        //       'graph.facebook.com': accessToken
        //     }
        //   })
        // });
        const s3 = new AWS.S3({
          apiVersion: '2012-10-17',
        });
        const params = {
          Bucket: awsmobile.aws_user_files_s3_bucket,
          Key: "example-image.png"
        }

        s3.getObject(params, (error) => {
          if (error) {
            console.log(error, error.stack);
          } else {
            console.log('what is in s3', data);
          }
        })
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
              AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:2642e269-63f6-47e8-9ce7-4c0b382625e0',
                Logins: {
                  'graph.facebook.com': accessToken
                }
              });

              AWS.config.credentials.get((error) => {
                // if (!error) {
                //   let id = AWS.config.credentials.ide
                // }
                console.log(AWS.config.credentials);
              });
              

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

  _awsCredentials

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
