import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminCreateUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          method: "GET",
          credentials: "include", // Send cookie
        });

        if (!res.ok) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        if (data.user.role !== "admin") {
          navigate("/login");
        } else {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Error fetching user", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const text = await res.text();
      setMessage(text);
      setForm({ email: "", password: "", role: "user" });
    } catch (err) {
      setMessage("Failed to create user.");
    }
  };

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="User Email"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Temporary Password"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
          <option value="bankuser">BankUser</option>
          <option value="user">User</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Create User
        </button>   
      </form>

      {message && <p className="mt-4 text-center text-sm text-blue-700">{message}</p>}
    </div>
  );
}
