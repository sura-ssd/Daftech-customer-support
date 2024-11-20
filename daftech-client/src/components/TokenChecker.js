import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TokenChecker = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tokenExp = token
    ? new Date(JSON.parse(atob(token.split(".")[1])).exp * 1000)
    : null;

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (tokenExp && tokenExp < new Date()) {
        localStorage.removeItem("token");
        navigate("/LoginForm");
      }
    };

    checkTokenExpiration();

    
    const expirationInterval = setInterval(() => {
      checkTokenExpiration();
    }, 3 * 60 * 60 * 1000); 

    
    return () => {
      clearInterval(expirationInterval);
    };
  }, [navigate, tokenExp]);

  return tokenExp && tokenExp > new Date();
};

export default TokenChecker;
