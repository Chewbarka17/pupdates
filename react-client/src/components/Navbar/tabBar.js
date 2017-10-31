import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import CustomTabBar from './customNavbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import ViewDogs from '../ViewDogs/doglist';
import ChatList from '../Messages/chatList';
import LikedDogs from '../Likes/likedDogsView';
import ViewOwnerProfile from '../Profiles/viewOwnerProfile';

class TabBar extends React.Component {

  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    console.log("tabBar's this.props: ", this.props);
    console.log("tabBar's this.props.navigation: ", this.props.navigation); // has the 4 functions including navigate
    const { navigate } = this.props.navigation;
    console.log("tabBar's navigate: ", navigate); // a function that should be passed by <ViewDogs navigate={navigate}>
    return (
      <ScrollableTabView
        locked={true} // this needs to be true because of swiping dog cards
        style={{marginTop: 24, }}
        initialPage={0}
        renderTabBar={() => <CustomTabBar />}
      >

      <ScrollView tabLabel="md-person" style={styles.tabView}>
        <View>
          <ViewOwnerProfile navigate={navigate} />
        </View>
      </ScrollView>

      <ScrollView tabLabel="md-paw" style={styles.tabView}>
        <View>
          <ViewDogs navigate={navigate} />
        </View>
      </ScrollView>

      <ScrollView tabLabel="ios-heart" style={styles.tabView}>
        <View>
          <LikedDogs navigate={navigate}/>
        </View>
      </ScrollView>

      <ScrollView tabLabel="ios-chatbubbles" style={styles.tabView}>
        <View>
          <ChatList navigate={navigate}/>
        </View>
      </ScrollView>

    </ScrollableTabView>
    )
  }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

export default TabBar;