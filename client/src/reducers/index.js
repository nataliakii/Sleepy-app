import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './auth-reducer';
import SleepyReducer from './sleepy-reducer';
import AllDocsReducer from './allDocs-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  sleepy: SleepyReducer,
  allDocs: AllDocsReducer,
});
export default rootReducer;
