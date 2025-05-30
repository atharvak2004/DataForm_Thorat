import React, { useState } from "react";
import {jwtDecode} from "jwt-decode";
import { getToken } from "../utils/auth";

export default function ChangePassword() {
  const token = getToken();
  const user = token ? jwtDecode(token) : null;

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.newPassword !== form.confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/change-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
          }),
        }
      );

      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage("Error changing password.");
    }
  };

  if (!user) return <p>Please log in.</p>;

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          placeholder="Current Password"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          name="confirmNewPassword"
          value={form.confirmNewPassword}
          onChange={handleChange}
          placeholder="Confirm New Password"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Change Password
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-blue-700">{message}</p>
      )}
    </div>
  );
}
