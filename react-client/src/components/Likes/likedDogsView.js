import {  
  View,
  Text,
  Image,
  Button,
  FlatList,
  NavigatorIOS,
  ActivityIndicator, 
  TouchableHighlight 
} from 'react-native';
import React, { Component } from 'react';
import Swipeout from 'react-native-swipeout';
import { StackNavigator } from 'react-navigation';
import { List, ListItem, SearchBar } from "react-native-elements";

import DogProfileScreen from '../Profiles/dogProfile';
import likedDogsEntry from '../Likes/likedDogsEntry';

let swipeoutBtns = [{
    text: 'Delete',
    backgroundColor: 'red',
    onPress: () => { console.log("this function needs to delete from dogsLiked array!") }
  }];

class LikedDogsView extends Component {
  static navigationOptions = {
    title: 'Likes',
  };
  constructor(props) {
    super(props);

    // only need data?
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  // get request for user's dogsLiked array
  // get request for each dog in the dogsLiked array
  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=5`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
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

  alertUserOnPress = (item) => {
    alert(`name ${item.name.first} ${item.name.last}`);

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Image
          style={{width: 380, height: 140}}
          source={{uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/48d5f148002457.588b581f813d4.gif'}} // hearts corgi
        />

        <Button
        title="DogProfile"
                  onPress={() =>
                    navigate('DogProfile')
                  }
        />
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <Swipeout right={swipeoutBtns}
                autoClose={true}
                backgroundColor= 'transparent'
              >
              <TouchableHighlight
                underlayColor='rgba(192,192,192,0.6)'
              >
              <View>
                <ListItem
                  roundAvatar
                  name={`${item.name.first} ${item.name.last}`}
                  subtitle={item.email}
                  avatar={{ uri: item.picture.thumbnail }}
                  containerStyle={{ borderBottomWidth: 0 }}
                />
                </View>
                </TouchableHighlight>
              </Swipeout>
            )}
            keyExtractor={item => item.email}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
          />
        </List>
      </View>
    );
  }
}

// navigation to each dog's profile

const App = StackNavigator({
  Likes: { screen: LikedDogsView },
  DogProfile: { screen: DogProfileScreen },
});

export default App;