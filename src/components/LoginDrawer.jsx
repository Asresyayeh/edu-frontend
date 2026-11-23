import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { X, Mail, Lock, Eye, EyeOff, GraduationCap } from "lucide-react";

import { apiRequest } from "../services/api";

export default function LoginDrawer({ isOpen, onClose, onSignUpClick }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // LOGIN: Authenticate user through NestJS backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const data = await apiRequest("/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });
      console.log("Login response:", data);
      console.log("Logged-in user role:", data.user.role);

      // Get authenticated user information
      const user = {
        id: data.user.id,
        name: `${data.user.firstName} ${data.user.lastName}`,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        phone: data.user.phone,
        role: data.user.role,
        isActive: data.user.isActive,
      };

      // Save JWT token and user information
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("educonnect_user", JSON.stringify(user));

      // Clear form
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setError("");

      // Close login drawer
      onClose();

      // Redirect according to user role
      switch (user.role) {
        case "student":
          navigate("/student/dashboard");
          break;

        case "tutor":
          navigate("/tutor/dashboard");
          break;

        case "parent":
          navigate("/parent/dashboard");
          break;

        case "admin":
          navigate("/admin/dashboard");
          break;

        default:
          navigate("/");
      }
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Login Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-brand-600" />

            <span className="text-xl font-bold text-brand-800">
              EduConnect ET
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100"
            aria-label="Close login"
          >
            <X />
          </button>
        </div>

        {/* Login Content */}
        <div className="flex flex-1 items-center justify-center overflow-y-auto p-8">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-ink">Welcome Back!</h2>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue your EduConnect journey.
            </p>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email Address
                </label>

                <div className="flex items-center gap-3 rounded-lg border px-4 py-3 focus-within:border-brand-600">
                  <Mail className="h-5 w-5 text-slate-400" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="w-full outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-lg border px-4 py-3 focus-within:border-brand-600">
                  <Lock className="h-5 w-5 text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className="w-full outline-none"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              {/* Remember Me */}
              <div className="flex justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="font-semibold text-brand-600"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Sign Up */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSignUpClick}
                className="font-semibold text-brand-600 hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
