import MapView from 'react-native-maps';

import React, { Component } from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

class Home extends Component {

  constructor() {
    super();

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <View style={styles.container}>
      <MapView style={styles.map}
       initialRegion={{
           latitude: 33.9863674,
           longitude: -118.3987271,
           latitudeDelta: 0.0,
           longitudeDelta: 0.0,
       }}
      >
      <MapView.Marker
          coordinate={{latitude: 33.9863674,
          longitude: -118.3987271}}
      />
      </MapView>
      </View>
    // title={"title"}
    // description={"description"}
    // <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Latitude: {this.state.latitude}</Text>
    //   <Text>Longitude: {this.state.longitude}</Text>
    //   {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
    // </View>
    );
  }

}

export default Home;