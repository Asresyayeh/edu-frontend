import { useState } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, GraduationCap } from "lucide-react";

export default function SignupDrawer({ isOpen, onClose, onLoginClick }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <div
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
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

          <button onClick={onClose} aria-label="Close signup">
            <X />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center p-8">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-ink">Create Account</h2>

            <p className="mt-2 text-sm text-slate-500">
              Join EduConnect ET and start learning today.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full Name
                </label>
                <div className="flex items-center gap-3 rounded-lg border px-4 py-3">
                  <User className="h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email Address
                </label>
                <div className="flex items-center gap-3 rounded-lg border px-4 py-3">
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
                <div className="flex items-center gap-3 rounded-lg border px-4 py-3">
                  <Lock className="h-5 w-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="w-full outline-none"
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

              <button
                type="submit"
                className="w-full rounded-lg bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700"
              >
                Create Account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button
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
