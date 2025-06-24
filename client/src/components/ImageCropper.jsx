import React, { useRef, useState } from "react";
import {
  Cropper,
  RectangleStencil,
  CircleStencil,
} from "react-advanced-cropper";
import { customizedTransformImage } from "./rotateImageAlgorithm";
import "react-advanced-cropper/dist/style.css";
import "./ImageCropper.css";

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/duqherrw9/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "unsigned_upload";

export default function ImageCropper({ image, onCropDone, onCropCancel, vehicleNo, imageKey }) {
  const cropperRef = useRef(null);

  const [aspectRatio, setAspectRatio] = useState(0.75);
  const [stencilType, setStencilType] = useState("rectangle");
  const [restriction, setRestriction] = useState("fitArea");
  const [uploading, setUploading] = useState(false);

  const rotateLeft = () => {
    cropperRef.current?.rotateImage?.(-90);
  };

  const rotateRight = () => {
    cropperRef.current?.rotateImage?.(90);
  };

  const handleCropAndUpload = async () => {
    const cropper = cropperRef.current;
    if (!cropper) return;

    const canvas = cropper.getCanvas();
    if (!canvas) {
      alert("Crop area is not valid.");
      return;
    }

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg")
    );

    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("public_id", `report-images/${vehicleNo}-${imageKey}-${Date.now()}`);

    try {
      setUploading(true);
      const res = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url && onCropDone) {
        onCropDone(data.secure_url);
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-cropper-container">
      <div className="tool-panel">
        <h3>Aspect Ratio</h3>
        <div className="buttons">
          {[
            ["FREE", null],
            ["1:1", 1],
            ["1:2", 0.5],
            ["3:4", 0.75],
            ["2:1", 2],
          ].map(([label, ratio]) => (
            <button
              key={label}
              type="button"
              className={aspectRatio === ratio ? "active" : ""}
              onClick={() => setAspectRatio(ratio)}
            >
              {label}
            </button>
          ))}
        </div>

        <h3>Image Restriction</h3>
        <div className="buttons">
          {["fitArea", "fillArea", "stencil", "none"].map((mode) => (
            <button
              key={mode}
              type="button"
              className={restriction === mode ? "active" : ""}
              onClick={() => setRestriction(mode)}
            >
              {mode}
            </button>
          ))}
        </div>

        <h3>Stencil Type</h3>
        <div className="buttons">
          {["rectangle", "circle"].map((type) => (
            <button
              key={type}
              type="button"
              className={stencilType === type ? "active" : ""}
              onClick={() => setStencilType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <h3>Rotate</h3>
        <div className="buttons">
          <button type="button" onClick={rotateLeft}>⟲ Rotate Left</button>
          <button type="button" onClick={rotateRight}>⟳ Rotate Right</button>
        </div>
      </div>

      <div className="buttons" style={{ marginTop: "20px" }}>
        <button
          type="button"
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleCropAndUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Crop & Upload"}
        </button>

        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          onClick={onCropCancel}
        >
          Cancel
        </button>
      </div>

      <div className="cropper-wrapper">
        <Cropper
          ref={cropperRef}
          src={image}
          className="cropper"
          transformImageAlgorithm={customizedTransformImage}
          stencilComponent={stencilType === "circle" ? CircleStencil : RectangleStencil}
          stencilProps={{
            aspectRatio:
              restriction === "none" || restriction === "fitArea"
                ? aspectRatio
                : aspectRatio || 1,
          }}
          imageRestriction={restriction}
          backgroundWrapperProps={{
            scaleImage: "contain",
            style: { backgroundColor: "white" },
          }}
        />
      </div>

    </div>
  );
}
