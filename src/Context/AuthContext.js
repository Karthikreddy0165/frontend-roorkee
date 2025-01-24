import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
  });

  const login = (token, user) => {
    setAuthState({ token, user });
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuthState({ token: null, user: null });
    localStorage.removeItem("token");
  };

  // Function to make an authenticated request
  const makeRequest = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, options);
      if (response.status === 401) {
        logout(); // Log out if the token is invalid
      }
      return response;
    } catch (error) {
      console.error("Request failed", error);
      throw error;
    }
  };

  // Restore token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setAuthState({ token: storedToken, user: null });
    }
  }, []);

  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [UID, setUID] = useState("");

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
        makeRequest,
        resetPasswordToken,
        setResetPasswordToken,
        UID,
        setUID,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
