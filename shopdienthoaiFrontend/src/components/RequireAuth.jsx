import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(sessionStorage.getItem("jwtToken")),
  );

  useEffect(() => {
    const updateAuthentication = () => {
      setIsAuthenticated(Boolean(sessionStorage.getItem("jwtToken")));
    };
    window.addEventListener("authChanged", updateAuthentication);
    return () => window.removeEventListener("authChanged", updateAuthentication);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
