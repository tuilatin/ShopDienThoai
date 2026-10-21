import React from "react";
import { Navigate } from "react-router-dom";

export default function RequireAdmin() {
  if (sessionStorage.getItem("vaiTro") !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }
}
