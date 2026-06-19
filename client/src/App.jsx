import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import SubmitComplaint from "./pages/SubmitComplaint";
import SubmitSuggestion from "./pages/SubmitSuggestion";
import MinisterDashboard from "./pages/MinisterDashboard";
import Login from "./pages/Login";
// New pages
import HowToFileComplaint from "./pages/HowToFileComplaint";
import ComplaintStatus from "./pages/ComplaintStatus";
import Guidelines from "./pages/Guidelines";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Accessibility from "./pages/Accessibility";

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <ScrollToTop />
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/submit-complaint" element={<SubmitComplaint />} />
              <Route path="/submit-suggestion" element={<SubmitSuggestion />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/how-to-file-complaint"
                element={<HowToFileComplaint />}
              />
              <Route path="/complaint-status" element={<ComplaintStatus />} />
              <Route path="/guidelines" element={<Guidelines />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route
                path="/minister-dashboard/*"
                element={
                  <ProtectedRoute>
                    <MinisterDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="bottom-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
