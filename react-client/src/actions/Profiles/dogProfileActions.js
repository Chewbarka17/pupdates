import axios from 'axios';

export const getADog = (dogid, callback) => (dispatch) => {
  axios.get(`http://localhost:8000/api/dogs/${dogid}`)
    .then((response) => {
      dispatch({ type: 'FETCH_DOG_FULFILLED', payload: response.data });
      callback(response.data);
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_DOG_REJECTED', payload: err });
    });
};

export const postDogs = (name, age, breed, gender, bio, owner, pictures, callback) => (dispatch) => {
  axios.post('http://localhost:8000/api/dogs', {
    name,
    age,
    breed,
    gender,
    bio,
    owner,
    pictures,
  })
    .then((response) => {
      dispatch({ type: 'POST_DOG_FULFILLED', payload: response.data });
      callback(response.data);
    })
    .catch((err) => {
      dispatch({ type: 'POST_DOG_REJECTED', payload: err });
    });
};

export const updateDogs = (name, age, breed, gender, bio, dogid, pictures, data) => (dispatch) => {
  axios.patch(`http://localhost:8000/api/dogs/${dogid}`, {
    name,
    age,
    breed,
    gender,
    bio,
    pictures,
  })
    .then((response) => {
      console.log('edited', response)
      // const dog = JSON.parse(response.config.data);
      // data.name = dog.name;
      // data.age = dog.age;
      // data.breed = dog.breed;
      // data.gender = dog.gender;
      // data.bio = dog.bio;
      // data.pictures[0] = dog.pictures;
      dispatch({ type: 'UPDATE_DOG_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_DOG_REJECTED', payload: err });
    });
};

export const deleteDogs = (dogid, uid) => (dispatch) => {
  axios({
    method: 'delete',
    url: `http://localhost:8000/api/dogs/${dogid}`,
    data: {
      owner: uid,
      dogid,
    },
  })
    .then(() => {
      dispatch({ type: 'DELETE_DOG_FULFILLED', payload: dogid });
    })
    .catch((err) => {
      dispatch({ type: 'DELETE_DOG_REJECTED', payload: err });
    });
};

export const showDog = dog => (dispatch) => {
  dispatch({ type: 'SHOW_DOG', payload: dog });
};
