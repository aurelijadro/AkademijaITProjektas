import React, { useEffect, useState } from "react";
import NavigationForUser from "../NavigationForUser";
import ApiUrl from "../../APIURL";
import Axios from "axios";

const ModeratorDashboard = () => {
  // solve a riddle of how to correctly show users menu bar

  // get list of documents to moderate

  const [documentsToModerate, setDocumentsToModerate] = useState("loading");

  // useEffect(){
  //   function getDocumentsToModerate(){

  //   }
  // }

  // button to review document

  if (documentsToModerate === "loading") {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div>
      <NavigationForUser />
      <div className="container">
        <h1>Moderatoriaus langas!</h1>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
