import React from 'react';

export default function FileInput({ onImageSelected }) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onImageSelected(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label htmlFor="file-upload" className='mr-3'>Upload Image:</label>
      <input type="file" id="file-upload" accept="image/*" onChange={handleFileChange} className='mb-5' />
    </div>
  );
}
