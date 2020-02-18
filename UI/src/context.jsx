import React from "react";

export const AppDataContext = React.createContext({
  currentUsername: "",
  updateUserInformation: () => {}
});

export function useMyData() {
  return React.useContext(AppDataContext);
}
