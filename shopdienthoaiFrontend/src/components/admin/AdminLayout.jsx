import { Sidebar } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 h-full bg-gray-800 text-white">
        {/* Sidebar content */}
      </aside>

      <div className="flex-1">
        <header>
          <h1>Admin Panel</h1>
        </header>
      </div>

      <main className="flex-1">
        {/* Route con sẽ hiển thị ở đây */}
        <Outlet />
      </main>
    </div>
  );
}
