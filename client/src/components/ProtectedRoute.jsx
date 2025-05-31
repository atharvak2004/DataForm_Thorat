import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const location = useLocation();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated !== null) return;

    const checkAuth = async () => {
      try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      method: "GET",
      credentials: "include", // Essential for cookies
    });
    
    if (isMounted.current) {
      setIsAuthenticated(response.ok);
    }
      } catch (error) {
        console.error("Authentication check failed:", error);
        if (retryCount < MAX_RETRIES && isMounted.current) {
          setTimeout(() => {
            setRetryCount(c => c + 1);
            setIsAuthenticated(null); // Reset to trigger retry
          }, RETRY_DELAY);
        } else {
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();
  }, [location, isAuthenticated, retryCount]);

  if (isAuthenticated === null) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace state={{ from: location }} />;
};

export default ProtectedRoute;