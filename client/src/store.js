import React, { createContext, useReducer } from "react";

const initialState = { loading: null, prased: null };
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, { type, payload }) => {
    switch (type) {
      case "START_PARSING":
        return {
          ...state,
          loading: true,
          parsed: null,
        };
      case "RESUME_PARSED":
        return {
          ...state,
          parsed: payload,
          loading: false,
        };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
