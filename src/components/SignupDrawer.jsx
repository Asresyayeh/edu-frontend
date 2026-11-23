import { useState } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, GraduationCap } from "lucide-react";

import { apiRequest } from "../services/api";

export default function SignupDrawer({ isOpen, onClose, onLoginClick }) {
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // REGISTER USER
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Split full name into first name and last name
    const nameParts = fullName.trim().split(/\s+/);

    if (nameParts.length < 2) {
      setError("Please enter your first name and last name.");
      return;
    }

    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    setIsLoading(true);

    try {
      const data = await apiRequest("/users", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email: email.trim().toLowerCase(),
          password,
          role,
        }),
      });

      setSuccess(
        data.message || "Account created successfully! You can now log in.",
      );

      // Clear form after successful registration
      setFullName("");
      setEmail("");
      setPassword("");
      setRole("student");
      setShowPassword(false);
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Signup Drawer */}
      <div
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
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
            aria-label="Close signup"
            className="rounded-full p-2 hover:bg-slate-100"
          >
            <X />
          </button>
        </div>

        {/* Signup Content */}
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-ink">Create Account</h2>

            <p className="mt-2 text-sm text-slate-500">
              Join EduConnect ET and start learning today.
            </p>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full Name
                </label>

                <div className="flex items-center gap-3 rounded-lg border px-4 py-3 focus-within:border-brand-600">
                  <User className="h-5 w-5 text-slate-400" />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    className="w-full outline-none"
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

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
                      setSuccess("");
                    }}
                    className="w-full outline-none"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Register As / Role */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Register As
                </label>

                <select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-brand-600"
                  required
                >
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                  <option value="tutor">Tutor</option>
                </select>

                <p className="mt-2 text-xs text-slate-500">
                  Choose the account type you want to create.
                </p>
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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    className="w-full outline-none"
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onLoginClick}
                className="font-semibold text-brand-600 hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
