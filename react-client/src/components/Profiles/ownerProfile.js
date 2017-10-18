import React, { Component } from 'react';
import { StackNavigator} from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

class OwnerProfileScreen extends React.Component {
    static navigationOptions = {
      title: 'Profile',
    };
    constructor(props) {
      super(props);
  
      this.state = {
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
      };
    };

    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
          <FormLabel>First Name</FormLabel>
          <FormInput
            editable
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholder="Enter your First Name"
            returnKeyType="next"
            ref="firstname"
            textInputRef="firstnameInput" 
          />
          <FormLabel>Last Name</FormLabel>
          <FormInput
            editable
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholder="Enter your Last Name"
            returnKeyType="next"
            ref="lastname"
            textInputRef="lastnameInput" 
          />
          <FormLabel>Age</FormLabel>
          <FormInput
            editable
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholder="Enter your Age"
            returnKeyType="next"
            ref="age"
            textInputRef="ageInput" 
          />
          <FormLabel>Zipcode</FormLabel>
          <FormInput
            editable
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholder="Enter your Zipcode"
            returnKeyType="next"
            ref="zipcode"
            textInputRef="zipcodeInput" 
          />
        </View>
      );
    }
  }

  export default OwnerProfileScreen;