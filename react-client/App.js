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

import Loading from './src/components/loading';

import MainScreenNavigator from './src/components/Navbar/stackNav';


const { persistor, store } =  configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate 
        persistor={persistor}
        loading={<Loading />}
        >
          <MainScreenNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
