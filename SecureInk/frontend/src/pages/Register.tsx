import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checks = useMemo(
    () => ({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    }),
    [password],
  );

  const strength = Object.values(checks).filter(Boolean).length;

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const isFormValid =
    fullName.trim() !== "" &&
    email.trim() !== "" &&
    strength === 4 &&
    passwordsMatch &&
    acceptedTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      navigate(`/verify-otp?email=${encodeURIComponent(email)}`, {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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

        <h1 className="text-4xl font-bold text-center">Create Account</h1>

        <p className="text-slate-500 text-center mt-2">
          Start using SecureInk today
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

            <div className="mt-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`
                        h-2 flex-1 rounded-full
                        ${strength >= bar ? "bg-green-500" : "bg-slate-200"}
                      `}
                  />
                ))}
              </div>

              <p className="mt-2 text-sm text-slate-500">Password Strength</p>
            </div>

            <div className="mt-4 text-sm space-y-2">
              <p
                className={checks.length ? "text-green-600" : "text-slate-500"}
              >
                ✓ At least 8 characters
              </p>

              <p
                className={
                  checks.uppercase ? "text-green-600" : "text-slate-500"
                }
              >
                ✓ One uppercase letter
              </p>

              <p
                className={checks.number ? "text-green-600" : "text-slate-500"}
              >
                ✓ One number
              </p>

              <p
                className={checks.special ? "text-green-600" : "text-slate-500"}
              >
                ✓ One special character
              </p>
            </div>
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

            {confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                Passwords do not match
              </p>
            )}
          </div>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1"
            />

            <span className="text-sm text-slate-600">
              I agree to the Terms of Service and Privacy Policy.
            </span>
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-xl
              font-semibold
              hover:bg-blue-700
              transition
              disabled:bg-slate-300
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
