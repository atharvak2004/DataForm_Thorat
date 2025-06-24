import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: user.email, 
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });

      const text = await res.text();
      setMessage(text);
      setForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      setShowChangePassword(false);
    } catch (err) {
      setMessage("Failed to update password.");
    }
  };


  const toggleChangePassword = () => {
    setShowChangePassword((prev) => {
      if (prev) setMessage(""); // clear message on cancel
      return !prev;
    });
  };

  if (!user) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 border shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>

      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <div className="mt-6">
        <button
          onClick={toggleChangePassword}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {showChangePassword ? "Cancel" : "Change Password"}
        </button>
      </div>

      {showChangePassword && (
        <form onSubmit={handlePasswordChange} className="space-y-4 mt-6">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            value={form.confirmNewPassword}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Update Password
          </button>
        </form>
      )}

      {message && (
        <p className="mt-4 text-center text-blue-600">{message}</p>
      )}
    </div>
  );
}
