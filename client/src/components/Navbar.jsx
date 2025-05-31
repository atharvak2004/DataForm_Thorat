import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          method: "GET",
          credentials: "include", // Include cookies
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, [location]);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", 
      });
      setUser(null);
      setMobileMenuOpen(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white lg:ml-18">
          JOSHI SURVEYOR
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/history" className="hover:text-yellow-300">Previous Reports</Link>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          {user && (
            <Link to="/profile" className="hover:text-yellow-300">Profile</Link>
          )}
          {!user && (
            <Link to="/login" className="hover:text-yellow-300">Login</Link>
          )}
          {user && (
            <>
              {user.role === "admin" && (
                <Link to="/admin/create-user" className="hover:text-yellow-300">Add User</Link>
              )}
              <button onClick={handleLogout} className="hover:text-yellow-300">Logout</button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu items */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-2 text-lg">
            <Link to="/" className="hover:text-blue-300" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/history" className="hover:text-blue-300" onClick={() => setMobileMenuOpen(false)}>Previous Reports</Link>
            {user && (
              <Link to="/profile" className="hover:text-blue-300" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
            )}
            {!user && (
              <Link to="/login" className="hover:text-blue-300" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            )}
            {user && (
              <>
                {user.role === "admin" && (
                  <Link to="/admin/create-user" className="hover:text-yellow-300" onClick={() => setMobileMenuOpen(false)}>Add User</Link>
                )}
                <button onClick={handleLogout} className="text-left hover:text-red-300">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}