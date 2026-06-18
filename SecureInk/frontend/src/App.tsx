import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import AuditLogs from "./pages/AuditLogs";
import Settings from "./pages/Settings";
import PDFViewer from "./pages/PDFViewer";
import SignerPage from "./pages/SignerPage";
import VerificationPage from "./pages/VerificationPage";
import OTPVerification from "./pages/OTPVerification";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/audit"
          element={
            <ProtectedRoute>
              <AuditLogs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/viewer/:id"
          element={
            <ProtectedRoute>
              <PDFViewer />
            </ProtectedRoute>
          }
        />

        <Route path="/sign/:documentId" element={<SignerPage />} />

        <Route path="/verify/:documentId" element={<VerificationPage />} />

        <Route path="/verify-otp" element={<OTPVerification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
