import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = async (username, password) => {
    try {
      const response = await axios.post("https://localhost:7291/api/Login", { username, password });
      if (response.status === 200) {
        const { id, token } = response.data;
        setUser({ id, token });
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id);
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      throw new Error("An error occurred. Please try again later.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
