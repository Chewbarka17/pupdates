import {  
  View,
  Text,
  Image,
  Button
} from 'react-native';
import React, { Component } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class SecondScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Screen2',
    drawerIcon: ({tintColor}) => {
      return (
        <MaterialIcons
          name="favorite"
          size={24}
          style={{color: tintColor}}
        >
        </MaterialIcons>
      );
    }
  }
  render() {
    return <View style={
      {
        flex: 1, 
        justifyContent: 'center',
        alignItems:'center'
      }
    }>
      <Text style={{fontSize:30, color:'blue'}}>
        Screen 2
      </Text>
      <MaterialIcons
          name="menu"
          size={24}
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
        >
        </MaterialIcons>
    </View>
  }
}