import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { Component } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

class ViewDogsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Dogs',
    drawerIcon: ({tintColor}) => {
      return (
        <MaterialIcons
          name="pets"
          size={24}
          style={{color: tintColor}}
        >
        </MaterialIcons>
      );
    }
  }

  render() {
    return (
      <View >
        <Text>
          Swipe Dogs
        </Text>
        <MaterialIcons
          name="menu"
          size={24}
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
        >
        </MaterialIcons>
      </View>
    )
  }
}

export default ViewDogsScreen;