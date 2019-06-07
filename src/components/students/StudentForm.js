import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
//import DatePick from "../common/DatePicker";
import { NavLink } from "react-router-dom";

const StudentForm = ({
  student,
  depts,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{student.id ? "Edit" : "Add"} student</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Student Name"
        value={student.name}
        onChange={onChange}
        error={errors.name}
      />
      <TextInput
        name="FatherName"
        label="Father"
        value={student.FatherName}
        onChange={onChange}
        error={errors.FatherName}
      />
      <TextInput
      name="Address"
      label="Address"
      value={student.Address}
      onChange={onChange}
      error={errors.Address}
    />

      <SelectInput
        name="deptId"
        label="Dept"
        value={student.deptId || ""}
        defaultOption="Select dept"
        options={depts.map(dept => ({
          value: dept.id,
          text: dept.name
        }))}
        onChange={onChange}
        error={errors.dept}
      />

      <TextInput
        name="phno"
        label="Phone Number"
        value={student.phno}
        onChange={onChange}
        error={errors.phno}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>&nbsp;
      <button type="reset" className="btn btn-primary">
        Clear
      </button><br/>
      <nav>
      <NavLink to="/" >
        Back
      </NavLink>
    </nav>
    </form>
  );
};

StudentForm.propTypes = {
  depts: PropTypes.array.isRequired,
  student: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default StudentForm;
