// import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/common/ScrollToTop";
import CursorBackground from "./components/common/CursorBackground";

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

function App() {
  return (
    <ThemeProvider>
      <CursorBackground />
      <Router basename="/portfolio-v3">
        <RedirectHandler />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* Future routes: Projects, About, Contact */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
