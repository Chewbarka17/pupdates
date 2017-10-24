import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const postOwners = (name, age, location, bio) => (dispatch) => {
  console.log('axios post', typeof age, age);
  axios.post('http://localhost:8000/api/users', {
    name,
    age,
    location,
    bio,
    picture: 'http://www.readersdigest.ca/wp-content/uploads/2011/01/4-ways-cheer-up-depressed-cat.jpg',
    rating: 4,
  })
    .then((response) => {
      console.log('owner action', typeof response.data.age);
      dispatch({ type: 'POST_OWNER_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'POST_OWNER_REJECTED', payload: err });
    });
};

export const updateOwners = (name, age, location, bio, userid) => (dispatch) => {
  axios.patch('http://localhost:8000/api/users', {
    id: userid,
    name,
    age,
    location,
    bio,
    picture: 'http://www.readersdigest.ca/wp-content/uploads/2011/01/4-ways-cheer-up-depressed-cat.jpg', // to be changed
    rating: 4, // to be changed
  })
    .then((response) => {
      dispatch({ type: 'UPDATE_OWNER_FULFILLED', payload: response });
      AsyncStorage.setItem('mongoOwner', JSON.stringify(response), (error) => {
        if (error) {
          console.log('Failure! Could not save user to async storage during update', error);
        }
      });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_OWNER_REJECTED', payload: err });
    });
};

