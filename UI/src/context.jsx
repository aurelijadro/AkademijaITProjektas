import React from "react";

export const AppDataContext = React.createContext({
  loggedUser: {},
  setLoggedUSer: () => {}
});

export function useMyData() {
  return React.useContext(AppDataContext);
}
