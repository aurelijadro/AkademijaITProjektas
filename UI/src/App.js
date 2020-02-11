import React from "react";
import Login from "./components/Login";
import "./App.css";
import { Switch } from "react-router";
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
import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />

      <div className="container-fluid mx-auto">
        <Switch>
          <Route exact path="/Gentoo/" component={Login} />
          <Route exact path="/Gentoo/admin" component={AdminDashboard} />
          <Route exact path="/Gentoo/admin/users" component={UserList} />
          <Route
            exact
            path="/Gentoo/admin/users/add"
            component={CreateUserForm}
          />
          <Route
            exact
            path="/Gentoo/admin/users/edit/:username"
            component={EditFormContainer}
          />
          <Route exact path="/Gentoo/admin/groups" component={GroupList} />
          <Route exact path="/Gentoo/admin/doctypes" component={DocTypeList} />
          <Route
            exact
            path="/Gentoo/admin/doctypes/add"
            component={AddDoctypeFormContainer}
          />
          <Route
            exact
            path="/Gentoo/admin/doctypes/edit/:title"
            component={EditDoctypeFormContainer}
          />
          <Route exact path="/Gentoo/user" component={UserDashboard} />
          <Route
            exact
            path="/Gentoo/user/documents/non-submited"
            component={MainDocumentList}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
