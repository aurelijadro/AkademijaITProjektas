import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductListComponent from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import AdminPanel from "./components/AdminPanel";
import ProductAdministrationComponent from "./components/ProductAdministration";
import Login from "./components/Login";
import "./App.css";
import { Nav } from "./components/NavBar";
import { serverDovanaToClientDovana } from "./model/dovanos";
import { serverLetterToClientLetter } from "./model/letters";
import { Switch, Route } from "react-router";
import { AppDataContext } from "./context";
import Header from "./components/Header";

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

  const refreshLetters = () => {
    fetch(url + "/api/letters")
      .then(res => {
        if (!res.ok) throw new Error(`response status ${res.status}`);
        return res.json();
      })
      .then(letters => {
        setLetters(letters.map(serverLetterToClientLetter));
      });
  };

  const appData = {
    dovanos: dovanos,
    refreshProducts: refreshProducts,
    setDovanos: setDovanos,
    letters: letters,
    refreshLetters: refreshLetters,
    setLetters: setLetters
  };

  useEffect(refreshProducts, []);
  useEffect(refreshLetters, []);

  return (
    <AppDataContext.Provider value={appData}>
      <Header />
      <Login />
      <div className="container mx-auto">
        <Switch>
          <Route path="/dovanos" exact component={ProductListComponent} />
          <Route path="/dovanos/:id" exact component={ProductPage} />
          <Route path="/admin" exact component={AdminPanel} />
          <Route
            path="/admin/dovanos/new"
            exact
            component={ProductAdministrationComponent}
          />
          <Route
            path="/admin/dovanos/:id"
            exact
            component={ProductAdministrationComponent}
          />
        </Switch>
      </div>
    </AppDataContext.Provider>
  );
}

export default App;
