import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class viewOwnerProfile extends Component {
  static navigationOptions = {
    title: 'Profile',
  };
  constructor(props) {
    super(props)
  }


  render () {
    return (
      <View>hi</View>
    )
  }
}