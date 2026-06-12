import { Link } from "react-router-dom";

interface NavbarProps {
  openPricing: () => void;
}

const navLink =
  "cursor-pointer text-slate-600 font-medium hover:text-blue-600 transition-all duration-200";

const Navbar = ({ openPricing }: NavbarProps) => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-9 h-9">
            <svg
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-9 h-9"
            >
              <path
                d="M18 3L5 8v9c0 7.18 5.58 13.9 13 15.93C25.42 30.9 31 24.18 31 17V8L18 3z"
                fill="#EFF6FF"
                stroke="#2563EB"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M13 22l2.5-6 8-8 3.5 3.5-8 8-6 2.5z"
                fill="#2563EB"
                stroke="#2563EB"
                strokeWidth="0.5"
                strokeLinejoin="round"
              />
              <path
                d="M13 22l2.5-2.5"
                stroke="#EFF6FF"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex items-center">
            <span className="text-slate-900 font-extrabold text-2xl tracking-tight">
              Secure
            </span>
            <span className="text-blue-600 font-extrabold text-2xl tracking-tight">
              Ink
            </span>
          </div>
        </a>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className={navLink}>
            Features
          </a>
          <a href="#how-it-works" className={navLink}>
            How It Works
          </a>
          <a href="#security" className={navLink}>
            Security
          </a>
          <button onClick={openPricing} className={navLink}>
            Pricing
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/login" className={navLink}>
            Login
          </Link>

          <Link
            to="/register"
            className="
              bg-blue-600
              text-white
              px-5
              py-2
              rounded-lg
              font-medium
              hover:bg-blue-700
              transition-all
            "
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
