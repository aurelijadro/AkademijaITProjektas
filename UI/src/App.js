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
import { Route } from "react-router-dom";
import UserGroupsManager from "./components/User/UserGroupsManager";
import { AppDataContext } from "./context";
import Axios from "axios";
import GroupUsersManager from "./components/Group/GroupUsersManager";
import GroupDocsToCreateManager from "./components/Group/GroupDoctypeToCreateManager";
import GroupDocsToModerateManager from "./components/Group/GroupDoctypeToModerateManager";
import ApiUrl from "./APIURL";
import DoctypesToCreateGroupsManager from "./components/Doctype/DoctypesToCreateGroupsManager";
import DoctypesToModerateGroupsManager from "./components/Doctype/DoctypesToModerateGroupsManager";
import NewDocumentContainer from "./components/Document/NewDocumentContainer";
import ModeratorDashboard from "./components/Moderator/ModeratorDashboard";
import EditDocumentContainer from "./components/Document/EditDocumentContainer";
import ReviewDocument from "./components/Moderator/ReviewDocument";
import DocumentView from "./userComponents/DocumentView";
import Default from "./Default";
import ArchyvedDocuments from "./components/Moderator/ArchyvedDocuments";

function App() {
  const [currentUsername, setCurrentUsername] = useState("loading");

  function updateUserInformation() {
    Axios.get(`${ApiUrl}loggedUsername`).then(resp => {
      setCurrentUsername(resp.data);
    });
  }

  useEffect(function() {
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
              path="/Gentoo/admin/managegroupcreatedocs/:groupid"
              component={GroupDocsToCreateManager}
            />
            <Route
              exact
              path="/Gentoo/admin/managegroupmoderatedocs/:groupid"
              component={GroupDocsToModerateManager}
            />

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
            <Route exact path="/Gentoo/user" component={UserDashboard} />
            <Route
              exact
              path="/Gentoo/user/documents/add"
              component={NewDocumentContainer}
            />
            <Route
              exact
              path="/Gentoo/user/documents/:id"
              component={EditDocumentContainer}
            />

            <Route
              exact
              path="/Gentoo/user/moderate"
              component={ModeratorDashboard}
            />
            <Route
              exact
              path="/Gentoo/user/moderate/:docId"
              component={ReviewDocument}
            />

            <Route
              exact
              path="/Gentoo/user/view/:docId"
              component={DocumentView}
            />

            <Route
              exact
              path="/Gentoo/user/archyved"
              component={ArchyvedDocuments}
            />

            <Route
              exact
              path="/Gentoo/user/archyved/:docId"
              component={DocumentView}
            />

            <Route component={Default} />
          </Switch>
        </div>
      </div>
    </AppDataContext.Provider>
  );
}

export default App;
