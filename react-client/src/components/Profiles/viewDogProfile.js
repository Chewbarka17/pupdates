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
     const { navigate } = this.props.navigation
     console.log("this.props: ", this.props);
     //console.log("this.props: ", this.props);
     // console.log("navigate: ", navigate);
    // navigate('EditDogProfile', this.props.navigation.state.params);
    // this.props.navigate('EditDogProfile');
  }

  render () {
    const { navigation } = this.props
    return (
      <View>
        <Text>
          Name: { navigation.state.params.name }
        </Text>
        <Text>
          Age: { navigation.state.params.age }
        </Text>
        <Text>
          Breed: { navigation.state.params.breed }
        </Text>
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