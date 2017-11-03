import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, FlatList, AsyncStorage, StyleSheet, Image, ScrollView } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements';
import { GOOGLE_API } from 'react-native-dotenv';

import Swipeout from 'react-native-swipeout';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ViewDogProfileScreen from '../Profiles/viewDogProfile';

import * as dogActions from '../../actions/Profiles/dogProfileActions';
import * as ownerActions from '../../actions/Profiles/ownerActions';

import Button from 'react-native-button'

class viewOwnerProfile extends Component {
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
 
  componentWillReceiveProps() {
    this.getDogs();    
  }

  handlePressToEditUser() {
    this.props.navigation.navigate('EditOwnerProfile');
  }
  
  handlePressToAddDog() {
    this.props.navigation.navigate('AddDogProfile');
  }

  handleGeolocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        })
        this.getLocation(position);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  getLocation(position) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${GOOGLE_API}`)
      .then(({data}) => {
        console.log('api request', data);
        this.props.ownerActions.updateOwners(
          this.props.user.name, 
          this.props.user.age, 
          data.results[0],
          this.props.user.bio,
          this.props.user._id,
          [position.coords.latitude, position.coords.longitude],
          this.props.user.picture,
        )
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getDogs() {
    axios.get('http://localhost:8000/api/users/dogs/' + this.props.userId)
      .then(({data}) => {
        this.setState({
          dogs: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  _keyExtractor(item, index) {
    return item._id
  };

  render () {
    console.log('rendering owner profile', this.props)
    const { user, profilePic } = this.props;
    return (
      <View style={styles.container}>
        <View style={[styles.boxContainer, styles.boxOne]}>
          <Image
            style={{width: 235, height: 140}}
            source={require('../../../images/profileCoolCorgiCropped.gif')}
          />
        </View>
        <View style={[styles.boxContainer, styles.boxTwo]}>
          <Text>
          </Text>
          <Avatar
            xlarge
            rounded
            source={{uri: profilePic}}
            activeOpacity={0.7}
          />
        </View>
        <View style={[styles.boxContainer, styles.boxThree]}>
        <Button
            containerStyle={{height:50, width: 50, overflow:'hidden', borderRadius:25, backgroundColor: 'white', justifyContent:'center', alignItems:'center'}}
            style={{fontSize: 15, color: '#a3a3a3', justifyContent:'center', alignItems:'center'}}
            onPress={this.handlePressToEditUser}
          >
            Edit
          </Button>
          <Button
            containerStyle={{height:50, width: 65, overflow:'hidden', borderRadius:25, backgroundColor: 'white', justifyContent:'center', alignItems:'center'}}
            style={{fontSize: 15, color: '#a3a3a3', justifyContent:'center', alignItems:'center'}}
            onPress={this.handlePressToAddDog}
          >
            Add Dog
          </Button>
        </View>
        <View style={[styles.boxContainer, styles.boxFour]}>
          <Text style={styles.titleText}>
           {user.name}, {user.age}
           </Text>
         { user.age ?
         <Text style={styles.baseText}>
         </Text> : null
         }
         { user.bio ?
         <Text style={styles.baseText}>
           {user.bio}
         </Text> : null
         }
         <Text style={styles.baseText}>
           {user.location.split(',')[1]}
         </Text>
        </View>
        <View style={[styles.boxContainer, styles.boxFive]}>
          <Text>
          </Text>
           <FlatList
           data={this.state.dogs}
           keyExtractor={this._keyExtractor}
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
             <ListItem containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
               roundAvatar
               onPress={() =>
                 this.props.navigation.navigate('ViewDogProfile', item)
               }
               title={item.name}
               avatar={{ uri: `${item.pictures[0]}` }}
               id={item.id}
             />
             </Swipeout>
           }
         />
        </View>
        <View style={[styles.boxContainer, styles.boxSix]}>
          <Text>
          </Text>
          <Button
            containerStyle={{height:35, width: 250, overflow:'hidden', borderRadius:20, backgroundColor: '#f2a2ab', justifyContent:'center', alignItems:'center'}}
            style={{fontSize: 20, color: 'white', justifyContent:'center', alignItems:'center'}}
            onPress={() => this.props.navigate('LogoutScreen')}
          >
            Logout
          </Button>
        </View>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  boxContainer: {
    flex: 1,
  },
  boxOne: {
    flex: 5,
    backgroundColor: '#117bae',
    marginRight: -20,
    marginLeft: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxTwo: {
    flex: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxThree: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  boxFour: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxFive: {
    flex: 1,
    backgroundColor: 'white',
  },
  boxSix: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  baseText: {
    fontFamily: 'Avenir',
    fontSize: 17,
    color: '#898989',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3f3f3f',
  },
});

const viewOwnerState = (store) => {
  return {
    dogs: store.Dogs.dogs,
    user: store.Owners.user,
    userId: store.Owners.user._id,
    location: store.Owners.userLocation,
    profilePic: store.Owners.user.picture,
  }
}

const viewOwnerDispatch = (dispatch) => {
  return {
    dogActions: bindActionCreators(dogActions, dispatch),
    ownerActions: bindActionCreators(ownerActions, dispatch),
  }
};

export default connect(viewOwnerState, viewOwnerDispatch)(viewOwnerProfile);