
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "https://localhost:7291/api/AdminLogin",
        {
          username,
          password,
        }
      );

      if (response.data.token) {
        // Store the token in local storage
        localStorage.setItem("authToken", response.data.token);
        setAuthenticated(true);
      } else {
        // Handle unsuccessful login
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    // Clear the token from local storage
    localStorage.removeItem("authToken");
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
