import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  LogOut
} from "lucide-react";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/adminlogin");
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
    ${
      isActive
        ? "bg-orange-600 text-white shadow-md"
        : "text-white hover:bg-orange-500 hover:text-white"
    }`;

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-amber-500 text-white transition-all duration-300 z-40
      ${isOpen ? "w-64" : "w-0 overflow-hidden"}`}
    >
      <div className="flex flex-col h-full p-6">

        {/* Logo */}
        <h1 className="text-2xl font-bold mb-10 tracking-wide">
          LIBCA
        </h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 flex-1">

          {/* Dashboard */}
          <NavLink to="/dashboard" end className={linkClasses}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          {/* Books */}
          <NavLink to="/dashboard/books" className={linkClasses}>
            <BookOpen size={20} />
            Books
          </NavLink>

          {/* Students */}
          <NavLink to="/dashboard/students" className={linkClasses}>
            <Users size={20} />
            Students
          </NavLink>

          {/* Issued Books */}
          <NavLink to="/dashboard/issuedbooks" className={linkClasses}>
            <BookOpen size={20} />
            Issued Books
          </NavLink>

          {/* Reports */}
          <NavLink to="/dashboard/reports" className={linkClasses}>
            <ClipboardList size={20} />
            Reports
          </NavLink>
          {/* Teachers */}
          <NavLink to="/dashboard/teachers" className={linkClasses}>
            <Users size={20} />
            Teachers
          </NavLink>

        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-red-500 transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>
    </div>
  );
};

export default Sidebar;