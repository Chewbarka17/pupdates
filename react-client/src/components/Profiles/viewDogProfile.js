import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import * as dogActions from '../../actions/Profiles/dogProfileActions';

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

const dogsState = (store) => {
  return {
    dogs: store.Dogs.dogsInfo
  }
}

const dogDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(dogActions, dispatch),
  }
};

export default connect(dogsState, dogDispatch)(viewDogProfile);