import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
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

class EditDogProfile extends Component {
  static navigationOptions = {
    title: 'EditDogProfile',
  };
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age: '',
      breed: '',
      image: null,
      pictue: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectProfilePhoto = this.selectProfilePhoto.bind(this);    
  };

  handleSubmit() {
    const { name, age, breed, picture } = this.state;
    let nameCheck = name || this.props.name;
    let ageCheck = age || this.props.age;
    let breedCheck = breed || this.props.breed;
    let pictureCheck = picture || this.props.picture;
    console.log(nameCheck, ageCheck, breedCheck, this.props.id);
    // this.props.actions.updateDogs(nameCheck, ageCheck, breedCheck, this.props.id);
    this.props.actions.getADog(this.props.id, (data) => {
      // const { name, age, breed, _id } = data;
      console.log('edit dog data', data[0]);
      if (this.state.image) {
        uploadProfilePicture(this.props.awsSauce, this.props.id, this.state.image, (err, result) => {
          if (err) {
            console.log('upload profile picture', err);
          }
          // console.log('s3 dog data', data);
          if (result) {
            pictureCheck = result.Location;
          }
          this.props.actions.updateDogs(nameCheck, ageCheck, breedCheck, this.props.id, pictureCheck, data[0], (data) => {
            console.log('updated dog data', data);
            this.props.navigation.navigate('ViewOwnerProfile');
          });
          
        });
      } else {
        this.props.actions.updateDogs(name, age, breed, this.props.id, pictureCheck, data[0], (data) => {
          console.log('updated dog data', data);
          this.props.navigation.navigate('ViewOwnerProfile');
        });
      }
    });
    
  }

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

  render() {
    const { navigate } = this.props.navigation;
    const pictureSelected = this.state.image;
    console.log('PROPS: ', this.props);
    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput
          editable
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          placeholder={this.props.name || 'enter'}
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
          placeholder={this.props.age ? this.props.age.toString() : 'enter'}
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
          placeholder={this.props.breed || 'enter'}
          returnKeyType="next"
          id="zipcode"
          onChangeText={breed => this.setState({ breed })}
        />
        {pictureSelected !== null ? (
          <Image
            style={{width: 200, height: 200}}
            source={{uri: pictureSelected.path}}
          />
        ) : (
          <Image
          style={{width: 200, height: 200}}
          source={{uri: this.props.picture}}
          />
          // <View></View>
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
      name: store.Dogs.dogs[0].name,
      age: store.Dogs.dogs[0].age,
      breed: store.Dogs.dogs[0].breed,
      id: store.Dogs.dogs[0]._id,
      picture: store.Dogs.dogs[0].pictures[0],
      userId: store.Owners.user.fb_id,
      awsSauce: store.Owners.awsSauce,
    }
  }

  const dogDispatch = (dispatch) => {
    return {
      actions: bindActionCreators(dogActions, dispatch),
    }
  };

  export default connect(dogState, dogDispatch)(EditDogProfile);
