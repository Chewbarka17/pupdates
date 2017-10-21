import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import io from 'socket.io-client';

import * as messageActions from '../../actions/MessageActions/chatRoomActions';


class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: '',
    }
    // this.props.roomid
  };
  
  componentDidMount() {
    // get messages, or filter messages from store
    this.socket = io();
    this.socket.on('message', (message) => {
      this.setState({
        messages: [...this.state.message, message]
      })
    })
  }

  handleSubmit() {
    // post message to database
    
    this.socket.to(this.props.roomid).emit('message', {
      // message object with room id
    })
  }

  render() {
    let text = this.props.navigation.state.params.messages
    console.log(this.props.navigation.state.params.messages)
    return (
      <View>
        <FlatList
          data={text}
          renderItem={({item}) => 
            <View>
              <Text>{item.user}: {item.text}</Text>
            </View>
            }
            />
      </View>
    )
  } 

}

export default ChatRoom;