import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  Users,
  UserRound,
} from "lucide-react";

export default function LoginDrawer({ isOpen, onClose, onSignUpClick }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle Student, Tutor, and Parent Login
  const handleLogin = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    let user = null;

    // Student Login
    if (
      normalizedEmail === "student@educonnect.et" &&
      password === "Student@123"
    ) {
      user = {
        id: 1,
        name: "Demo Student",
        email: normalizedEmail,
        role: "student",
      };
    }

    // Tutor Login
    else if (
      normalizedEmail === "tutor@educonnect.et" &&
      password === "Tutor@123"
    ) {
      user = {
        id: 2,
        name: "Demo Tutor",
        email: normalizedEmail,
        role: "tutor",
      };
    }

    // Parent Login
    else if (
      normalizedEmail === "parent@educonnect.et" &&
      password === "Parent@123"
    ) {
      user = {
        id: 3,
        name: "Demo Parent",
        email: normalizedEmail,
        role: "parent",
      };
    }

    // Invalid credentials
    if (!user) {
      return false;
    }

    // Save logged-in user
    localStorage.setItem("educonnect_user", JSON.stringify(user));

    setError("");
    setEmail("");
    setPassword("");
    setShowPassword(false);

    // Close drawer
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

      default:
        navigate("/");
    }

    return true;
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = handleLogin(email, password);

    if (!success) {
      setError("Invalid email or password. Please try again.");
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

            {/* Demo Credentials */}
            <div className="mt-5 space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h3 className="font-semibold text-blue-800">
                Demo Login Credentials
              </h3>

              {/* Student */}
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-700" />
                  <span className="font-semibold text-slate-700">
                    Student Account
                  </span>
                </div>

                <p className="text-sm text-slate-600">
                  Email: student@educonnect.et
                </p>
                <p className="text-sm text-slate-600">Password: Student@123</p>
              </div>

              <div className="border-t border-blue-200" />

              {/* Tutor */}
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <UserRound className="h-5 w-5 text-blue-700" />
                  <span className="font-semibold text-slate-700">
                    Tutor Account
                  </span>
                </div>

                <p className="text-sm text-slate-600">
                  Email: tutor@educonnect.et
                </p>
                <p className="text-sm text-slate-600">Password: Tutor@123</p>
              </div>

              <div className="border-t border-blue-200" />

              {/* Parent */}
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-700" />
                  <span className="font-semibold text-slate-700">
                    Parent Account
                  </span>
                </div>

                <p className="text-sm text-slate-600">
                  Email: parent@educonnect.et
                </p>
                <p className="text-sm text-slate-600">Password: Parent@123</p>
              </div>

              <p className="text-xs text-blue-600">
                Enter the credentials for the account you want to access.
              </p>
            </div>

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
              {error && <p className="text-sm text-red-600">{error}</p>}

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
                className="w-full rounded-lg bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700"
              >
                Login
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
