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

class EditDogProfile extends Component {
  static navigationOptions = {
    title: 'EditDogProfile',
  };
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age: '',
      breed: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  };

  handleSubmit() {
    const { name, age, breed } = this.state;
    let nameCheck = name || this.props.name;
    let ageCheck = age || this.props.age;
    let breedCheck = breed || this.props.breed;
    console.log(nameCheck, ageCheck, breedCheck, this.props.id);
    this.props.actions.updateDogs(nameCheck, ageCheck, breedCheck, this.props.id);
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log('PROPS: ', this.props);
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
        <FormLabel>Breed</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={this.props.breed || 'enter'}
          returnKeyType="next"
          id="zipcode"
          onChangeText={breed => this.setState({ breed })}
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
      name: store.Dogs.dogs[0].name,
      age: store.Dogs.dogs[0].age,
      breed: store.Dogs.dogs[0].breed,
      id: store.Dogs.dogs[0]._id,
      userId: store.Auth.ownerInfo[0]._id
    }
  }

  const dogDispatch = (dispatch) => {
    return {
      actions: bindActionCreators(dogActions, dispatch),
    }
  };

  export default connect(dogState, dogDispatch)(EditDogProfile);
