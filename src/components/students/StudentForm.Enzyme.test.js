import React from "react";
import StudentForm from "./StudentForm";
import { shallow } from "enzyme";

function renderStudentForm(args) {
  const defaultProps = {
    depts: [],
    student: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<StudentForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderStudentForm();
  // console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add student");
});

it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderStudentForm();
  expect(wrapper.find("button").text()).toBe("Save");
});

it('labels save button as "Saving..." when saving', () => {
  const wrapper = renderStudentForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});
