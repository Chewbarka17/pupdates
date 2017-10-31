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

import * as dogActions from '../../actions/Profiles/dogProfileActions';

class AddDogProfile extends Component {
  static navigationOptions = {
    title: 'AddDogProfile',
  };
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age: '',
      breed: '',
      owner: '',
      gender: '',
      bio: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  };

  handleSubmit() {
    const { name, age, breed, gender, bio, actions } = this.state;
    this.props.actions.postDogs(name, age, breed, gender, bio, this.props.userId);
    this.props.navigation.navigate('ViewOwnerProfile');
  }

  render() {
    console.log('what is props: ', this.props);
    const { navigate } = this.props.navigation;
    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={'enter'}
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
          placeholder={'enter'}
          returnKeyType="next"
          id="age"
          onChangeText={age => this.setState({ age })}
        />
        <FormLabel>Breed</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={'enter'}
          returnKeyType="next"
          id="breed"
          onChangeText={breed => this.setState({ breed })}
        />
        <FormLabel>Gender</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={'enter'}
          returnKeyType="next"
          id="gender"
          onChangeText={gender => this.setState({ gender })}
        />
        <FormLabel>Bio</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={'enter'}
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

  const dogState = (store) => {
    return {
      userId: store.Owners.user._id
    }
  }

  const dogDispatch = (dispatch) => {
    return {
      actions: bindActionCreators(dogActions, dispatch),
    }
  };

  export default connect(dogState, dogDispatch)(AddDogProfile);
