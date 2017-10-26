import { combineReducers } from 'redux';
import Dogs from './Profiles/dogReducers';
import ViewDogs from './ViewDogs/viewDogsReducers';
import Rooms from './MessageReducers/ChatRoomReducers';
import Owners from './Profiles/ownerReducers';
import Auth from './Authentication/authReducers';

const PupdatesReducers = combineReducers({
  Dogs,
  ViewDogs,
  Rooms,
  Owners,
  Auth,
});

export default PupdatesReducers;
