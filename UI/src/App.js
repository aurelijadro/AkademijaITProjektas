import React from "react";
import Login from "./components/Login";
import "./App.css";
import { Switch, Route } from "react-router";
import Header from "./components/Header";
import AdminDashboard from "./components/AdminDashboard";
import UserList from "./components/User/UserList";
import GroupList from "./components/Group/GroupList";
import DocTypeList from "./components/Doctype/DocTypeList";
import CreateUserForm from "./components/User/CreateUserForm";
import EditFormContainer from "./components/User/EditFormContainer";
import EditDoctypeFormContainer from "./components/Doctype/EditDoctypeFormContainer";
import AddDoctypeFormContainer from "./components/Doctype/AddDoctypeFormContainer";
import UserDashboard from "./components/UserDashboard";
import MainDocumentList from "./components/Document/MainDocumentList";

function App() {

  return (
    <div>
      <Header />
      <Route exact path="/" component={Login} />

      <div className="container-fluid mx-auto">
        <Switch>
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/admin/users" component={UserList} />
          <Route exact path="/admin/users/add" component={CreateUserForm} />
          <Route exact path="/admin/users/edit/:username" component={EditFormContainer} />
          <Route exact path="/admin/groups" component={GroupList} />
          <Route exact path="/admin/doctypes" component={DocTypeList} />
          <Route exact path="/admin/doctypes/add" component={AddDoctypeFormContainer} />
          <Route exact path="/admin/doctypes/edit/:title" component={EditDoctypeFormContainer} />
          <Route exact path="/user" component={UserDashboard} />
          <Route exact path="/user/documents/non-submited" component={MainDocumentList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
