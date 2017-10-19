import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import io from 'socket.io-client';

import * as messageActions from '../../actions/MessageActions/chatRoomActions';


class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io('/');
  };

  handleSubmit() {
    socket.emit()
  }

  render() {
    return (
      <View><Text>test</Text></View>
    )
  } 

}

  export default ChatRoom;