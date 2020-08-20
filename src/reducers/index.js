import currentUser from './currentUser';
import search from './search'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  currentUser,
  search,
});

export default rootReducer;
