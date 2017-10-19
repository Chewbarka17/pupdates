import React, { Component } from 'react';
import { StackNavigator} from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ownerActions from '../../actions/Profiles/ownerActions';

class OwnerProfileScreen extends React.Component {
    static navigationOptions = {
      title: 'Profile',
    };
    constructor(props) {
      super(props);

      this.state = {
        firstname: '',
        lastname: '',
        age: '',
        zipcode: '',
      };

      this.handleSubmit = this.handleSubmit.bind(this);

    };

    handleSubmit() {
      const { firstname, lastname, age, zipcode, bio, actions } = this.state;
      console.log('what is this', this)
      this.props.actions.postOwners(firstname, lastname, age, zipcode);
    }

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
            id="firstname"
            onChangeText={firstname => this.setState({ firstname })}
          />
          <FormLabel>Last Name</FormLabel>
          <FormInput
            editable
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholder="Enter your Last Name"
            returnKeyType="next"
            id="lastname"
            onChangeText={lastname => this.setState({ lastname })}
          />
          <FormLabel>Age</FormLabel>
          <FormInput
            editable
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholder="Enter your Age"
            returnKeyType="next"
            id="age"
            onChangeText={age => this.setState({ age })}
          />
          <FormLabel>Zipcode</FormLabel>
          <FormInput
            editable
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholder="Enter your Zipcode"
            returnKeyType="next"
            id="zipcode"
            onChangeText={zipcode => this.setState({ zipcode })}
          />
          <FormLabel>Bio</FormLabel>
          <FormInput
            editable
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholder="Enter your Bio"
            returnKeyType="next"
            id="bio"
            onChangeText={bio => this.setState({ bio })}
          />
          <Button
            title="Save"
            onPress={this.handleSubmit}
            />
        </View>
      );
    }
  }

  const ownerState = (store) => {
    return {
      firstname: store.Owners.user.firstname,
      lastname: store.Owners.user.lastname,
      age: store.Owners.user.age,
      zipcode: store.Owners.user.zipcode,
      bio: store.Owners.user.bio
    }
  }

  const ownerDispatch = (dispatch) => {
    return {
      actions: bindActionCreators(ownerActions, dispatch),
    }
  };

  export default connect(ownerState, ownerDispatch)(OwnerProfileScreen);
