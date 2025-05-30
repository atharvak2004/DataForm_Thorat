import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken, getToken } from "../utils/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.text();
        setError(err || "Login failed");
        setLoading(false);
        return;
      }

      const data = await res.json();
      saveToken(data.token);
      navigate("/");
    } catch (err) {
      setError("Network error or server unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button
          type="submit"
          className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 ${loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
    </div>
  );
}
