import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

import * as dogActions from '../../actions/Profiles/dogProfileActions';

class viewOwnerProfile extends Component {
  static navigationOptions = {
    title: 'ViewOwnerProfile',
  };
  constructor(props) {
    super(props);

    this.handlePressToEditUser = this.handlePressToEditUser.bind(this);
    this.handlePressToAddDog = this.handlePressToAddDog.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/users/dogs/59e8f89004abdcfd203864ef')
      .then(({data}) => {
        console.log(data);
        })
      .catch((err) => {
        console.log(err)
      })
  }

  handlePressToEditUser() {
    this.props.navigation.navigate('Profile');
  }

  handlePressToAddDog() {
    this.props.navigation.navigate('EditDogProfile');
  }

  render () {
    return (
      <View>
        <Button 
        title='Edit User'
        onPress={this.handlePressToEditUser}
        />
        <Button 
        title='Add Dog'
        onPress={this.handlePressToAddDog}
        />
      </View>
    )
  }
}

export default viewOwnerProfile;