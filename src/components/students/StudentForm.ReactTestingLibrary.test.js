import React from "react";
import { cleanup, render } from "react-testing-library";
import StudentForm from "./StudentForm";

afterEach(cleanup);

function renderStudentForm(args) {
  let defaultProps = {
    depts: [],
    student: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<StudentForm {...props} />);
}

it("should render Add Student header", () => {
  const { getByText } = renderStudentForm();
  getByText("Add Student");
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderStudentForm();
  getByText("Save");
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText } = renderStudentForm({ saving: true });
  // debug();
  getByText("Saving...");
});
