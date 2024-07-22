import React from "react";
import { FaHospital } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <header className="flex items-center justify-between px-4 py-3 bg-background shadow">
        <Link href="#" className="flex items-center">
          <FaHospital className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">HealthCare</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            About
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
