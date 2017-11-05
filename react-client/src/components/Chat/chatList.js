import React from 'react';
import { View, FlatList, TouchableHighlight, Image, StyleSheet, Text } from 'react-native';
import { ListItem } from "react-native-elements";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import ChatRoom from './chatRoom.js';
import * as chatRoomActions from '../../actions/ChatRooms/chatRoomActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.hack !== this.props.hack) {
      this.fetchRooms();
    }
  }
  
  componentDidMount() {
    this.fetchRooms();
  }
  
  fetchRooms() {
    this.props.actions.getRooms(this.props.ownerId);
  }

  _keyExtractor(item, index) {
    return item._id
  };
  
  render() {
    return (

      <View style={styles.container}>
        <View style={[styles.boxContainer, styles.boxOne]}>
        <Image
          style={{width: 230, height: 140}}
          source={require('../../../images/chatLaptopCorgi.gif')}
        />
        </View>
        <View style={[styles.boxContainer, styles.boxTwo]}>
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

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  boxContainer: {
    flex: 1,

  },
  boxOne: {
    flex: 1,
    backgroundColor: '#4cb0e0',
    marginRight: -10,
    marginLeft: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxTwo: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default connect(state, chatDispatch)(ChatList);