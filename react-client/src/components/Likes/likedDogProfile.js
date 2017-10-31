// TODO:
// styling

import React, { Component } from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chatActions from '../../actions/MessageActions/chatRoomActions';

// import NewStackNav from '../Navbar/newStackNav';


class likedDogProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      picture: '',
      ownerId: '',
    };
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    console.log("this.props: ", this.props)
    console.log("this.props.navigation ", this.props.navigation)
    console.log("this.props.navigation.state ", this.props.navigation.state)
    console.log("this.props.navigation.state.params ", this.props.navigation.state.params) // params is undefined
    this.getOwnersInfo();
  };

  getOwnersInfo() {
    axios.get('http://localhost:8000/api/users/' + this.props.navigation.state.params.owner) // this is the dog's owner
      .then(({ data }) => {
        // console.log(data)
        this.setState({
          name: data[0].name,
          picture: data[0].picture,
          ownerId: data[0]._id
        })
          // console.log("this.state.owner: ", this.state.owner); // [{owner}]
          // console.log("this.state.owner[0]: ", this.state.owner[0]); // {owner}
          // console.log("this.state.owner[0].name: ", this.state.owner[0].name); // Ironman
          
      })
      .catch((err) => {
        console.log('failed to get owner info: ', err)
      });
  };

  createRoom() {
    axios.post('http://localhost:8000/api/rooms', {
      uids: [this.props.uid, this.state.ownerId],
    })
    .then((data) => {
      // this.props.chatActions.createRoom(this.props.uid, this.state.ownerId)
      console.log(data.data)
      this.props.navigation.navigate('ChatRoom', data.data)
    })
    .catch((err) => {
      console.log('error creating room', err)
    })
  }

  render() {
    return (
      <View>
        {/* <Text>
          Blah
          </Text> */}
        <Avatar
          xlarge
          rounded
          source={{uri: this.props.navigation.state.params.pictures[0]}}
        />
        <View>
        <Text>
          Name: {this.props.navigation.state.params.name}
        </Text>
        <Text>
          Breed: {this.props.navigation.state.params.breed}
        </Text>
        <Text>
          Gender: {this.props.navigation.state.params.gender}
        </Text>
        <Text>
          Age: {this.props.navigation.state.params.age}
        </Text>
        <Text>
          Location: {this.props.navigation.state.params.location}
        </Text>
        <Text>
          Bio: {this.props.navigation.state.params.bio}
        </Text>
        <Avatar
          large
          rounded
          source={{uri: this.state.picture}}
        />
        <Text>
          Owner: {this.state.name}
        </Text> 
        <Button
          raised
          small
          iconRight={{
            name: 'message' 
          }}
          title='Chat'
          onPress={this.createRoom}
        />
      </View>
    </View>
    )
  }
}

var styles = StyleSheet.create({
  image: {
    height: 150,
    borderRadius: 75,
    width: 150,
  }
});

const chatState = (store) => {
  return {
    uid: store.Owners.user._id,
  }
}

const chatDispatch = (dispatch) => {
  return {
    chatActions: bindActionCreators(chatActions, dispatch),
  }
};

export default connect(chatState, chatDispatch)(likedDogProfile);
