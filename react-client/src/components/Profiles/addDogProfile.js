import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

import uploadProfilePicture from '../../components/Profiles/util/uploadProfilePictureUtil';
import * as dogActions from '../../actions/Profiles/dogProfileActions';

class AddDogProfile extends Component {
  static navigationOptions = {
    title: 'AddDogProfile',
  };
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age: '',
      breed: '',
      owner: '',
      gender: '',
      bio: '',
      image: null,
      picture: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectProfilePhoto = this.selectProfilePhoto.bind(this);
    this.navigateToTabBar = this.navigateToTabBar.bind(this);
  };

  selectProfilePhoto() {
    ImagePicker.openPicker({
      width: 256,
      height: 256,
      cropping: true
    }).then(image => {
      this.setState({image: image});
    }).catch(err => {
      console.log('Image not selected', err);``
    });
  }

  handleSubmit() {
    let pictureCheck = '';
    const { name, age, breed, gender, bio, actions } = this.state;
    this.props.actions.postDogs(name, age, breed, gender, bio, this.props.userId, pictureCheck, (data) => {
      const { name, age, breed, _id } = data;
      if (this.state.image) {
        uploadProfilePicture(this.props.awsSauce, _id, this.state.image, (err, result) => {
          if (err) {
            console.log('upload profile picture', err);
          }
          if (result) {
            pictureCheck = result.Location;
          }
          this.props.actions.updateDogs(name, age, breed, gender, bio, _id, pictureCheck, data, (data) => {
            this.navigateToTabBar();
          });
          
        });
      } else {
        this.navigateToTabBar();
      }
    });
  }

  navigateToTabBar() {
    const navigateToTabBar = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'TabBar'})
      ]
    });
    this.props.navigation.dispatch(navigateToTabBar);
  }

  render() {
    const pictureSelected = this.state.image;
    const { navigate } = this.props.navigation;
    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={'enter'}
          returnKeyType="next"
          id="name"
          onChangeText={name => this.setState({ name })}
        />
        <FormLabel>Age</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={'enter'}
          returnKeyType="next"
          id="age"
          onChangeText={age => this.setState({ age })}
        />
        <FormLabel>Breed</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={'enter'}
          returnKeyType="next"
          id="breed"
          onChangeText={breed => this.setState({ breed })}
        />
        <FormLabel>Gender</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={'enter'}
          returnKeyType="next"
          id="gender"
          onChangeText={gender => this.setState({ gender })}
        />
        <FormLabel>Bio</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={'enter'}
          returnKeyType="next"
          id="bio"
          onChangeText={bio => this.setState({ bio })}
        />
        {pictureSelected !== null ? (
          <Image
            style={{width: 100, height: 100}}
            source={{uri: pictureSelected.path}}
          />
        ) : (
          // <Image
          // style={{width: 200, height: 200}}
          // source={{uri: this.props.picture}}
          // />
          <View></View>
        )}
        <Button
          title='Choose profile picture'
          onPress={this.selectProfilePhoto}
          color="#ffffff"
          backgroundColor='#397af8'
        />
        <Button
          title="Save"
          onPress={this.handleSubmit}
          />
      </View>
    );
  }
}

  const dogState = (store) => {
    return {
      userId: store.Owners.user._id,
      dog: store.Dogs,
      awsSauce: store.Owners.awsSauce,
    }
  }

  const dogDispatch = (dispatch) => {
    return {
      actions: bindActionCreators(dogActions, dispatch),
    }
  };

  export default connect(dogState, dogDispatch)(AddDogProfile);
