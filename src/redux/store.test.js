import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as studentActions from "./actions/studentActions";

it("Should handle creating students", function() {
  // arrange
  const store = createStore(rootReducer, initialState);
  const student = {
    title: "Clean Code"
  };

  // act
  const action = studentActions.createStudentSuccess(student);
  store.dispatch(action);

  // assert
  const createdStudent = store.getState().students[0];
  expect(createdSTudent).toEqual(student);
});
