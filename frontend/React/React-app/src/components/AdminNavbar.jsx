import { Menu } from "lucide-react";

const AdminNavbar = ({ toggleSidebar }) => {
  return (
    <div className="h-16 bg-amber-500  text-white flex items-center justify-between px-6 shadow-md">

      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="hover:scale-110 transition"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
      </div>

      <div className="text-sm text-white-400">
        Welcome, Admin
      </div>
    </div>
  );
};

export default AdminNavbar;