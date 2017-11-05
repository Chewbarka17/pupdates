import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import io from 'socket.io-client';
import axios from 'axios';

import * as chatRoomActions from '../../actions/ChatRooms/chatRoomActions';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    }
    this.renderBubble = this.renderBubble.bind(this);
    this.onSend = this.onSend.bind(this);
  };
  
  componentDidMount() {
    this.props.navigation.setParams({title: this.props.navigation.state.params.partner})
    axios.get(`https://serene-atoll-31576.herokuapp.com/api/messages/${this.props.navigation.state.params._id}`)
    .then((data) => {
      this.setState({
        messages: data.data[0].messages,
      })
    })

    this.socket = io('https://serene-atoll-31576.herokuapp.com/');
    this.socket.on(this.props.navigation.state.params._id, (message) => {
      this.setState({
        messages: [message, ...this.state.messages]
      })
    })
  }

  componentWillUnmount() {
    this.socket.emit('disconnect')
    this.socket.disconnect()
  }
  
  onSend(e) {
    axios.patch(`https://serene-atoll-31576.herokuapp.com/api/rooms/${this.props.navigation.state.params._id}`, {
      ownerIds: this.props.navigation.state.params.ownerIds,
    });
    axios.patch(`https://serene-atoll-31576.herokuapp.com/api/messages/${this.props.navigation.state.params._id}`, {
      text: e[0].text,
      createdAt: e[0].createdAt,
      user: {
        name: this.props.name,
        ownerId: this.props.ownerId
      },
    })
    .catch((err) => {
      console.log('Error posting message to db', err)
    })
    
    const message = {
      user: {
        name: this.props.name,
        ownerId: this.props.ownerId
      },
      text: e[0].text,
      createdAt: e[0].createdAt,
      roomId: this.props.navigation.state.params._id,
      _id: Math.round(Math.random() * 1000000),
    }
    this.socket.emit('message', message)
    this.setState({
      messages: [message, ...this.state.messages]
    })
  }

  renderBubble(props) {
    props.position = (props.currentMessage.user.ownerId === this.props.ownerId ? 'right' : 'left')
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
            backgroundColor: '#f44e64',
          }
        }}
      />
    );
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        renderBubble={this.renderBubble}
      />
    )
  }
}

const userState = (store) => {
  return {
    name: store.Owners.user.name,
    ownerId: store.Owners.user._id
  }
}

export default connect(userState, null)(ChatRoom);
