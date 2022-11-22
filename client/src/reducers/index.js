import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './auth-reducer';
import SleepyReducer from './sleepy-reducer';
// import MainReducer from './main-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  sleepy: SleepyReducer,
});
export default rootReducer;
