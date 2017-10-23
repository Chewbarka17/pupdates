import action from '../../actions/ViewDogs/viewDogsActions';

const initialState = {
  dogs: [],
  fetched: false,
  deleted: false,
  error: null
}

const viewDogReducer = (state=initialState, action) => {
  console.log('what is actions', action);
  switch(action.type) {
    case 'FETCH_ALL_DOGS_FULFILLED': {
      return Object.assign({}, state, {
        fetched: true,
        dogs: action.payload
      }); 
    }

    case 'FETCH_ALL_DOGS_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload
      });
    }
  }
  return state;
}

export default viewDogReducer; 