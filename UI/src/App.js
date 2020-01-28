import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/Login";
import "./App.css";
import { serverDovanaToClientDovana } from "./model/dovanos";
import { Switch, Route } from "react-router";
import { AppDataContext } from "./context";
import Header from "./components/Header";
import AdminDashboard from "./components/AdminDashboard";
import UserList from "./components/UserList";
import NavigationForAdmin from "./components/NavigationForAdmin";
import GroupList from "./components/GroupList";
import DocTypeList from "./components/DocTypeList";
import CreateUserForm from "./components/CreateUserForm";
import EditUserForm from "./components/EditUserForm";
import EditFormContainer from "./components/EditFormContainer";

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

      <div className="container mx-auto">
        <Switch>
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/admin/users" component={UserList} />
          <Route exact path="/admin/users/add" component={CreateUserForm} />
          <Route exact path="/admin/users/edit/:username" component={EditFormContainer} />
          <Route exact path="/admin/groups" component={GroupList} />
          <Route exact path="/admin/doctypes" component={DocTypeList} />
        </Switch>
      </div>
    </AppDataContext.Provider>
  );
}

export default App;
