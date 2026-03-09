import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Layout from "./components/Layout";

import Homepage from "./components/Homepage";
import Aboutpage from "./components/Aboutpage";
import Contact from "./components/contactpage";
import AdminLogin from "./components/Adminlogin";

import Dashboard from "./components/Pages/Dashboard";
import Books from "./components/Pages/Books";
import Students from "./components/Pages/Students";
import IssuedBooks from "./components/Pages/Issuedbooks";
import Reports from "./components/Pages/Reports";
import Teachers from "./components/Pages/Teachers";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] dark:bg-[#1a1a1a] transition">

      {/* Navbar only for normal pages */}
      {!isDashboard && (
        <Navbar theme={theme} toggleTheme={toggleTheme} />
      )}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="books" element={<Books />} />
          <Route path="students" element={<Students />} />
          <Route path="issuedbooks" element={<IssuedBooks />} />

          {/* ✅ REPORTS ROUTE */}
          <Route path="reports" element={<Reports />} />
          <Route path="teachers" element={<Teachers />} />
        </Route>

      </Routes>

    </div>
  );
};

export default App;