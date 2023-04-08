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
import DistanceReducer from "./distance-reducer";
import NormsReducer from "./norms-reducer";
import NoAuthFormReducer from "./noauth-form-reducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  sleepy: SleepyReducer,
  allDocs: AllDocsReducer,
  tips: TipsReducer,
  loc: LocationReducer,
  distance: DistanceReducer,
  playgrounds: PlaygroundsReducer,
  art: ArtReducer,
  error: ErrorReducer,
  funFact: funFactReducer,
  norms: NormsReducer,
  noAuthForm: NoAuthFormReducer,
});
export default rootReducer;
