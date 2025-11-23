import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/60 dark:bg-background border-t border-gray-200 dark:border-white/10 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-muted-foreground dark:text-gray-400">
          © {new Date().getFullYear()} Anurup Chandra Mondal. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
