import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import io from 'socket.io-client';
import axios from 'axios';

import * as messageActions from '../../actions/MessageActions/chatRoomActions';

class ChatRoom extends React.Component {
  // static navigationOptions = {
  //   title: '' || this.state.partner
  // };   
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      // partner: ''
    }
    this.renderBubble = this.renderBubble.bind(this);
    this.onSend = this.onSend.bind(this);
    // this.renderFooter = this.renderFooter.bind(this);
  };
  
  componentDidMount() {
    axios.get(`http://localhost:8000/api/messages/${this.props.navigation.state.params._id}`)
    .then((data) => {
      console.log(data)
      // if (data[1] === this.props.name) {
        // let partner = data[2]
      // } else {
        // let partner = data[1]
      // }
      this.setState({
        messages: data.data[0].messages,
        // partner: partner
      })
    })

    this.socket = io('http://localhost:3000/');
    this.socket.on(`${this.props.navigation.state.params._id}`, (message) => {
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
        uid: this.props.uid
      },
    })
    .then((data) => {
      // console.log(data)
    })
    .catch((err) => {
      console.log('Error w/patch', err)
    })
    
    this.socket.emit('message', {
      user: {
        name: this.props.name,
        uid: this.props.uid
      },
      text: e[0].text,
      createdAt: e[0].createdAt,
      roomid: this.props.navigation.state.params._id,
      _id: Math.round(Math.random() * 1000000),
    })
  }

  renderBubble(props) {
    props.position = (props.currentMessage.user.uid === this.props.uid ? 'right' : 'left')
    return (
      <Bubble
        {...props}
        containerToNextStyle={{
          right: {
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
          },
          left: {
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
          }
        }}
        containerToPreviousStyle={{
          right: {
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          },
          left: {
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }
        }}
        wrapperStyle={{
          left: {
            marginLeft: 5,
            backgroundColor: '#CAC9C9',
          },
          right: {
            marginRight: 1,
            backgroundColor: '#2A86EF',
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
    name: store.Owners.user.name,
    uid: store.Owners.user._id
  }
}

export default connect(userState, null)(ChatRoom);
