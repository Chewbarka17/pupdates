import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

const likedDogProfile = (props) => {
  console.log("props ", props.navigation.state.params);
    return (
      <View>
      </View>
    )
}

export default likedDogProfile;