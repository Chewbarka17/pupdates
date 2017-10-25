import axios from 'axios';
import { StackNavigator, NavigationActions } from 'react-navigation';

import { AsyncStorage } from 'react-native';

export const getOwnerFromDB = (fb, navigate, callback) => (dispatch) => {
  // console.log('fb data', fb);
  axios.get('http://localhost:8000/api/users/' + fb.id)
  .then(({data}) => { 
    console.log('User retrieved from data base', data);
    if (data.length === 0) {
      callback('User doesn\'t exist in collection');
    } else {
      dispatch({type: 'GET_OWNER_FROM_MONGO_FULFILLED', payload: data});
      AsyncStorage.setItem('mongoOwner', JSON.stringify(data), (error) => {
        if (error) {
          alert('Failure! Could not save user to async storage', error);
        }
      });
      navigate('DrawerMenu');
    }
  })
  .catch((err) => {
    callback('User doesn\'t exist in collection');
  });
};

export const addOwnerToDB = (fb, navigate) => (dispatch) => {
  const user = {
    fb_id: fb.id,
    name: fb.name,
    picture: fb.picture.data.url
  }
  // console.log('add user to db', user);
  axios.post('http://localhost:8000/api/users', user)
  .then(({data}) => {
    console.log('data is posted ', data);
    dispatch({type: 'POST_OWNER_FROM_MONGO_FULFILLED', payload: data});
    AsyncStorage.setItem('mongoOwner', JSON.stringify(data), (error) => {
      if (error) {
        alert('Failure! Could not save user to async storage', error);
      }
    });
    navigate('DrawerMenu');
  })
  .catch((err) => {
    dispatch({type: 'POST_OWNER_FROM_MONGO_REJECTED', payload: err});
    console.log(err);
  });
}

export default (getOwnerFromDB)(addOwnerToDB);
