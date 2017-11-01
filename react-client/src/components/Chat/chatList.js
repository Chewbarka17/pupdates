import React from 'react';
import { View, FlatList, TouchableHighlight } from 'react-native';
import { ListItem } from "react-native-elements";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import ChatRoom from './chatRoom.js';
import * as chatRoomActions from '../../actions/ChatRooms/chatRoomActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


class ChatList extends React.Component {
  // static navigationOptions = {
  //   title: 'Chats',
  // }
  constructor(props) {
    super(props);
    // this.state = {
    //   clicked: true,
    // }
  };

  componentDidMount() {
    this.props.actions.getRooms(this.props.ownerId);
    console.log('yo', this)
  }
  
  // c() {
  //   if (this.props.trigger) {
  //     this.props.actions.getRooms(this.props.ownerId);
  //   }
  // }

  _keyExtractor(item, index) {
    return item._id
  };
  
  render() {
    return (
      <View>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.props.rooms}
          renderItem={({item}) =>
          <TouchableHighlight
          underlayColor='rgba(192,192,192,0.6)'
        >
        <View>
          <ListItem
          key={item._id}
          onPress={() =>
            this.props.navigate('ChatRoom', item)
          }
            title={`${item.partner}`}
            id={item._id}
          />
          </View>
          </TouchableHighlight>
          }
        />
      </View>
    )
  };
}

// add rooms to state
const state = (store) => {
  return {
    rooms: store.Rooms.rooms,
    ownerId: store.Owners.user._id,  
  }
}

const chatDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(chatRoomActions, dispatch),
  }
};

export default connect(state, chatDispatch)(ChatList);