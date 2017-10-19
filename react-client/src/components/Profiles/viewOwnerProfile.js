import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

class viewOwnerProfile extends Component {
  static navigationOptions = {
    title: 'ViewOwnerProfile',
  };
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    this.props.navigation.navigate('Profile')
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

export default viewOwnerProfile;