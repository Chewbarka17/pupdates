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
// import * as authActions from '../../../actions/Authentication/authActions';
import * as ownerActions from '../../../actions/Profiles/ownerActions';

class LoginScreen extends Component {
  constructor(props){
    super(props);
    this._fbAuth = this._fbAuth.bind(this);
    this._getPublicProfile = this._getPublicProfile.bind(this);
  }

  componentDidMount() {
    AccessToken.getCurrentAccessToken()
    .then(data => {
      let accessToken = data.accessToken;
      if (accessToken !== null) {
        // console.log('current access token', accessToken);
        this._getAwsSecretSauce(accessToken);
        this._getPublicProfile(accessToken);
      }
    })
    .catch(error => {
      console.log('fb auth', error);
    });
  }

  _fbAuth() {
    AccessToken.getCurrentAccessToken()
    .then(data => {
      let accessToken = data.accessToken;
      if (accessToken !== null) {
        // console.log('current access token', accessToken);
        this._getAwsSecretSauce(accessToken);
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
            this._getAwsSecretSauce(accessToken);
            this._getPublicProfile(accessToken);
          });
        }
      })
      .catch((error) => {
        alert('Login fail with error: ' + error);
      });
    });
  }

  _getAwsSecretSauce = (accessToken) => {
    AWS.config.region = awsmobile.aws_cognito_region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: awsmobile.aws_cognito_identity_pool_id,
      Logins: {
        'graph.facebook.com': accessToken
      }
    });
    let accessKeyId;
    let secretAcessKey;
    let sessionToken;
    AWS.config.credentials.get(() => {
      accessKeyId = AWS.config.credentials.accessKeyId;
      secretAccessKey = AWS.config.credentials.secretAccessKey;
      sessionToken = AWS.config.credentials.sessionToken;
      this.props.actions.saveAwsSecretSauce(accessKeyId, secretAccessKey, sessionToken);
    });
    
    // const s3 = new AWS.S3({
    //   accessKeyId: accessKeyId,
    //   secretAccessKey: secretAcessKey,
    //   sessionToken: sessionToken
    // });
    // console.log('then here');
    // const params = {
    //   Bucket: awsmobile.aws_user_files_s3_bucket,
    //   Key: "public/bordercolliesmile.jpg"
    // }

    // s3.getSignedUrl('getObject', params, (error, data) => {
    //   if (error) {
    //     console.log(error, error.stack);
    //   } else {
    //     console.log('what is in s3', data);
    //   }
    // })
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
    this.props.actions.getOwnerFromDB(fb, this.props.navigate, (error) => {
      console.log('check user', error);
      if (error) {
        this.props.actions.addOwnerToDB(fb, this.props.navigate);
      }
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
} // end of class

const ownerDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(ownerActions, dispatch),
  }
};

// const authDispatch = (dispatch) => {
//   return {
//     actions: bindActionCreators(authActions, dispatch),
//   }
// };

export default connect(null, ownerDispatch)(LoginScreen);
