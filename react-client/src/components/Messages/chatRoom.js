import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import io from 'socket.io-client';
import axios from 'axios';

import * as messageActions from '../../actions/MessageActions/chatRoomActions';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    }
    this.renderBubble = this.renderBubble.bind(this);
    this.onSend = this.onSend.bind(this);
    // this.renderFooter = this.renderFooter.bind(this);
  };
  
  componentDidMount() {
    console.log(this.props)
    axios.get(`http://localhost:8000/api/messages/${this.props.navigation.state.params._id}`)
    .then((data) => {
      // console.log(data);
      this.setState({messages: data.data[0].messages})
    })

    this.socket = io('http://localhost:3000/');
    this.roomid = this.props.navigation.state.params._id

    this.socket.on(`${this.props.navigation.state.params._id}`, (message) => {
      console.log('setting state', message)
      this.setState({
        messages: [message, ...this.state.messages]
      })
    })
  }
  
  onSend(e, messages = []) {
    axios.patch(`http://localhost:8000/api/messages/${this.props.navigation.state.params._id}`, {
      text: e[0].text,
      createdAt: e[0].createdAt,
      user: {
        name: this.props.name,
      },
    })
    // console.log('text', e)
    .then((data) => {
      // console.log(data)
    })
    .catch((err) => {
      console.log('Error w/patch', err)
    })
    
    // console.log('socket?', this.props)
    this.socket.emit('message', {
      user: {
        name: this.props.name,
      },
      text: e[0].text,
      createdAt: e[0].createdAt,
      roomid: this.props.navigation.state.params._id,
      _id: Math.round(Math.random() * 1000000),
    })
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#e9ffaa',
          },
          right: {
            backgroundColor: '#aafaff',
          }
        }}
      />
    );
  }

  // renderFooter(props) {
  //   if (this.state.typingText) {
  //     return (
  //       <View style={styles.footerContainer}>
  //         <Text style={styles.footerText}>
  //           {this.state.typingText}
  //         </Text>
  //       </View>
  //     );
  //   }
  //   return null;
  // }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
        renderBubble={this.renderBubble}
      />
    )
  } 
  
  // renderFooter={this.renderFooter}
  // {/* onSend={(messages) => this.onSend(messages)} */}

}

// const styles = StyleSheet.create({
//   footerContainer: {
//     marginTop: 5,
//     marginLeft: 10,
//     marginRight: 10,
//     marginBottom: 10,
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#aaa',
//   },
// });

const userState = (store) => {
  return {
    // name: store.Owners.user.name,
    name: store.Auth.ownerInfo[0].name
  }
}

export default connect(userState, null)(ChatRoom);
