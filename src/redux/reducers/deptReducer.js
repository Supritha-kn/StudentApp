import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function deptReducer(state = initialState.depts, action) {
  switch (action.type) {
    case types.LOAD_DEPTS_SUCCESS:
      return action.depts;
    default:
      return state;
  }
}
