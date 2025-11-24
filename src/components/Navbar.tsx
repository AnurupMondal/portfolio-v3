import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, Github, Linkedin } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollSpy } from "../hooks/useScrollSpy";
import portfolioData from "../data/portfolioData.json";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/", id: "home" },
    { name: "Skills", path: "/#skills", id: "skills" },
    { name: "Experience", path: "/#experience", id: "experience" },
    { name: "Projects", path: "/#projects", id: "projects" },
    { name: "Resume", path: "/#resume", id: "resume" },
    { name: "Contact", path: "/#contact", id: "contact" },
  ];

  // Only use scroll spy on the home page
  const isOnHomePage = location.pathname === "/" || location.pathname === "/portfolio-v3" || location.pathname === "/portfolio-v3/";
  const activeId = useScrollSpy(
    isOnHomePage ? navLinks.map((link) => link.id) : [],
    100
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    _path: string,
    id: string
  ) => {
    e.preventDefault();
    setIsOpen(false);

    // Check if we're on the resume page
    const isOnResumePage = location.pathname.includes('/resume');

    if (isOnResumePage || location.pathname !== "/") {
      // Navigate to home first, then scroll
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-background/80 backdrop-blur-md border-b border-white/10 dark:border-white/10 border-black/5 py-2"
        : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => handleLinkClick(e, "/", "home")}
            className="text-2xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary cursor-pointer"
          >
            Portfolio
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path, link.id)}
                className={`text-sm font-medium transition-colors hover:text-primary relative ${activeId === link.id
                  ? "text-primary"
                  : "text-gray-600 dark:text-gray-300"
                  }`}
              >
                {link.name}
                {activeId === link.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary"
                  />
                )}
              </a>
            ))}

            <div className="flex items-center space-x-4 border-l border-white/10 pl-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-gray-600 dark:text-gray-300 hover:text-primary"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a
                href={portfolioData.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href={portfolioData.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground dark:text-gray-300"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground dark:text-gray-300 hover:text-primary dark:hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-background/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path, link.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${activeId === link.id
                    ? "text-primary bg-primary/10 dark:bg-white/5"
                    : "text-foreground dark:text-gray-300 hover:text-primary dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex space-x-4 px-3 py-4 border-t border-gray-200 dark:border-white/10 mt-4">
                <a
                  href={portfolioData.personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground dark:text-gray-300 hover:text-primary"
                >
                  <Github size={24} />
                </a>
                <a
                  href={portfolioData.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground dark:text-gray-300 hover:text-primary"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
