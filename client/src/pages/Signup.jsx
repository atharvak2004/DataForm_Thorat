import React, { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage("Signup failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <select name="role" value={form.role} onChange={handleChange} className="w-full border px-3 py-2 rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Sign Up</button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
}
