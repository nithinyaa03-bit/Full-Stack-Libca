import logo_black from "../assets/logo_black.png";
import { NavLink } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
return ( <nav className="w-full flex items-center justify-between bg-amber-500 px-[7%] py-[15px] shadow-md">

  {/* LEFT SECTION */}
  <div className="flex items-center">

    {/* Sidebar Toggle Button */}
    {toggleSidebar && (
      <button
        onClick={toggleSidebar}
        className="mr-4 text-2xl text-white hover:scale-110 transition duration-200"
      >
        ☰
      </button>
    )}

    {/* Logo */}
    <img
      src={logo_black}
      alt="Logo"
      className="h-15 w-30 cursor-pointer"
    />

  </div>

  {/* CENTER LINKS */}
  <div className="flex-1 flex justify-center">

    <ul className="flex items-center gap-8 text-white font-medium">

      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-bold underline"
              : "hover:text-amber-100 transition"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "font-bold underline"
              : "hover:text-amber-100 transition"
          }
        >
          About
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "font-bold underline"
              : "hover:text-amber-100 transition"
          }
        >
          Contact
        </NavLink>
      </li>

    </ul>

  </div>

</nav>
);
};

export default Navbar;
