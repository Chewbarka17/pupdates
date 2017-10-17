/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import dependencies
import React, { Component } from 'react';
import { StackNavigator} from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

// import files
import ViewDogsScreen from './src/components/ViewDogs/doglist'
import LikesScreen from './src/components/Likes/likedDogsView'
import FilterScreen from './src/components/FilterDog/filterDog'
import OwnerProfileScreen from './src/components/OwnerProfiles/ownerProfile'
import LogoutScreen from './src/components/Logout/Logout'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
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
      </View>
    );
  }
}

const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen },
  Dogs: { screen: ViewDogsScreen },
  Likes: { screen : LikesScreen },
  Filter: { screen : FilterScreen },
  Profile: { screen : OwnerProfileScreen },
  Logout: { screen: LogoutScreen }
  });

export default class App extends Component<{}> {
  render() {
    return <NavigationApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
