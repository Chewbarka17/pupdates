import { combineReducers } from 'redux';
import Dogs from './Profiles/dogReducers';
import ViewDogs from './ViewDogs/viewDogsReducers';
import Rooms from './MessageReducers/ChatRoomReducers';
import Owners from './Profiles/ownerReducers';

const PupdatesReducers = combineReducers({
  Dogs,
  ViewDogs,
  Rooms,
  Owners
});

export default PupdatesReducers;
