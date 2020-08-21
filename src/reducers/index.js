import currentUser from './currentUser';
import search from './search'
import home from './home'

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  currentUser,
  search,
  home,
});

export default rootReducer;
