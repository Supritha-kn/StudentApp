import * as studentActions from "./studentActions";
import * as types from "./actionTypes";
import { students } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Students Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_STUDENTS_SUCCESS when loading students", () => {
      fetchMock.mock("*", {
        body: students,
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_STUDENTS_SUCCESS, students }
      ];

      const store = mockStore({ students: [] });
      return store.dispatch(studentActions.loadStudents()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("createStudentSuccess", () => {
  it("should create a CREATE_STUDENT_SUCCESS action", () => {
    //arrange
    const student = students[0];
    const expectedAction = {
      type: types.CREATE_STUDENT_SUCCESS,
      student
    };

    //act
    const action = studentActions.createStudentSuccess(student);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
