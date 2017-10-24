// TODO:
// makeRemoteRequest (get requests)
// deleteLikedDog (delete request)
// get rid of grey bar
// add padding to footer to show items at the end

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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Swipeout from 'react-native-swipeout';
import { List, ListItem } from "react-native-elements";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import * as likeActions from '../../actions/Likes/likeActions';


class LikedDogsView extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Likes',
    drawerIcon: ({tintColor}) => {
      return (
        <MaterialIcons
          name="favorite-border"
          size={24}
          style={{color: tintColor}}
        >
        </MaterialIcons>
      );
    }
  }
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      likedDogs: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      item: null
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  // Batman's userid: 59e570f1e46ed4333725a612

  makeRemoteRequest = () => {
    axios.get('http://localhost:8000/api/likeddogs/' + '59e570f1e46ed4333725a612')
      .then(({ data }) => {
        this.setState({ likedDogs: data }, () => {
          console.log("this.state.likedDogs after get request: ", this.state.likedDogs);
        });
      })
      .catch((err) => {
        console.log('failed to get liked dogs: ', err)
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  deleteLikedDog = (item) => { // item = dog obj
    console.log("this.state.likedDogs before patch request: ", this.state.likedDogs);
    console.log("this is item._id of dog to delete: ", item._id);
    // patch should remove the dog from likedDogs array
    axios.patch('http://localhost:8000/api/likeddogs/' + '59e570f1e46ed4333725a612', {dogid: item._id})
      .then(() => {
        // call refresh function which has the get request
        this.handleRefresh();
        console.log("this.state.likedDogs after patch request: ", this.state.likedDogs);
      })
      .catch((err) => {
        console.log('failed to get remove liked dog: ', err)
      });
    
  };

  render() {
    const { navigate } = this.props.navigation;
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
                    navigate('DogProfile', item)
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
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
          />
        </List>
        <View>
          <MaterialIcons
            name="menu"
            size={24}
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
          </MaterialIcons>
        </View>
      </View>
    );
  }
}

const likedState = (store) => {
  return {
    likedDogs: store.LikedDogs.likedDogs
  }
}

const likedDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(likeActions, dispatch),
  }
};

export default connect(likedState, likedDispatch)(LikedDogsView);