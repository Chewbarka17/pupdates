import {  
  View,
  Text,
  Image,
  Button
} from 'react-native';
import React, { Component } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class FirstScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Screen 1',
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
    return <View style={
      {
        flex: 1, 
        justifyContent: 'center',
        alignItems:'center'
      }
    }>
      <Text style={{fontSize:30, color:'green'}}>
        Screen 1
      </Text>
      <Button
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
          title="Open DrawNavigator"
      />
    </View>
  }
}