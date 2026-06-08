import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}

      <aside
        className="
          fixed
          left-0
          top-0
          h-screen
          w-64
          bg-white
          border-r
          border-slate-200
        "
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <img src={logo} alt="SecureInk" className="h-8 w-8" />

          <span className="ml-3 text-xl font-bold">
            Secure
            <span className="text-blue-600">Ink</span>
          </span>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to="/dashboard"
            className="
              block
              px-4
              py-3
              rounded-xl
              bg-blue-50
              text-blue-600
              font-medium
            "
          >
            Dashboard
          </Link>

          <Link
            to="/documents"
            className="
              block
              px-4
              py-3
              rounded-xl
              hover:bg-slate-100
            "
          >
            Documents
          </Link>

          <Link
            to="/audit"
            className="
              block
              px-4
              py-3
              rounded-xl
              hover:bg-slate-100
            "
          >
            Audit Logs
          </Link>

          <Link
            to="/settings"
            className="
              block
              px-4
              py-3
              rounded-xl
              hover:bg-slate-100
            "
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Area */}

      <main className="ml-64">{children}</main>
    </div>
  );
};

export default DashboardLayout;
