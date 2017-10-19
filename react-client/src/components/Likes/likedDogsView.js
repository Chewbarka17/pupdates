import React, { Component } from "react";
import { Image, View, Text, Button, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

// get request for logged-in user
// Batman (id: 59e570f1e46ed4333725a612) dogsLiked: ["59e570f1e46ed4333725a613", "59e570c74d3ca333299a19c2"]

// get request for each dog in the dogsLiked array
// data = [
//   {
//     "_id": {
//         "$oid": "59e570f1e46ed4333725a613"
//     },
//     "name": "Krypto",
//     "owner": {
//         "$oid": "59e570c64d3ca333299a19c1"
//     },
//     "age": 20,
//     "breed": "Kryptonian Mutt",
//     "pictures": [
//         "https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Kryptoanim.jpg/220px-Kryptoanim.jpg"
//     ],
//     "__v": 0
//   }, {
//     "_id": {
//         "$oid": "59e570c74d3ca333299a19c2"
//     },
//     "name": "Happy",
//     "owner": {
//         "$oid": "59e5715265a81d333754f5f8"
//     },
//     "age": 20,
//     "breed": "Kryptonian Mutt",
//     "pictures": [
//         "https://vignette.wikia.nocookie.net/marvelmovies/images/4/49/Hogan.jpg/revision/latest/zoom-crop/width/320/height/320?cb=20130424125548"
//     ],
//     "__v": 0
//   }
// ];


class FlatListDemo extends Component {
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
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
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

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  // renderHeader = () => {
  //   return <SearchBar placeholder="Type Here..." lightTheme round />;
  // };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View>
        <Image
          style={{width: 380, height: 140}}
          source={{uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/48d5f148002457.588b581f813d4.gif'}}
        />
      
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
              avatar={{ uri: item.picture.thumbnail }}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          //ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
          // supposed to get rid of that bar
          contentInset={{bottom:49}}
          automaticallyAdjustContentInsets={false}
        />
      </List>
      </View>
    );
  }
}

export default FlatListDemo;