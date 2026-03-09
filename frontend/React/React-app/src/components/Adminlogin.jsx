import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ If already logged in (token exists), redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // ✅ Real JWT Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save JWT token
      localStorage.setItem("token", response.data.token);

      // Save admin details
      localStorage.setItem("admin", JSON.stringify(response.data.admin));

      // Clear form
      setEmail("");
      setPassword("");

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FFFBEB]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">

        <h2 className="text-3xl font-bold text-center text-[#451A03] mb-2">
          Admin Login
        </h2>

        <p className="text-center text-[#78350F] mb-6">
          Library Management System
        </p>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          autoComplete="off"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#451A03]">
              Admin Email
            </label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#B45309] bg-white text-[#451A03]"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#451A03]">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#B45309] bg-white text-[#451A03]"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-[#78350F]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#B45309] hover:bg-[#92400E] text-white py-2 rounded-md font-semibold transition"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;