import { createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {  // 👈 name matches import
  const value = {}; // add shared state here later

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
