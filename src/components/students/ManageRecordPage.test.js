import React from "react";
import { mount } from "enzyme";
import { depts, newStudent, students } from "../../../tools/mockData";
import { ManageStudentPage } from "./ManageStudentPage";

function render(args) {
  const defaultProps = {
    depts,
    students,
    // Passed from React Router in real app, so just stubbing in for test.
    // Could also choose to use MemoryRouter as shown in Header.test.js,
    // or even wrap with React Router, depending on whether I
    // need to test React Router related behavior.
    history: {},
    saveStudent: jest.fn(),
    loaddepts: jest.fn(),
    loadStudents: jest.fn(),
    student: newStudent,
    match: {}
  };

  const props = { ...defaultProps, ...args };

  return mount(<ManageStudentPage {...props} />);
}

it("sets error when attempting to save an empty name field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("name is required.");
});
