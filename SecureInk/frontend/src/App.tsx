import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import AuditLogs from "./pages/AuditLogs";
import Settings from "./pages/Settings";
import PDFViewer from "./pages/PDFViewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/documents" element={<Documents />} />

        <Route path="/audit" element={<AuditLogs />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/viewer" element={<PDFViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
