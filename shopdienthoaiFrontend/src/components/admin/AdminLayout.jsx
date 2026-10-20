import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 h-full ">
        <p>Admin Sidebar</p>
        <Link to="/admin/products" className="border-2 bg-indigo-50">
          Sản phẩm
        </Link>
      </aside>

      <div className="flex-1">
        <header>
          <h1>Admin Panel</h1>
        </header>

        <main className="flex-1">
          {/* Route con sẽ hiển thị ở đây */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
