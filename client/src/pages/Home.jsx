import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 2;
  const RETRY_DELAY = 1000;
  const isMounted = useRef(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/home");

      } else if (user.role === "bankuser") {
        navigate("/bankuser/home");

      } else if (user.role === "employee") {
        navigate("/employee/home");

      } else if (user.role === "user") {
        navigate("/user/home");
      }
    }
  }, [user, navigate]);


  return (<div>Checking role and navigating...</div>);
}

export default Home;
