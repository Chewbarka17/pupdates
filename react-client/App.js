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

import SplashPage from './src/components/Splash/splashPageView';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SplashPage />
      </Provider>
    );
  }
}
