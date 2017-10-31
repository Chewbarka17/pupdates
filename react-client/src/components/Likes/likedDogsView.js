// TODO:
// get rid of grey bar
// add padding to footer to show items at the bottom (scroll?)

import {  
  View,
  Text,
  Image,
  Button,
  FlatList,
  ActivityIndicator, 
  TouchableHighlight 
} from 'react-native';
import axios from 'axios';
import React, { Component } from 'react';
import Swipeout from 'react-native-swipeout';
import { List, ListItem, Avatar } from "react-native-elements";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as likeActions from '../../actions/Likes/likeActions';

import DogProfile from '../Likes/likedDogProfile';
import NewTabBar from '../Navbar/newTabBar';

class LikedDogsView extends React.Component {
  // static navigationOptions = {
  //   drawerLabel: 'Likes',
  //   drawerIcon: ({tintColor}) => {
  //     return (
  //       <MaterialIcons
  //         name="favorite-border"
  //         size={24}
  //         style={{color: tintColor}}
  //       >
  //       </MaterialIcons>
  //     );
  //   }
  // }
  constructor(props) {
    super(props);

    this.state = {
      likedDogs: [],
      item: null
    };
  }

  componentDidMount = () => {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    axios.get(`http://localhost:8000/api/likeddogs/${this.props.uid}`)
      .then(({ data }) => {
        this.setState({ likedDogs: data }, () => {
          console.log("this.state.likedDogs after get request: ", this.state.likedDogs);
        });
      })
      .catch((err) => {
        console.log('failed to get liked dogs: ', err)
      });
  };

  deleteLikedDog = (item) => {
    axios.patch(`http://localhost:8000/api/likeddogs/${this.props.uid}`, {dogid: item._id})
      .then(() => {
        this.makeRemoteRequest();
      })
      .catch((err) => {
        console.log('failed to get remove liked dog: ', err);
      });
  };

  render() {
    // const { navigate } = this.props.navigation;
    console.log("this.props ", this.props);
    return (
      <View>
        <Image
          style={{width: 380, height: 140}}
          source={require('../ViewDogs/heartsCorgi.gif')}
        />

        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.likedDogs}
            renderItem={({ item }) => (
              <Swipeout
                right={[{
                  text: 'Delete',
                  backgroundColor: 'red',
                  onPress: () => this.deleteLikedDog(item)
                }]}
                autoClose={true}
                backgroundColor='transparent'
              >
              <TouchableHighlight
                underlayColor='rgba(192,192,192,0.6)'
              >
              <View>
                <ListItem
                  onPress={() =>
                    this.props.navigate('LikedDogProfile', item)
                  }
                  roundAvatar
                  title={`${item.name}`}
                  subtitle={item.breed}
                  avatar={{ uri: item.pictures[0] }}
                  containerStyle={{ borderBottomWidth: 0 }}
                />
                </View>
                </TouchableHighlight>
              </Swipeout>
            )}
            keyExtractor={item => item.breed}
          />
        </List>
        <View>
          {/* <MaterialIcons
            name="menu"
            size={24}
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
          </MaterialIcons> */}
        </View>
      </View>
    );
  }
}

const likedState = (store) => {
  return {
    // likedDogs: store.LikedDogs.likedDogs,
    uid: store.Owners.user._id,
  }
}

const likedDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(likeActions, dispatch),
  }
};

export default connect(likedState, likedDispatch)(LikedDogsView);