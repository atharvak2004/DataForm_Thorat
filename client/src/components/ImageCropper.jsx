import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Slider } from '@mui/material';

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', reject);
    image.src = url;
  });

export default function ImageCropper({ image, onCropDone, onCropCancel, vehicleNo, imageKey }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(4 / 3);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const uploadToCloudinary = async (base64Image) => {
  const data = new FormData();
  data.append("file", base64Image);
  data.append("upload_preset", "unsigned_upload");
  const publicId = `report-images/${vehicleNo}-${imageKey}-${Date.now()}`;
  data.append("public_id", publicId);

  const response = await fetch("https://api.cloudinary.com/v1_1/duqherrw9/image/upload", {
    method: "POST",
    body: data,
  });

  const json = await response.json();
  return `${json.secure_url}`;
};



  const handleCrop = async () => {
    if (!croppedAreaPixels) {
      alert("Crop area is not ready yet.");
      return;
    }

    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
      const cloudinaryUrl = await uploadToCloudinary(croppedImage);
      onCropDone(cloudinaryUrl);
    } catch (err) {
      console.error("Error cropping image:", err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div>
        <label htmlFor="aspect-select" className="mr-2 font-medium">Aspect Ratio:</label>
        <select
          id="aspect-select"
          value={aspect}
          onChange={(e) => setAspect(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value={4 / 3}>4:3</option>
          <option value={3 / 4}>3:4</option>
          <option value={3 / 1}>3:1</option>
          <option value={16 / 9}>16:9</option>
          <option value={1}>1:1</option>
        </select>
      </div>

      <div className="relative w-full h-[300px] sm:h-[400px] bg-gray-100">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={handleCropComplete}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Zoom: {zoom.toFixed(1)}</label>
        <Slider min={1} max={3} step={0.1} value={zoom} onChange={(e, value) => setZoom(value)} />
      </div>

      <div>
        <label className="block font-medium mb-1">Rotate: {rotation}°</label>
        <Slider min={0} max={360} step={1} value={rotation} onChange={(e, value) => setRotation(value)} />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="button"
          onClick={handleCrop}
          className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
        >
          Crop & Upload
        </button>
        <button
          type="button"
          onClick={onCropCancel}
          className="bg-gray-400 hover:bg-gray-600 text-white rounded-lg px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const radians = (rotation * Math.PI) / 180;

  const bBoxWidth =
    Math.abs(image.width * Math.cos(radians)) +
    Math.abs(image.height * Math.sin(radians));
  const bBoxHeight =
    Math.abs(image.width * Math.sin(radians)) +
    Math.abs(image.height * Math.cos(radians));

  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  tempCanvas.width = bBoxWidth;
  tempCanvas.height = bBoxHeight;

  tempCtx.translate(bBoxWidth / 2, bBoxHeight / 2);
  tempCtx.rotate(radians);
  tempCtx.drawImage(image, -image.width / 2, -image.height / 2);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    tempCanvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL("image/jpeg", 0.6);
}
