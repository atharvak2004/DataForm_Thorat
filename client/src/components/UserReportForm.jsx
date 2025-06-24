import React, { useState } from "react";

const UserReportForm = () => {
  const [formData, setFormData] = useState({
    vehicleNo: "",
    note: "",
    chassisImage: null,
    rcImage: null,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "unsigned_upload");

    const res = await fetch("https://api.cloudinary.com/v1_1/duqherrw9/image/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    return result.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const chassisImageUrl = formData.chassisImage
        ? await uploadToCloudinary(formData.chassisImage)
        : "";

      const rcImageUrl = formData.rcImage
        ? await uploadToCloudinary(formData.rcImage)
        : "";

      const payload = {
        vehicleNo: formData.vehicleNo,
        note: formData.note,
        chassisImageUrl,
        rcImageUrl,
      };

      const response = await fetch("/api/report1/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Report submitted successfully");
        setFormData({ vehicleNo: "", note: "", chassisImage: null, rcImage: null });
      } else {
        alert("Failed to submit report");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <h2>Submit Vehicle Report</h2>

      <label>Vehicle Number:</label>
      <input
        type="text"
        name="vehicleNo"
        value={formData.vehicleNo}
        onChange={handleChange}
        required
      />

      <label>Note:</label>
      <textarea
        name="note"
        value={formData.note}
        onChange={handleChange}
        rows={3}
      />

      <label>Chassis Image:</label>
      <input type="file" name="chassisImage" accept="image/*" onChange={handleChange} />

      <label>RC Image:</label>
      <input type="file" name="rcImage" accept="image/*" onChange={handleChange} />

      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
};

export default UserReportForm;
