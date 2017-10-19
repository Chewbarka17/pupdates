const initialState = {
  dogs: [],
  fetching: false,
  fetched: false,
  // posting: false,
  // posted: false,
  // updating: false,
  // updated: false,
  deleting: false,
  deleted: false,
  error: null
}

const dogReducer = (state=initialState, action) => {
  switch(action.type) {

    case 'FETCH_DOGS_LIKED_PENDING': {
      return Object.assign({}, state, {fetching: true});
    }

    case 'FETCH_DOGS_LIKED_REJECTED': {
      return Object.assign({}, state, {fetching: false, error: action.payload});
    }

    case 'FETCH_DOGS_LIKED_FULFILLED': {
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        dogs: action.payload
      }) 
    }

    case 'FETCH_DOG_PENDING': {
      return Object.assign({}, state, {fetching: true});
    }

    case 'FETCH_DOG_REJECTED': {
      return Object.assign({}, state, {fetching: false, error: action.payload});
    }

    case 'FETCH_DOG_FULFILLED': {
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        dogs: action.payload
      }) 
    }

    case 'DELETE_DOG_PENDING': {
      return Object.assign({}, state, {deleting: true});
    }

    case 'DELETE_DOG_REJECTED': {
      return Object.assign({}, state, {deleting: false, error: action.payload});
    }

    case 'DELETE_DOG_FULFILLED': {
      return Object.assign({}, state, {
        deleting: false,
        deleted: true,
        dogs: state.dogs.filter(dog => {
          return dog.id === Number(action.payload.id) ? null : dog; // dog.id (???)
        })
      })
    }
  }
  
  return state;
}

export default dogReducer; 