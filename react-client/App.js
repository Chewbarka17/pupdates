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
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './Store/Store';

import SplashPage from './src/components/Splash/splashPageView';
import Loading from './src/components/loading';

const { persistor, store } =  configureStore();

export default class App extends Component {
  render() {
    // console.log('What is PersistGate', persistor)
    return (
      <Provider store={store}>
        <PersistGate 
        persistor={persistor}
        loading={<Loading />}
        >
          <SplashPage />
        </PersistGate>
      </Provider>
    );
  }
}
