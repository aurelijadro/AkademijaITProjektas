import React, { useState, useEffect } from "react";
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

import AddGroupFormContainer from "./components/Group/AddGroupFormContainer";
import EditGroupFormContainer from "./components/Group/EditGroupFormContainer";

import UserDashboard from "./components/UserDashboard";
import MainDocumentList from "./components/Document/MainDocumentList";
import { Route } from "react-router-dom";
import UserGroupsManager from "./components/User/UserGroupsManager";
import { AppDataContext } from "./context";
import Axios from "axios";
import GroupUsersManager from "./components/Group/GroupUsersManager";
import GroupDoctypeManager from "./components/Group/GroupDoctypeManager";
import ApiUrl from "./APIURL";
import DoctypesToCreateGroupsManager from "./components/Doctype/DoctypesToCreateGroupsManager";
import DoctypesToModerateGroupsManager from "./components/Doctype/DoctypesToModerateGroupsManager";
import AddMainDocumentForm from "./components/Document/AddMainDocumentForm";

function App() {
  const [currentUsername, setCurrentUsername] = useState("loading");

  function updateUserInformation() {
    Axios.get(`${ApiUrl}loggedUsername`).then(resp => {
      setCurrentUsername(resp.data);
    });
  }

  useEffect(function () {
    updateUserInformation();
    const timer = setInterval(updateUserInformation, 60000);
    return () => clearInterval(timer);
  }, []);

  const appData = {
    currentUsername: currentUsername,
    updateUserInformation: updateUserInformation
  };

  return (
    <AppDataContext.Provider value={appData}>
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
              path="/Gentoo/admin/users/edit/:userid"
              component={EditFormContainer}
            />
            <Route exact path="/Gentoo/admin/groups" component={GroupList} />
            <Route
              exact
              path="/Gentoo/admin/doctypes"
              component={DocTypeList}
            />
            <Route
              exact
              path="/Gentoo/admin/groups/add"
              component={AddGroupFormContainer}
            />
            <Route
              exact
              path="/Gentoo/admin/groups/edit/:id"
              component={EditGroupFormContainer}
            />
            <Route
              exact
              path="/Gentoo/admin/doctypes/add"
              component={AddDoctypeFormContainer}
            />
            <Route
              exact
              path="/Gentoo/admin/doctypes/edit/:doctypeid"
              component={EditDoctypeFormContainer}
            />
            <Route exact path="/Gentoo/user" component={UserDashboard} />
            <Route
              exact
              path="/Gentoo/user/documents/non-submited"
              component={MainDocumentList}
            />
            <Route
              exact
              path="/Gentoo/admin/users/manageusergroups/:userid"
              component={UserGroupsManager}
            />
            <Route
              exact
              path="/Gentoo/admin/managegroupusers/:groupid"
              component={GroupUsersManager}
            />
            <Route
              exact
              path="/Gentoo/admin/managegroupdocs/:groupid"
              component={GroupDoctypeManager}
            />{" "}
            <Route
              exact
              path="/Gentoo/admin/managecreatabledoctypegroups/:doctypeid"
              component={DoctypesToCreateGroupsManager}
            />
            <Route
              exact
              path="/Gentoo/admin/managemoderatabledoctypegroups/:doctypeid"
              component={DoctypesToModerateGroupsManager}
            />
            <Route exact path="/Gentoo/user/documents/add" component={AddMainDocumentForm} />
          </Switch>
        </div>
      </div>
    </AppDataContext.Provider>
  );
}

export default App;
