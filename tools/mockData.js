const students = [
  {
    id: 1,
    name: "Sampath",
    slug: "sampath",
    deptId: 1,
    FatherName: "Raju",
    phno: 9560323232,
    Address: "Mysore"
  },
  {
    id: 2,
    name: "chiranth",
    slug: "chiranth",
    deptId: 2,
    FatherName: "john",
    phno: 9560473232,
    Address: "Gulbarga"
  }
];

const depts = [
  { id: 1, name: "CS" },
  { id: 2, name: "EC" },
  { id: 3, name: "IS" },
  { id: 4, name: "EE" }
];

const newStudent = {
  id: null,
  name: "",
  deptId: null,
  Address: "",
  FatherName:"",
  phno:""
  };

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newStudent,
  students,
  depts
};
