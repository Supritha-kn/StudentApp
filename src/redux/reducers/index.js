import { combineReducers } from "redux";
import students from "./studentReducer";
import depts from "./deptReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  students,
  depts,
  apiCallsInProgress
});

export default rootReducer;
