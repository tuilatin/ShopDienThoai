import { Sidebar } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <Sidebar></Sidebar>
      <header></header>
      <Outlet />
    </>
  );
}
