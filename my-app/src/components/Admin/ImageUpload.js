import React, { useState } from 'react';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const uploadImage = async () => {
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "sgk19zsh"); // Replace with your actual upload preset

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/drusxooph/image/upload`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Failed to upload image");
      }

      const data = await response.json();
      setUrl(data.secure_url);
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error uploading image:", err);
      setError(`Error uploading image: ${err.message}`);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={uploadImage}>Upload</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {url && <img src={url} alt="Uploaded" />}
    </div>
  );
}

export default ImageUpload; 