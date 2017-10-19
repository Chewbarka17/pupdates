import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import io from 'socket.io-client';

import * as messageActions from '../../actions/MessageActions/messageActions';


class ChatList extends React.Component {
  constructor(props) {
    super(props);
    // this.socket = io('/');
  };

  render() {
    return (
      <View><Text>Oh No?</Text></View>
    )
  };

}

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