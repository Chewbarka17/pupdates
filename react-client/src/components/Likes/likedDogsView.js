import {  
  View,
  Text,
  Image,
  Button,
  FlatList,
  Animated,
  TouchableOpacity,
  ActivityIndicator, 
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';
import React, { Component } from 'react';
import Swipeout from 'react-native-swipeout';
import { List, ListItem, Avatar } from "react-native-elements";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import * as likeActions from '../../actions/Likes/likeActions';

import DogProfile from '../Likes/likedDogProfile';

// animate
import * as Animatable from 'react-native-animatable';


class LikedDogsView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      likedDogs: [],
      item: null,
      refreshing: false,

      // animate
      bounceValue: new Animated.Value(0),
    };
  }


  componentDidMount() {
    this.makeRemoteRequest();

  }

  componentWillReceiveProps() {
    this.makeRemoteRequest();    
  }

  makeRemoteRequest = () => {
    axios.get(`http://localhost:8000/api/likeddogs/${this.props.uid}`)
      .then(({ data }) => {
        this.setState({ likedDogs: data });
      })
      .catch((err) => {
        console.log('failed to get liked dogs: ', err)
      });
  };

  deleteLikedDog(item) {
    axios.patch(`http://localhost:8000/api/likeddogs/${this.props.uid}`, {dogid: item._id})
      .then(() => {
        this.makeRemoteRequest();
      })
      .catch((err) => {
        console.log('failed to get remove liked dog: ', err);
      });
  };

  render() {
    return (

      <View>      
        <Image
          style={{width: 380, height: 140, marginLeft: -10}}
          source={require('../../../images/likesHappyCorgi.gif')}
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
                  onPress={() => this.props.navigate('LikedDogProfile', item)}
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
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        </List>
      </View>
    );
  }
}

const likedState = (store) => {
  return {
    uid: store.Owners.user._id,
  }
}

export default connect(likedState, null)(LikedDogsView);