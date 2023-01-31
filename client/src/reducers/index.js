import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./auth-reducer";
import SleepyReducer from "./sleepy-reducer";
import AllDocsReducer from "./allDocs-reducer";
import TipsReducer from "./tips-reducer";
import LocationReducer from "./loc-reducer";
import ArtReducer from "./art-reducer";
import PlaygroundsReducer from "./playgrounds-reducer";
import ErrorReducer from "./error-reducer";
import funFactReducer from "./funFact-reducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  sleepy: SleepyReducer,
  allDocs: AllDocsReducer,
  tips: TipsReducer,
  loc: LocationReducer,
  playgrounds: PlaygroundsReducer,
  art: ArtReducer,
  error: ErrorReducer,
  funFact: funFactReducer,
});
export default rootReducer;
