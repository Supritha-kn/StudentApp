import React from "react";
import { connect } from "react-redux";
import * as studentActions from "../../redux/actions/studentActions";
import * as deptActions from "../../redux/actions/deptActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import StudentList from "./StudentList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class StudentsPage extends React.Component {
  state = {
    redirectToAddstudentPage: false
  };

  componentDidMount() {
    const { students, depts, actions} = this.props;

    if (students.length === 0) {
      actions.loadStudents().catch(error => {
        alert("Loading students failed" + error);
      });
    }

    if (depts.length === 0) {
      actions.loadDepts().catch(error => {
        alert("Loading depts failed" + error);
      });
    }
  }

  handleDeleteStudent = async student => {
    toast.success("Student deleted");
    try {
      await this.props.actions.deleteStudent(student);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddStudentPage && <Redirect to="/student" />}
        <h3>Student Records</h3><br/>
        
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <StudentList
              onDeleteClick={this.handleDeleteStudent}
              students={this.props.students}
            />

            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary"
              onClick={() => this.setState({ redirectToAddStudentPage: true })}
            >
              Add Student
            </button>
          </>
        )}
      </>
    );
  }
}

StudentsPage.propTypes = {
  depts: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    students:
      state.depts.length === 0
        ? []
        : state.students.map(student => {
            return {
              ...student,
              deptName: state.depts.find(a => a.id === student.deptId).name
            };
          }),
    depts: state.depts,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadStudents: bindActionCreators(studentActions.loadStudents, dispatch),
      loadDepts: bindActionCreators(deptActions.loadDepts, dispatch),
      deleteStudent: bindActionCreators(studentActions.deleteStudent, dispatch),
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsPage);