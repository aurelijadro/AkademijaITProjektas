import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/Login";
import "./App.css";
import { serverDovanaToClientDovana } from "./model/dovanos";
import { Switch, Route } from "react-router";
import { AppDataContext } from "./context";
import Header from "./components/Header";
import AdminDashboard from "./components/AdminDashboard";
import UserList from "./components/User/UserList";
import GroupList from "./components/Group/GroupList";
import DocTypeList from "./components/Doctype/DocTypeList";
import CreateUserForm from "./components/User/CreateUserForm";
import EditUserForm from "./non-used-components/EditUserForm";
import EditFormContainer from "./components/User/EditFormContainer";
import EditDoctypeFormContainer from "./components/Doctype/EditDoctypeFormContainer";
import AddDoctypeFormContainer from "./components/Doctype/AddDoctypeFormContainer";
import UserDashboard from "./components/UserDashboard";
import MainDocumentList from "./components/Document/MainDocumentList";

// function ProductPage() {
//   const appData = useContext(AppDataContext);
//   return <div>Show a product: {appData.products.join(", ")}</div>;
// }

function App() {
  const [dovanos, setDovanos] = useState("loading");
  const [letters, setLetters] = useState("loading");

  const url = "http://localhost:8080";
  //const url = "http://localhost:8081/dovanos";

  const refreshProducts = () => {
    fetch(url + "/api/dovanos")
      .then(res => {
        if (!res.ok) throw new Error(`response status ${res.status}`);
        return res.json();
      })
      .then(dovanos => {
        setDovanos(dovanos.map(serverDovanaToClientDovana));
      });
  };

  // const refreshLetters = () => {
  //   fetch(url + "/api/letters")
  //     .then(res => {
  //       if (!res.ok) throw new Error(`response status ${res.status}`);
  //       return res.json();
  //     })
  //     .then(letters => {
  //       setLetters(letters.map(serverLetterToClientLetter));
  //     });
  // };

  const appData = {
    dovanos: dovanos,
    refreshProducts: refreshProducts,
    setDovanos: setDovanos,
    letters: letters,
    // refreshLetters: refreshLetters,
    setLetters: setLetters
  };

  // useEffect(refreshProducts, []);
  // useEffect(refreshLetters, []);

  return (
    <AppDataContext.Provider value={appData}>
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
    </AppDataContext.Provider>
  );
}

export default App;
