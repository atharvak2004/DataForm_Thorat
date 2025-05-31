import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          method: "GET",
          credentials: "include",
        });
        
        setIsAuthenticated(response.ok);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };
    if (isAuthenticated === null) {
      checkAuth();
    }
  }, [location, isAuthenticated]);

  if (isAuthenticated === null) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace state={{ from: location }} />;
};

export default ProtectedRoute;