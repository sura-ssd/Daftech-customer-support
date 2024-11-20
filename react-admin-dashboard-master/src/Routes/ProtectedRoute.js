import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { authenticated } = useAuth();

  if (authenticated) {
    return <Element {...rest} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
