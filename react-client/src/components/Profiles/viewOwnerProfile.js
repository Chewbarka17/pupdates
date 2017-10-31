import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, FlatList, AsyncStorage } from 'react-native';
import { Button, List, ListItem, Avatar } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ViewDogProfileScreen from '../Profiles/viewDogProfile';
import * as dogActions from '../../actions/Profiles/dogProfileActions';
import * as ownerActions from '../../actions/Profiles/ownerActions';

class viewOwnerProfile extends Component {
  // static navigationOptions = {
  //   drawerLabel: 'Profile',
  //   drawerIcon: ({tintColor}) => {
  //     return (
  //       <MaterialIcons
  //         name="face"
  //         size={24}
  //         style={{color: tintColor}}
  //       />
  //     );
  //   }
  // }
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      dogs: null,
    };

    this.ownerProfile = null;
    this.handlePressToEditUser = this.handlePressToEditUser.bind(this);
    this.handlePressToAddDog = this.handlePressToAddDog.bind(this);
    this.handleGeolocation = this.handleGeolocation.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getDogs = this.getDogs.bind(this);
  }
  
  componentDidMount() {
    this.handleGeolocation();
    this.getDogs();
  }
  
  handlePressToEditUser() {
    //this.props.navigation.navigate('EditOwnerProfile');
    this.props.navigate('EditOwnerProfile');
  }
  
  handlePressToAddDog() {
    //this.props.navigation.navigate('AddDogProfile');
    this.props.navigate('AddDogProfile');
  }

  handleGeolocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        })
        // axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyABBYsfb17rEn8uzLRyf0o_77R2A8AjI6g`)
        //   .then(({data}) => {
        //     console.log('api request', data);
        //     this.props.ownerActions.updateOwners(
        //       this.props.user.name, 
        //       this.props.user.age, 
        //       data.results[0],
        //       this.props.user.bio,
        //       this.props.user._id,
        //       [position.coords.latitude, position.coords.longitude],
        //     )
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   })
        this.getLocation(position);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  getLocation(position) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=YOURAPIKEYHERE`)
      .then(({data}) => {
        console.log('api request', data);
        this.props.ownerActions.updateOwners(
          this.props.user.name, 
          this.props.user.age, 
          data.results[0],
          this.props.user.bio,
          this.props.user._id,
          [position.coords.latitude, position.coords.longitude],
        )
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getDogs() {
    axios.get('http://localhost:8000/api/users/dogs/' + this.props.userId)
      .then(({data}) => {
        console.log('this is data from get request ', data);
        this.setState({
          dogs: data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  render () {
    //const { navigate } = this.props.navigation;
    console.log("owner props", this.props);
    const { user } = this.props;
    return (
      <View>
        <Avatar
          large
          rounded
          source={{uri: user.picture}}
          activeOpacity={0.7}
        />
        <Text>
          Name: {user.name}
        </Text>
        { user.age ?
        <Text>
          Age: {user.age}
        </Text> : null
        }
        { user.bio ?
        <Text>
          Bio: {user.bio}
        </Text> : null
        }
        <Text>
          Location:{user.location}
        </Text>
        <Button 
        title='Edit User'
        onPress={this.handlePressToEditUser}
        />
        <Button 
        title='Add Dog'
        onPress={this.handlePressToAddDog}
        />
        <FlatList
          data={this.state.dogs === this.props.dogs ? this.state.dogs : this.props.dogs}
          renderItem={({ item }) => 
            <Swipeout right={[{
              text: 'Delete',
              backgroundColor: 'red',
              onPress: (event) => {
                this.props.dogActions.deleteDogs(item._id, this.props.userId);
              }
            }]}
              autoClose={true}
              backgroundColor='transparent'
            >
            <ListItem
              onPress={() =>
                this.props.navigate('ViewDogProfile', item)
              }
              title={item.name}
              subtitle={`Age: ${item.age} Breed: ${item.breed}`}
              id={item.id}
            />
            </Swipeout>
          }
        />
          <View>
            {/* <MaterialIcons
              name="menu"
              size={24}
              //onPress={() => this.props.navigation.navigate('DrawerOpen')}
              onPress={() => this.props.navigate('DrawerOpen')}
            /> */}
          </View>
          <View>
            <Button
            
            title='Logout'
            onPress={() =>
                //this.props.navigation.navigate('LogoutScreen', item)
                this.props.navigate('LogoutScreen')
              }
            />
            </View>
      </View>
    )
  }
}

const viewOwnerState = (store) => {
  return {
    dogs: store.Dogs.dogs,
    user: store.Owners.user,
    userId: store.Owners.user._id,
    location: store.Owners.userLocation
  }
}

const viewOwnerDispatch = (dispatch) => {
  return {
    dogActions: bindActionCreators(dogActions, dispatch),
    ownerActions: bindActionCreators(ownerActions, dispatch),
  }
};

export default connect(viewOwnerState, viewOwnerDispatch)(viewOwnerProfile);