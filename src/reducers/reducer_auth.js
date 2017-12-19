// import _ from "lodash";
// import { FETCH_POSTS, FETCH_POST, DELETE_POST, TEST_AUTH } from "../actions";

import { AUTH } from "../actions";

let INIT_STATE = {
  payload: false
}

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    // case DELETE_POST:
    //   // return _.omit(state, action.payload);
    // case FETCH_POST:
    //   return { ...state, [action.payload.data.id]: action.payload.data };
    // case FETCH_POSTS:
    //   return {
    //     data: action.payload.data
    //   }
    // case TEST_AUTH:
    //   return {
    //     test_auth: action.payload
    //   }

    case AUTH:
      return {
        payload: action.payload
      }

    default:
      return state;
  }
}
