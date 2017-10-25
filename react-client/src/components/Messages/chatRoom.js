import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import io from 'socket.io-client';
import axios from 'axios';

import * as messageActions from '../../actions/MessageActions/chatRoomActions';

const messages = [{text: "This is a drill.", uid: "59e92041f61b1458b2e847f3", user: {name: "Bob"}, _id: "59ebd07bc68daf70df6adb25"},
{text: "I don't believe you.", uid: "59e92113f61b1458b2e847f4", user: {name: "Kyle"}, _id: "59ebd0a5c68daf70df6adb26"}];

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          },
        },
      ],
      typingText: null,
    }
    // this.props.roomid
    this.renderBubble = this.renderBubble.bind(this);
    this.onSend = this.onSend.bind(this);
    // this.renderFooter = this.renderFooter.bind(this);
  };
  
  componentDidMount() {
    // get messages, or filter messages from store
    // axios.get()
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

  onSend(e, messages = []) {
    // axios.patch(`http://localhost:8000/messages/${this.props.navigation.state.params._id}`, {
    //   user: {
    //     name: this.props.name,
    //   },
    //   text: e[0].text,
    //   createdAt: e[0].createdAt
    // })
    // console.log('text', e)
    console.log(this.props.name, e[0].text, this.props)
    // .then((data) => {
    //   this.setState({
    //       messages: data.messages,
    //     });
    // })
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
    let text = this.props.navigation.state.params.messages
    console.log(this.props.navigation.state.params.messages)
    return (
      <GiftedChat
        messages={messages}
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

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});

const userState = (store) => {
  return {
    name: store.Owners.user.name,
  }
}

export default connect(userState, null)(ChatRoom);
