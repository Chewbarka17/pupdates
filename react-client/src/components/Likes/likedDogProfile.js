// TODO:
// styling
// add owner's name & profile which navigates to owner's profile?

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

const likedDogProfile = (props) => {
  // console.log("props ", props.navigation.state.params);

  // don't really want to but...
  // console.log("owner's name ", props.navigation.state.params.name);
  // console.log("owner's pic ", props.navigation.state.params.name); // navigates to owner's profile
    
  return (
      <View>
        <Avatar
          xlarge
          rounded
          source={{uri: props.navigation.state.params.picture.large}}
        />
        <View>
        <Text>
          Name: {props.navigation.state.params.name.first}
        </Text>
        <Text>
          Breed: {props.navigation.state.params.nat}
        </Text>
        <Text>
          Age: {props.navigation.state.params.cell}
        </Text>
        <Text>
          Location: {props.navigation.state.params.location.postcode}
        </Text>
        <Text>
          Gender: {props.navigation.state.params.gender}
        </Text>
        <Text>
          Bio: {props.navigation.state.params.email}
        </Text>
      </View>
    </View>
  )
}

var styles = StyleSheet.create({
  image: {
    height: 150,
    borderRadius: 75,
    width: 150,
  }
});

export default likedDogProfile;