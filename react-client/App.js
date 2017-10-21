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
import { Provider } from 'react-redux';
import store from './Store/Store';


// import files
// import NavigationApp from './src/components/NavBar/menu';
import Navigator from './src/components/Navbar/menu';

// this will replace <Navigator />
import SplashPageView from './src/components/Splash/splashPageView';
//<SplashPageView />


export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
