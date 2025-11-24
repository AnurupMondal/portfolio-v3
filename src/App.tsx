// import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ResumePage from "./pages/ResumePage";
import GamerPage from "./pages/GamerPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/common/ScrollToTop";
import CursorBackground from "./components/common/CursorBackground";
import SecretCodeIndicator from "./components/common/SecretCodeIndicator";
import { useSecretCode } from "./hooks/useSecretCode";

// Component to handle 404.html redirects for GitHub Pages SPA
function RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we have a redirect query parameter (from 404.html)
    const queryParams = new URLSearchParams(location.search);
    const redirectPath = queryParams.get("/");

    if (redirectPath) {
      // Decode the path and navigate to it
      const decodedPath = redirectPath
        .replace(/~and~/g, "&")
        .replace(/%26/g, "&");
      navigate(decodedPath, { replace: true });
    }
  }, [location.search, navigate]);

  return null;
}

// Secret Code Handler Component
function SecretCodeHandler() {
  const navigate = useNavigate();
  const [showIndicator, setShowIndicator] = useState(false);

  const handleSecretUnlocked = () => {
    setShowIndicator(true);

    // Navigate after a short delay to show the indicator
    setTimeout(() => {
      navigate('/gamer');
      setShowIndicator(false);
    }, 2000);
  };

  // Listen for the secret code: G-A-M-E-R
  useSecretCode(['g', 'a', 'm', 'e', 'r'], handleSecretUnlocked);

  return <SecretCodeIndicator isVisible={showIndicator} />;
}

function App() {
  return (
    <ThemeProvider>
      <CursorBackground />
      <Router basename="/portfolio-v3">
        <RedirectHandler />
        <SecretCodeHandler />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="resume" element={<ResumePage />} />
            {/* Future routes: Projects, About, Contact */}
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Secret Gamer page - outside Layout for full-screen experience */}
          <Route path="/gamer" element={<GamerPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
