import React, { createContext, useState, useContext } from "react";

// Create context for authentication
const AuthContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // Initial authentication state
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
  });

  // Function to handle user login
  const login = (token, user) => {
    setAuthState({ token, user });
    localStorage.setItem("token", token); // Store token in localStorage
  };

  // Function to handle user logout
  const logout = () => {
    setAuthState({ token: null, user: null });
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  // Provide authState, login, and logout functions to the context
  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
