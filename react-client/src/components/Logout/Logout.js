import {
  Text,
  View
} from 'react-native';
import React, { Component } from 'react';
import { StackNavigator} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class LogoutScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Logout',
    drawerIcon: ({tintColor}) => {
      return (
        <MaterialIcons
          name="favorite-border"
          size={24}
          style={{color: tintColor}}
        >
        </MaterialIcons>
      );
    }
  }
    render() {
      return (
        <View>
          <Text>
            This needs to logout user and auto navigates to splash/login page
          </Text>
          <View>
      <MaterialIcons
          name="menu"
          size={24}
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
        >
        </MaterialIcons>
    </View>
        </View>
      );
    }
  }

  export default LogoutScreen;