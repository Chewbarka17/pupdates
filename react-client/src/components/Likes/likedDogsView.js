import {  
  View,
  Text,
  Image,
  Button,
  FlatList,
  Animated,
  StyleSheet,
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

import DogProfile from '../Likes/likedDogProfile';

class LikedDogsView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      likedDogs: [],
      item: null,
      refreshing: false,
      bounceValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  componentWillReceiveProps() {
    this.makeRemoteRequest();    
  }

  makeRemoteRequest() {
    axios.get(`https://serene-atoll-31576.herokuapp.com/api/likeddogs/${this.props.uid}`)
      .then(({ data }) => {
        this.setState({ likedDogs: data });
      })
      .catch((err) => {
        console.log('failed to get liked dogs: ', err)
      });
  };

  deleteLikedDog(item) {
    axios.patch(`https://serene-atoll-31576.herokuapp.com/api/likeddogs/${this.props.uid}`, {dogid: item._id})
      .then(() => {
        this.makeRemoteRequest();
      })
      .catch((err) => {
        console.log('failed to get remove liked dog: ', err);
      });
  };

  _keyExtractor(item, index) {
    return item._id
  };

  render() {
    return (

      <View style={styles.container}>
        <View style={[styles.boxContainer, styles.boxOne]}>
        <Image
          style={{width: 235, height: 140}}
          source={require('../../../images/likesHappyCorgiCropped.gif')}
        />
        </View>
        <View style={[styles.boxContainer, styles.boxTwo]}>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            keyExtractor={this._keyExtractor}
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
                  subtitle={`${item.breed}`}
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
      </View>

    );
  }
}

const likedState = (store) => {
  return {
    uid: store.Owners.user._id,
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  boxContainer: {
    flex: 1,
  },
  boxOne: {
    flex: 1,
    backgroundColor: '#e35947',
    marginRight: -10,
    marginLeft: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxTwo: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default connect(likedState, null)(LikedDogsView);