import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    refreshToken: null,
    user: null,
  });

  const login = (token, refreshToken, user) => {
    setAuthState({ token, refreshToken, user });
    localStorage.setItem("token", token); 
    localStorage.setItem("refreshToken", refreshToken); 
  };

  const logout = () => {
    setAuthState({ token: null, refreshToken: null, user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  const refreshToken = async () => {
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (!storedRefreshToken) return;

    try {
      const response = await fetch("http://13.201.99.1:8000//api/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      });
      const data = await response.json();

      if (data.token) {
        setAuthState(prevState => ({
          ...prevState,
          token: data.token,
        }));
        localStorage.setItem("token", data.token); // Update login token in localStorage
        return data.token;
      } else {
        logout(); // If refresh fails, log out the user
        return null;
      }
    } catch (error) {
      console.error("Failed to refresh token", error);
      logout();
      return null;
    }
  };

  // Function to make an authenticated request with retry on token refresh
  const makeRequest = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    if (token) {
      options.headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, options);
      if (response.status === 401) { // Unauthorized
        const newToken = await refreshToken();
        if (newToken) {
          // Retry the request with the new token
          options.headers["Authorization"] = `Bearer ${newToken}`;
          return fetch(url, options);
        }
      }
      return response;
    } catch (error) {
      console.error("Request failed", error);
      throw error;
    }
  };

  // Check if user is authenticated on component mount and set up interval to refresh token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    
    if (storedToken) {
      // Check token validity and refresh if needed
      const checkTokenValidity = async () => {
        try {
          const response = await fetch("http://13.201.99.1:8000//api/check-token", {
            headers: {
              "Authorization": `Bearer ${storedToken}`,
            },
          });

          if (response.status === 401) { // Unauthorized
            await refreshToken();
          } else {
            setAuthState({
              token: storedToken,
              refreshToken: storedRefreshToken,
              user: null, // Optionally, fetch user data here
            });
          }
        } catch (error) {
          console.error("Failed to check token", error);
          logout();
        }
      };

      checkTokenValidity();
    }

    const noOfDays = 5;
    
    // Set up interval to refresh token every 5 minutes
    const intervalId = setInterval(() => {
      refreshToken();
    }, noOfDays**24*60*60*1000);

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);
  

  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [UID,setUID] = useState("");
  // Provide authState, login, logout, and makeRequest functions to the context
  return (
    <AuthContext.Provider value={{ authState, login, logout, makeRequest, resetPasswordToken, setResetPasswordToken, UID,setUID}}>
      {children}
    </AuthContext.Provider>
  );
};
