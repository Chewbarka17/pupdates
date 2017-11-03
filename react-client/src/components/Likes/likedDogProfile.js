// TODO:
// show more owner info
// styling

import React, { Component } from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, } from 'react-native';
import { Avatar } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chatActions from '../../actions/ChatRooms/chatRoomActions';

// for chat button
import Button from 'react-native-button'




class likedDogProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      ownerId: '',
    };
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    this.getOwnersInfo();
  };

  getOwnersInfo() {
    axios.get('http://localhost:8000/api/users/' + this.props.navigation.state.params.owner) // this is the dog's owner
      .then(({ data }) => {
        this.setState({
          name: data[0].name,
          picture: data[0].picture,
          ownerId: data[0]._id,
          bio: data[0].bio,
        })
      })
      .catch((err) => {
        console.log('failed to get owner info: ', err)
      });
  };

  createRoom() {
    console.log('uids', this.props.uid, this.state.ownerId)
    axios.post('http://localhost:8000/api/rooms', {
      ownerIds: [this.props.uid, this.state.ownerId],
    })
    .then((data) => {
      this.props.navigation.navigate('ChatRoom', data.data)
    })
    .catch((err) => {
      console.log('error creating room', err)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.boxContainer, styles.boxOne]}>
          <Avatar
            xlarge
            rounded
            source={{uri: this.props.navigation.state.params.pictures[0]}}
          />
          <Text>
          </Text>
          <Text style={styles.titleText}>
            {this.props.navigation.state.params.name}
          </Text>
          <Text style={styles.baseText}>
            {this.props.navigation.state.params.breed}
          </Text>
          <Text style={styles.baseText}>
            {this.props.navigation.state.params.gender}, {this.props.navigation.state.params.age} years old
          </Text>
          <Text style={styles.baseText}>
            {this.props.navigation.state.params.bio}
          </Text>
        </View>
        <View style={[styles.boxContainer, styles.boxTwo]}>
          <Avatar
            large
            rounded
            source={{uri: this.state.picture}}
          />
          <Text style={styles.titleText}>
            {this.state.name}
          </Text>
          <Text style={styles.baseText}>
            {this.state.bio}
          </Text>
        </View>
        <View style={[styles.boxContainer, styles.boxThree]}>
          <Button
            containerStyle={{height:45, width: 150, overflow:'hidden', borderRadius:20, backgroundColor: '#f44e64', justifyContent:'center', alignItems:'center'}}
            style={{fontSize: 20, color: 'white', justifyContent:'center', alignItems:'center'}}
            onPress={this.createRoom}
          >
            Chat
          </Button>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  boxContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxOne: {
    flex: 5,
    backgroundColor: 'white'
  },
  boxTwo: {
    flex: 3,
    backgroundColor: '#efefef'
  },
  boxThree: {
    flex: 1,
    backgroundColor: '#efefef'
  },
  baseText: {
    fontFamily: 'Avenir',
    fontSize: 17,
    color: '#898989',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3f3f3f',
  },
});

{/* <View style={styles.container}>
        <View>
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
          </View>
        </View>
        <View>
          <Text>
            Owner: {this.state.name}
          </Text>
          <Avatar
            large
            rounded
            source={{uri: this.state.picture}}
          />
          </View>
        <View>
          <View>
            <Button
              containerStyle={{height:45, width: 150, overflow:'hidden', borderRadius:20, backgroundColor: '#ed3862', justifyContent:'center', alignItems:'center'}}
              style={{fontSize: 20, color: 'white', justifyContent:'center', alignItems:'center'}}
              onPress={this.createRoom}
            >
              Chat
            </Button>
          </View>
        </View>
      </View> */}

// var styles = StyleSheet.create({
//   container: {
//     marginTop: 20,
//     justifyContent:'center', 
//     alignItems:'center',
//     backgroundColor:'white',
//   },
//   dogContainer: {
//     backgroundColor:'white',
//   },
//   dogImage: {
//     height: 150,
//     borderRadius: 75,
//     width: 150,
//   },
//   dogInfo: {

//   },
//   ownerContainer: {
//     backgroundColor:'#eaeaea',
//     // width: 400,
//     // height: 200,
//   },
//   ownerImage: {

//   },
//   ownerInfo: {
    
//   },
//   buttonContainer: {
//     backgroundColor:'#eaeaea',
//   },
//   chatButton: {
//     borderRadius:20,
//     backgroundColor: '#ed3862',
//   }
// });

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
