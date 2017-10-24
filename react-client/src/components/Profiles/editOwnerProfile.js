import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
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

class EditOwnerProfile extends Component {
  static navigationOptions = {
    title: 'EditProfile',
  };
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age: '',
      location: '',
      bio: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  };

  handleSubmit() {
    const { name, age, location, bio } = this.state;
    console.log('props: ', this.props.userId)
    this.props.actions.updateOwners(name, age, location, bio, this.props.userId);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={this.props.name || 'enter'}
          returnKeyType="next"
          id="name"
          onChangeText={name => this.setState({ name })}
        />
        <FormLabel>Age</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={this.props.age ? this.props.age.toString() : 'enter'}
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
          placeholder={this.props.location || 'enter'}
          returnKeyType="next"
          id="zipcode"
          onChangeText={location => this.setState({ location })}
        />
        <FormLabel>Bio</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={this.props.bio || 'enter'}
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
      name: store.Owners.user.name,
      age: store.Owners.user.age,
      location: store.Owners.user.location,
      bio: store.Owners.user.bio,
      userId: store.Auth.ownerInfo[0]._id
    }
  }

  const ownerDispatch = (dispatch) => {
    return {
      actions: bindActionCreators(ownerActions, dispatch),
    }
  };

  export default connect(ownerState, ownerDispatch)(EditOwnerProfile);
