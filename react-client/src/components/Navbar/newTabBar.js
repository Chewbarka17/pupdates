import { TabNavigator, StackNavigator } from "react-navigation";
import React, { Component } from 'react';

// import ViewDogsScreen from '../ViewDogs/doglist';
// import LikedDogsView from '../Likes/likedDogsView';

import TabBar from '../Navbar/tabBar';
import likedDogProfile from '../Likes/likedDogProfile'
import ChatRoom from '../Messages/chatRoom';
import EditOwnerProfile from '../Profiles/editOwnerProfile';
import AddDogProfile from '../Profiles/addDogProfile';

// const MainScreenNavigator = TabNavigator({
//   ViewDogs: { screen: ViewDogsScreen },
//   LikedDogList: { screen: LikedDogsView },
// });

const SimpleApp = StackNavigator({
  Home: { 
    //screen: MainScreenNavigator,
    screen: TabBar,
    navigationOptions: {
      header: null,
    },
  },
  LikedDogProfile: { screen: likedDogProfile },
  ChatRoom: { screen: ChatRoom },
  EditOwnerProfile: {screen: EditOwnerProfile},
  AddDogProfile: {screen: AddDogProfile},
})

export default SimpleApp;