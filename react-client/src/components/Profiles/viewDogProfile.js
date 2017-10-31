import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button, Avatar } from 'react-native-elements';

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
    
    const { 
      name, 
      age, 
      breed, 
      gender, 
      bio,
    } = this.props.navigation.state.params

    return (
      <View>
        <Avatar
          xlarge
          rounded
          source={{uri: navigation.state.params.pictures[0]}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Text>
          Name: { name }
        </Text>
        <Text>
          Age: { age }
        </Text>
        <Text>
          Breed: { breed }
        </Text>
        <Text>
          Gender: { gender }
        </Text>
        <Text>
          Bio: { bio }
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