import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadStudents, saveStudent } from "../../redux/actions/studentActions";
import { loadDepts } from "../../redux/actions/deptActions";
import PropTypes from "prop-types";
import StudentForm from "./StudentForm";
import { newStudent } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageStudentPage({
  students,
  depts,
  loadDepts,
  loadStudents,
  saveStudent,
  history,
  ...props
}) {
  const [student, setStudent] = useState({ ...props.student });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (students.length === 0) {
      loadStudents().catch(error => {
        alert("Loading student failed" + error);
      });
    } else {
      setStudent({ ...props.student});
    }

    if (depts.length === 0) {
      loadDepts().catch(error => {
        alert("Loading depts failed" + error);
      });
    }
  }, [props.student]);

  function handleChange(event) {
    const { name, value } = event.target;
    setStudent(prevStudent => ({
      ...prevStudent,
      [name]: name === "deptId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { name, deptId} = student;
    const errors = {};

    if (!name) errors.name = "name is required.";
    if (!deptId) errors.dept = "Dept is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveStudent(student)
      .then(() => {
        toast.success("Student saved.");
        history.push("/");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return depts.length === 0 || students.length === 0 ? (
    <Spinner />
  ) : (
    <StudentForm
      student={student}
      errors={errors}
      depts={depts}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageStudentPage.propTypes = {
  student: PropTypes.object.isRequired,
  depts: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  loadStudents: PropTypes.func.isRequired,
  loadDepts: PropTypes.func.isRequired,
  saveStudent: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getStudentBySlug(students, slug) {
  return students.find(student => student.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const student =
    slug && state.students.length > 0
      ? getStudentBySlug(state.students, slug)
      : newStudent;
  return {
    student,
    students: state.students,
    depts: state.depts
  };
}

const mapDispatchToProps = {
  loadStudents,
  loadDepts,
  saveStudent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageStudentPage);
