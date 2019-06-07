import studentReducer from "./studentReducer";
import * as actions from "../actions/studentActions";

it("should add student when passed CREATE_STUDENT_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      title: "A"
    },
    {
      title: "B"
    }
  ];

  const newStudent = {
    title: "C"
  };

  const action = actions.createStudentSuccess(newStudent);

  // act
  const newState = studentReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});

it("should update student when passed UPDATE_student_SUCCESS", () => {
  // arrange
  const initialState = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
    { id: 3, title: "C" }
  ];

  const student = { id: 2, title: "New Title" };
  const action = actions.updateStudentSuccess(student);

  // act
  const newState = studentReducer(initialState, action);
  const updatedStudent = newState.find(a => a.id == student.id);
  const untouchedStudent = newState.find(a => a.id == 1);

  // assert
  expect(updatedStudent.title).toEqual("New Title");
  expect(untouchedStudent.title).toEqual("A");
  expect(newState.length).toEqual(3);
});
