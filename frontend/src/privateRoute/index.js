import React from "react";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const { data } = useSelector((state) => state.auth);

  return data ? children : <Navigate to="/login" />;
}
