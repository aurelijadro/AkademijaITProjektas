import React from "react";

export const AppDataContext = React.createContext({
  dovanos: [],
  setDovanos: () => {},
  refreshItem: () => {}
});

export function useMyData() {
  return React.useContext(AppDataContext);
}
