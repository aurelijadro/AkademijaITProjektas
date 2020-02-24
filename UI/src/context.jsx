import React from "react";

export const AppDataContext = React.createContext({
  currentUsername: "",
  updateUserInformation: () => {},
  apiUrl: ""
});

export function useMyData() {
  return React.useContext(AppDataContext);
}
