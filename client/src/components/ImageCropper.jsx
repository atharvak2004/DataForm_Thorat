import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Slider } from '@mui/material';

export default function ImageCropper({ image, onCropDone, onCropCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(4 / 3); // ✅ Initialize aspect ratio
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCrop = () => {
    if (!croppedAreaPixels) {
      alert("Crop area is not ready yet.");
      return;
    }
    onCropDone(croppedAreaPixels);
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="aspect-select" style={{ marginRight: 10 }}>Aspect Ratio:</label>
        <select
          id="aspect-select"
          value={aspect}
          onChange={(e) => setAspect(Number(e.target.value))}
        >
          <option value={4 / 3}>4:3</option>
          <option value={3 / 4}>3:4</option>
          <option value={3 / 1}>3:1</option>
          <option value={16 / 9}>16:9</option>
          <option value={1}>1:1</option>
        </select>
      </div>

      <div style={{ position: 'relative', width: 300, height: 300 }}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>Zoom:</label>
        <Slider
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e, value) => setZoom(value)}
        />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button type="button" onClick={handleCrop}>Crop & Save</button>
        <button type="button" onClick={onCropCancel} style={{ marginLeft: '1rem' }}>Cancel</button>
      </div>
    </div>
  );
}
