import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

// import files
import ViewDogsScreen from '../ViewDogs/doglist'
import LikesScreen from '../Likes/likedDogsView'
import FilterScreen from '../FilterDog/filterDog'
import OwnerProfileScreen from '../Profiles/ownerProfile';
import LogoutScreen from '../Logout/Logout'
import Chats from '../Messages/chatList'

class MenuScreen extends React.Component {
    static navigationOptions = {
      title: 'Menu',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
          <Button
            title="Dogs"
            onPress={() =>
              navigate('Dogs')
            }
          />
          <Button
            title="Likes"
            onPress={() =>
              navigate('Likes')
            }
          />
          <Button
            title="Filter"
            onPress={() =>
              navigate('Filter')
            }
          />
          <Button
            title="Profile"
            onPress={() =>
              navigate('Profile')
            }
          />
          <Button
            title="Logout"
            onPress={() =>
              navigate('Logout')
            }
          />
          <Button
            title="Chats"
            onPress={() =>
              navigate('Chats')
            }
          />
        </View>
      );
    }
  }

const NavigationApp = StackNavigator({
  Menu: { screen: MenuScreen },
  Dogs: { screen: ViewDogsScreen },
  Likes: { screen : LikesScreen },
  Filter: { screen : FilterScreen },
  Profile: { screen : OwnerProfileScreen },
  Logout: { screen: LogoutScreen }
});

  export default NavigationApp;