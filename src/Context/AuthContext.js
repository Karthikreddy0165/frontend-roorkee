import React, { createContext, useState, useContext, useEffect } from "react";

// Create context for authentication
const AuthContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // Initial authentication state
  const [authState, setAuthState] = useState({
    token: null,
    refreshToken: null,
    user: null,
  });

  // Function to handle user login
  const login = (token, refreshToken, user) => {
    setAuthState({ token, refreshToken, user });
    localStorage.setItem("token", token); // Store login token in localStorage
    localStorage.setItem("refreshToken", refreshToken); // Store refresh token in localStorage
  };

  // Function to handle user logout
  const logout = () => {
    setAuthState({ token: null, refreshToken: null, user: null });
    localStorage.removeItem("token"); // Remove login token from localStorage
    localStorage.removeItem("refreshToken"); // Remove refresh token from localStorage
  };

  // Function to refresh login token using refresh token
  const refreshToken = async () => {
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (!storedRefreshToken) return;

    try {
      // Call your API to refresh the token
      const response = await fetch("/api/refresh-token", {
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
          const response = await fetch("/api/check-token", {
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

    // Set up interval to refresh token every 5 minutes
    const intervalId = setInterval(() => {
      refreshToken();
    }, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  // Provide authState, login, logout, and makeRequest functions to the context
  return (
    <AuthContext.Provider value={{ authState, login, logout, makeRequest }}>
      {children}
    </AuthContext.Provider>
  );
};
