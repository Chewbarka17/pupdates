import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import io from 'socket.io-client';

import ChatRoom from './chatRoom';
import * as messageActions from '../../actions/MessageActions/messageActions';


class ChatList extends React.Component {
  constructor(props) {
    super(props);
    // this.socket = io('/');
  };

  componentDidMount(){
    // this.socket = io('/')
    // this.socket.on('message', message => {
    //   console.log('socket received message', message);
      // this.props.actions.messageChange([...this.props.log, message]);
    // })

    // get rooms associated with user
    // set rooms = to data for FlatList
  }

  render() {
    return (
      <FlatList 
      data={[{key: 'row1'}, {key:'row2'}]}
      renderItem={({item}) => <Text>{item.key}</Text>}
      />
    )
  };
}

// add rooms to state
const state = (store) => {
  return {
    firstname: store.Owners.user.firstname,
    lastname: store.Owners.user.lastname,
  }
}

const messageDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(messageActions, dispatch),
  }
};

export default connect(state, messageDispatch)(ChatList);