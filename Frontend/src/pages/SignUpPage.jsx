import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const signup = useAuthStore((state) => state.signup);
  const isSigningUp = useAuthStore((state) => state.isSigningUp);

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-base-100">
      <div className="flex flex-col justify-center items-center p-8 sm:p-12 shadow-lg rounded-2xl border border-base-300">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-6">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all shadow-md">
                <MessageSquare className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control relative">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <User className="absolute left-3 top-10 size-5 text-gray-400" />
              <input
                type="text"
                className="input input-bordered w-full pl-10 shadow-sm focus:ring-2 focus:ring-primary"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <Mail className="absolute left-3 top-10 size-5 text-gray-400" />
              <input
                type="email"
                className="input input-bordered w-full pl-10 shadow-sm focus:ring-2 focus:ring-primary"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <Lock className="absolute left-3 top-10 size-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 shadow-sm focus:ring-2 focus:ring-primary"
                placeholder="********"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-sm text-gray-500"
              >
                {showPassword ? <EyeOff className="size-6 text-base-content/40" /> : <Eye className="size-6 text-base-content/40" />}
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full shadow-md hover:shadow-lg transition-all"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-6 animate-spin" /> Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Join Chatify"
        subtitle="Connect with friends, stay in touch with your loved ones!"
        className="shadow-lg rounded-2xl"
      />
    </div>
  );
};

export default SignUpPage;
