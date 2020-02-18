import React from "react";

export const AppDataContext = React.createContext({
  currentUsername: ""
});

export function useMyData() {
  return React.useContext(AppDataContext);
}
