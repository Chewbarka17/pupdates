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

  componentWillMount() {
    this.props.actions.showDog(this.props.navigation.state.params)
  }

  handlePress() {
    const { navigate } = this.props.navigation
    navigate('EditDogProfile', this.props.navigation.state.params);
  }

  render () {
    console.log(this)
    
    const { 
      name, 
      age, 
      breed, 
      gender, 
      bio,
      pictures,
    } = this.props.dog;

    return (
      <View>
        <Avatar
          xlarge
          rounded
          source={{uri: pictures[0]}}
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

const dogState = (store) => {
  return {
    dog: store.Dogs.dogInfo
  }
}

const dogDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(dogActions, dispatch),
  }
};

export default connect(dogState, dogDispatch)(viewDogProfile);