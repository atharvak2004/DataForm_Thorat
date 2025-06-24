import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // milliseconds

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
    const checkAuth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          method: "GET",
          credentials: "include", // Important for cookie-based auth
        });

        if (isMounted.current) {
          setIsAuthenticated(response.ok);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        if (retryCount < MAX_RETRIES && isMounted.current) {
          setTimeout(() => {
            setRetryCount((c) => c + 1); // Trigger re-run of useEffect
          }, RETRY_DELAY);
        } else {
          if (isMounted.current) {
            setIsAuthenticated(false);
          }
        }
      }
    };

    checkAuth();
  }, [location, retryCount]);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
