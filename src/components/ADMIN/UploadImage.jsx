// ImageUpload.js
import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, onValue, update } from "firebase/database";
import { storage, database } from "../../firebase/firebaseconsole";

function ImageUpload() {
  const [file, setFile] = useState(null); // State to store the selected file
  const [progress, setProgress] = useState(0); // State to show upload progress
  const [uploadMessage, setUploadMessage] = useState(""); // Status messages

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle the image upload
  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file first.");
      return;
    }

    // Define a storage path and database path
    const storagePath = `images/${file.name}`; // Path to store in Firebase Storage
    const dbPath = "users/userId/profileImageURL"; // Path in Firebase Database (update userId)

    // Create a storage reference
    const storageRef = ref(storage, storagePath);

    // Upload file to Firebase Storage
    try {
      const uploadTask = await uploadBytes(storageRef, file);

      // Get download URL of the uploaded image
      const downloadURL = await getDownloadURL(uploadTask.ref);

      // Save download URL in Firebase Realtime Database
      const dbRef = databaseRef(database, dbPath);
      await update(dbRef, { profileImageURL: downloadURL });

      // Update success message
      setUploadMessage("Image uploaded and URL saved successfully.");
    } catch (error) {
      setUploadMessage(`Error uploading file: ${error.message}`);
      console.error("Error uploading file:", error);
    }
  };
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Reference the path where the URL is saved in the Realtime Database
    const dbRef = databaseRef(database, "users/userId/profileImageURL"); // Update userId accordingly

    // Fetch the URL and listen for changes
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setImageUrl(data || ""); // Set the image URL if available
    });
  }, []);
  return (
    <div>
      <h3>Upload Image</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <p>Upload Progress: {progress}%</p>} 
      <p>{uploadMessage}</p>
      <div>
        {imageUrl ? (
          <img src={imageUrl} alt="Uploaded profile" />
        ) : (
          <p>No image available</p>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
