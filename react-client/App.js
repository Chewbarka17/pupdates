/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import dependencies
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
// import NavigationApp from './src/components/NavBar/menu';
import NavigationApp from './src/components/Navbar/menu';

export default class App extends Component<{}> {
  render() {
    return <NavigationApp />;
  }
}

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
