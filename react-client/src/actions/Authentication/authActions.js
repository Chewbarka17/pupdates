import axios from 'axios';
import { StackNavigator, NavigationActions } from 'react-navigation';

import { AsyncStorage } from 'react-native';

export const getOwner = (fb, navigate) => (dispatch) => {
  console.log('fb data', fb);
  axios.get('http://localhost:8000/api/users/' + fb.id)
  .then(({data}) => {
    // console.log('What is login screen', LoginScreen);
    
    console.log('User retrieved from data base', data);
    if (data.length === 0) {
      addUserToDB(fb, navigate);
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
    console.log('User not in db, adding user to db', err)
    addUserToDB(fb);
  });
};

const addUserToDB = (fb, navigate) => {
  const user = {
    fb_id: fb.id,
    name: fb.name,
    picture: fb.picture.data.url
  }
  console.log('add user to db', user);
  axios.post('http://localhost:8000/api/users', user)
  .then(({data}) => {
    console.log(data);
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
