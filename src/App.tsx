// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './layout/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/common/ScrollToTop';
import CursorBackground from './components/common/CursorBackground';

function App() {
  return (
    <ThemeProvider>
      <CursorBackground />
      <Router>
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
