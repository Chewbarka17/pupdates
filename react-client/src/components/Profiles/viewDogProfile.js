import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

class viewDogProfile extends Component {
  static navigationOptions = {
    title: 'ViewDogProfile',
  };
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    this.props.navigation.navigate('EditDogProfile');
  }

  render () {
    return (
      <View>
        <Button 
        title='Edit'
        onPress={this.handlePress}
        />
      </View>
    )
  }
}

const DogState = (store) => {
  return {
    // user: store.User.
  }
}

export default viewDogProfile;