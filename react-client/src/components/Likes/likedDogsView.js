import React, { Component } from 'react';
import { StackNavigator} from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class LikesScreen extends React.Component {
    static navigationOptions = {
      title: 'Likes',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>
          <Text>
            onPress= { ()=> navigate('Home') }>Navigate to Home
          </Text>
        </View>
      );
    }
  }

export default LikesScreen;