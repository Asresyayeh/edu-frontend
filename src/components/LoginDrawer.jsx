import { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff, GraduationCap } from "lucide-react";

export default function LoginDrawer({ isOpen, onClose, onSignUpClick }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* Background overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Login drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
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

        <div className="flex flex-1 items-center justify-center overflow-y-auto p-8">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-ink">Welcome Back!</h2>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue your learning journey.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email Address
                </label>

                <div className="flex items-center gap-3 rounded-lg border px-4 py-3 focus-within:border-brand-600">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-lg border px-4 py-3 focus-within:border-brand-600">
                  <Lock className="h-5 w-5 text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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

              <div className="flex justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>

                <a href="#" className="font-semibold text-brand-600">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700"
              >
                Login
              </button>
            </form>

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
