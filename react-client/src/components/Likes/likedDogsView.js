// TODO:
// makeRemoteRequest (get requests)
// deleteLikedDog (delete request)
// get rid of that grey bar
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
import React, { Component } from 'react';
import Swipeout from 'react-native-swipeout';
import { List, ListItem } from "react-native-elements";


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
      refreshing: false,
      item: null
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

  // item will be the dog object
  deleteLikedDog = (item) => {
    // delete request. which updates the dogsLiked array
    // handleRefresh() after deleting from DB to show new list with deleted dog gone
    console.log('delete dog', item);
    alert('dog deleted ' + item.name.first);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Image
          style={{width: 380, height: 140}}
          source={{uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/48d5f148002457.588b581f813d4.gif'}} // hearts corgi
        />

        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.data}
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
                  title={`${item.name.first} ${item.name.last}`}
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

export default LikedDogsView;