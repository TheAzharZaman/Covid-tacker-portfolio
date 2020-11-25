import { LayersClear } from "@material-ui/icons";
import React, { createContext, useContext, useReducer } from "react";

// Preparing the data Layers

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
