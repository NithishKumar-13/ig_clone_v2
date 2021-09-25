import React, { useEffect, useReducer, createContext, useContext } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START": {
      return { ...state, isLoading: true, error: null, user: null };
    }
    case "LOGIN_SUCCESS": {
      return { ...state, isLoading: false, error: null, user: action.payload };
    }
    case 'LOGOUT': {
      return { ...state, isLoading: false, error:null, user: null }
    }
    default:
      return state;
  }
};

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const value = {
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("consumer must be wrapped inside context provider");
  }
  return context;
};

export { AuthProvider, useAuth };
