import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="SecureInk"
            className="h-16 w-16 object-contain"
          />
        </div>

        <h1 className="text-4xl font-bold text-center">Welcome Back</h1>

        <p className="text-slate-500 text-center mt-2">
          Sign in to continue using SecureInk
        </p>

        <form className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="
              w-full
              border
              border-slate-300
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="
                w-full
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                pr-20
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-sm
                text-blue-600
              "
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              Remember Me
            </label>

            <button
              type="button"
              className="
                text-sm
                text-blue-600
                hover:underline
              "
            >
              Forgot Password?
            </button>
          </div>

          <button
            className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-xl
              font-semibold
              hover:bg-blue-700
              transition
            "
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
              text-blue-600
              font-medium
              hover:underline
            "
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
