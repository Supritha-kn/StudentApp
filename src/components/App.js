import React from "react";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import StudentsPage from "./students/StudentsPage";
import ManageStudentpage from "./students/ManageStudentPage"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className = "container">
      <Switch>
        <Route exact path="/" component={StudentsPage} />
        <Route path="/student/:slug" component={ManageStudentpage} />
        <Route path="/student" component={ManageStudentpage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
