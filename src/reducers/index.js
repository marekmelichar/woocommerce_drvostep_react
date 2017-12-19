import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import Auth from "./reducer_auth";

const rootReducer = combineReducers({
  auth: Auth
});

export default rootReducer;
