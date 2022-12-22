import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './auth-reducer';
import SleepyReducer from './sleepy-reducer';
import AllDocsReducer from './allDocs-reducer';
import TipsReducer from './tips-reducer';
import LocationReducer from './loc-reducer';
import ArtReducer from './art-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  sleepy: SleepyReducer,
  allDocs: AllDocsReducer,
  tips: TipsReducer,
  loc: LocationReducer,
  art: ArtReducer,
});
export default rootReducer;
