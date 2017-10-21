import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ViewDogProfileScreen from '../Profiles/viewDogProfile';
import * as dogActions from '../../actions/Profiles/dogProfileActions';

class viewOwnerProfile extends Component {
  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: ({tintColor}) => {
      return (
        <MaterialIcons
          name="favorite-border"
          size={24}
          style={{color: tintColor}}
        >
        </MaterialIcons>
      );
    }
  }
  constructor(props) {
    super(props);
    // change to register a change for commit.
    this.help = this.help.bind(this);
    this.handlePressToEditUser = this.handlePressToEditUser.bind(this);
    this.handlePressToAddDog = this.handlePressToAddDog.bind(this);
  }

  help() {
    //does nothing.  
  }
  
  componentDidMount() {
    axios.get('http://localhost:8000/api/users/dogs/59e8f89004abdcfd203864ef')
    .then(({data}) => {
      this.props.actions.listDogs(data);
      console.log('what is this.props.dogs', this.props);
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  handlePressToEditUser() {
    this.props.navigation.navigate('Profile');
  }
  
  handlePressToAddDog() {
    this.props.navigation.navigate('EditDogProfile');
  }
  
  render () {
    console.log(this.props);
    return (
      <View>
        <Button 
        title='Edit User'
        onPress={this.handlePressToEditUser}
        />
        <Button 
        title='Add Dog'
        onPress={this.handlePressToAddDog}
        />
        <FlatList
          data={this.props.dogs}
          renderItem={({ item }) => 
            <Swipeout right={[{
              text: 'Delete',
              backgroundColor: 'red',
              onPress: (event) => {
                this.props.actions.deleteDogs(item._id);
                console.log(item._id);
              }
            }]}
              autoClose={true}
              backgroundColor='transparent'
            >
            <ListItem
              title={item.name}
              subtitle={`Age: ${item.age} Breed: ${item.breed}`}
              id={item.id}
            />
            </Swipeout>
    }
        />
          <View>
            <MaterialIcons
              name="menu"
              size={24}
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            >
            </MaterialIcons>
          </View>
      </View>
    )
  }
}

const dogsState = (store) => {
  return {
    dogs: store.Dogs.dogInfo
  }
}

const dogDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(dogActions, dispatch),
  }
};

export default connect(dogsState, dogDispatch)(viewOwnerProfile);