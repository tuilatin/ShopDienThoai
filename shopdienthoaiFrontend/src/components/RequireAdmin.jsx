import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAdmin() {
  const [role, setRole] = useState(() =>
    sessionStorage.getItem("jwtToken")
      ? sessionStorage.getItem("vaiTro")
      : null,
  );

  useEffect(() => {
    const updateRole = () => {
      setRole(
        sessionStorage.getItem("jwtToken")
          ? sessionStorage.getItem("vaiTro")
          : null,
      );
    };
    window.addEventListener("authChanged", updateRole);
    return () => window.removeEventListener("authChanged", updateRole);
  }, []);

  if (role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
