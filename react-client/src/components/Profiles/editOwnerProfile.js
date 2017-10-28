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
      bio: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  };

  handleSubmit() {
    const { name, age, bio } = this.state;
    let nameCheck = name || this.props.name;
    let ageCheck = age || this.props.age;
    let bioCheck = bio || this.props.bio;

    this.props.actions.updateOwners(nameCheck, ageCheck, this.props.location, bioCheck, this.props.userId, this.props.coords);
  }

  render() {
    console.log('what are props: ', this.props);
    const { navigate } = this.props.navigation;
    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={this.props.name || 'enter your name'}
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
          placeholder={this.props.age ? this.props.age.toString() : 'enter your age'}
          returnKeyType="next"
          id="age"
          onChangeText={age => this.setState({ age })}
        />
        <FormLabel>Bio</FormLabel>
        <FormInput
          editable
          autoCorrect={true}
          underlineColorAndroid="transparent"
          placeholder={this.props.bio || 'enter a bio'}
          returnKeyType="next"
          id="bio"
          onChangeText={bio => this.setState({ bio })}
        />
        <Text>
          Your coordinates have been saved as: Latitude: {this.props.latitude}, Longitude: {this.props.longitude}
        </Text>
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
      latitude: store.Owners.userLocation.latitude,
      longitude: store.Owners.userLocation.longitude,
      location: store.Owners.user.location,
      bio: store.Owners.user.bio,
      userId: store.Owners.user._id,
      coords: store.Owners.user.coords,
    }
  }

  const ownerDispatch = (dispatch) => {
    return {
      actions: bindActionCreators(ownerActions, dispatch),
    }
  };

  export default connect(ownerState, ownerDispatch)(EditOwnerProfile);
