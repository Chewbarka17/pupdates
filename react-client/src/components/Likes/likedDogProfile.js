// TODO:
// styling
// add owner's name & profile which navigates to owner's profile?
  // {props.navigation.state.params.owner}

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

const likedDogProfile = (props) => {
  console.log("props: ", props);
  
  return (
      <View>
        <Avatar
          xlarge
          rounded
          source={{uri: props.navigation.state.params.pictures[0]}}
        />
        <View>
        <Text>
          Name: {props.navigation.state.params.name}
        </Text>
        <Text>
          Breed: {props.navigation.state.params.breed}
        </Text>
        <Text>
          Gender: {props.navigation.state.params.gender}
        </Text>
        <Text>
          Age: {props.navigation.state.params.age}
        </Text>
        <Text>
          Location: {props.navigation.state.params.location}
        </Text>
        <Text>
          Bio: {props.navigation.state.params.bio}
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