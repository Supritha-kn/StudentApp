import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const studentList = ({ students, onDeleteClick, /*searchStudent*/
}) => (

  <table className="table">
    <thead>
      <tr>
        <th>Student Id</th>
        <th>Student Name</th>
        <th>Father Name</th>
        <th>Department</th>
        <th>Phone Number</th>
        <th>City</th>        
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {students.map(student => {
        return (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.FatherName}</td>
            <td>{student.deptName}</td>
            <td>{student.phno}</td>
            <td>{student.Address}</td>
            <td>
            {<Link  className="btn btn-primary" to={"/student/" + student.slug}>Edit</Link>}
            </td>
            <td>
            <img style={{maxWidth: '50px'}} src={"./tools/img/delete.png"} onClick={() => onDeleteClick(student)}  />
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

studentList.propTypes = {
  students: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}
export default studentList;
