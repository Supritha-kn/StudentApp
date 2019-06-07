import * as types from "./actionTypes";
import * as deptApi from "../../api/deptApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadDeptsSuccess(depts) {
  return { type: types.LOAD_DEPTS_SUCCESS, depts };
}

export function loadDepts() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return deptApi
      .getDepts()
      .then(depts => {
        dispatch(loadDeptsSuccess(depts));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
