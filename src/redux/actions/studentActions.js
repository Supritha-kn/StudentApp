import * as types from "./actionTypes";
import * as studentApi from "../../api/studentApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadStudentSuccess(students) {
  return { type: types.LOAD_STUDENTS_SUCCESS, students };
}

export function createStudentSuccess(student) {
  return { type: types.CREATE_STUDENT_SUCCESS, student };
}

export function updateStudentSuccess(student) {
  return { type: types.UPDATE_STUDENT_SUCCESS, student };
}

export function deleteStudentOptimistic(student) {
  return { type: types.DELETE_STUDENT_OPTIMISTIC, student };
}

export function searchStudentSuccess(val){
  return {type: types.SEARCH_STUDENT_SUCCESS,val}
}

export function loadStudents() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return studentApi
      .getStudents()
      .then(students => {
        dispatch(loadStudentSuccess(students));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveStudent(student) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return studentApi
      .saveStudent(student)
      .then(savedStudent => {
        student.id
          ? dispatch(updateStudentSuccess(savedStudent))
          : dispatch(createStudentSuccess(savedStudent));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteStudent(student) {
  return function(dispatch) {
    dispatch(deleteStudentOptimistic(student));
    return studentApi.deleteStudent(student.id);
  };
}

export function searchStudent(searchval){
  return function(dispatch){
    dispatch(searchStudentSuccess(searchval));
  };
}
