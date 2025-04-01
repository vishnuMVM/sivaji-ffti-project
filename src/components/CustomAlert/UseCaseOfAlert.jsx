import React, { useState } from "react";

import CustomAlert from "./CustomAlert"; // Adjust path

function MyComponent() {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDelete = () => {
    // Perform delete operation here
    console.log("Item deleted!");
    setShowDeleteAlert(false); // Close the alert
  };
  const handleCancel = () => {
      setShowDeleteAlert(false);
  }

  return (
    <div>
      <button onClick={() => setShowError(true)}>Show Error</button>
      <button onClick={() => setShowSuccess(true)}>Show Success</button>
      <button onClick={() => setShowWarning(true)}>Show Warning</button>
      <button onClick={() => setShowInfo(true)}>Show Info</button>
      <button onClick={() => setShowDeleteAlert(true)}>Delete Item</button>

      {showError && <CustomAlert message="An error occurred." type="error" />}
      {showSuccess && <CustomAlert message="Operation successful!" type="success" />}
      {showWarning && <CustomAlert message="Be careful!" type="warning" />}
      {showInfo && <CustomAlert message="Here's some information." type="info" />}

      {showDeleteAlert && (
        <CustomAlert
          message="Are you sure you want to delete this item?"
          type="warning"
          onConfirm={handleDelete}
          title="Confirm Deletion"
          onCancel = {handleCancel}
        />
      )}
    </div>
  );
}