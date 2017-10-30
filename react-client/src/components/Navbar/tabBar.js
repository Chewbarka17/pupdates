// //import React from 'react';
// import React, { Component } from 'react';
// import {
//   Text,
//   View,
// } from 'react-native';

// import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import OwnerProfile from '../Profiles/editOwnerProfile';
// import ViewDogs from '../ViewDogs/doglist';
// import LikedDogs from '../Likes/likedDogsView';
// import ChatList from '../Messages/chatList';

// class TabBar extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <ScrollableTabView
//         style={{marginTop: 20, }}
//         initialPage={0} // sets the initial page to ViewDogs
//         tabBarActiveTextColor='navy'
//         tabBarInactiveTextColor='grey'
//         renderTabBar={() => <ScrollableTabBar />}
//       >
//         <ViewDogs tabLabel='Dogs' />
//         <OwnerProfile tabLabel='Profile' />
//         <LikedDogs tabLabel='Likes' />
//         <ChatList tabLabel='Chat' />
//       </ScrollableTabView>
//     )
//   } 
// }

// export default TabBar;


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
import EditOwnerProfile from '../Profiles/editOwnerProfile';

export default () => {
  return <ScrollableTabView
    locked={true} // this needs to be true because of swiping dog cards
    style={{marginTop: 24, }}
    initialPage={0}
    renderTabBar={() => <CustomTabBar />}
  >
    <ScrollView tabLabel="md-person" style={styles.tabView}>
      <View style={styles.card}>
        <Text>Edit owner profile</Text>
        {/* <EditOwnerProfile /> */}
      </View>
    </ScrollView>
    <ScrollView tabLabel="md-paw" style={styles.tabView}>
      <View>
        <ViewDogs />
      </View>
    </ScrollView>
    <ScrollView tabLabel="ios-heart" style={styles.tabView}>
      <View style={styles.card}>
        <Text>Liked dogs</Text>
        {/* <LikedDogs /> */}
      </View>
    </ScrollView>
    <ScrollView tabLabel="ios-chatbubbles" style={styles.tabView}>
      <View>
        <ChatList />
      </View>
    </ScrollView>
  </ScrollableTabView>;
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