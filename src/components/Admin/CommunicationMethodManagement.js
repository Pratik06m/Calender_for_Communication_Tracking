import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CommunicationMethodManagement.css";

const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState([]);
  const [newMethod, setNewMethod] = useState({
    name: "",
    description: "",
    sequence: "",
    mandatory: false,
    adminEmail: localStorage.getItem("AdminEmail"),
  });
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const API_BASE_URL =
    "https://calendar-application-for-communication.onrender.com/api/v1/communication/methods";

  const fetchMethods = async () => {
    try {
      const adminEmail = localStorage.getItem("AdminEmail");
      if (!adminEmail) {
        toast.error("Admin email not found in localStorage");
        return;
      }
      const response = await fetch(`${API_BASE_URL}?email=${encodeURIComponent(adminEmail)}`);
      if (response.ok) {
        const responseData = await response.json(); // Parse the response JSON
        if (responseData.success) {
          setMethods(responseData.data); // Set the `data` array to the state
        } else {
          toast.error(responseData.message || "Failed to load communication methods.");
        }
      } else {
        toast.error("Failed to load communication methods.");
      }
    } catch (error) {
      toast.error("Failed to connect to the server");
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMethod({
      ...newMethod,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addOrUpdateMethod = async () => {
    if (!newMethod.name.trim()) {
      toast.error("Method Name is required.");
      return;
    }

    // Ensure sequence is a valid number
    const sequence = newMethod.sequence || methods.length + 1; // Default to length + 1 if empty
    if (isNaN(sequence)) {
      toast.error("Sequence must be a valid number.");
      return;
    }

    try {
      const adminEmail = localStorage.getItem("AdminEmail");

      // Adding method locally without backend interaction
      if (!adminEmail) {
        setMethods([
          ...methods,
          {
            ...newMethod,
            sequence: parseInt(sequence), // Make sure sequence is an integer
          },
        ]);
        setNewMethod({
          name: "",
          description: "",
          sequence: "",
          mandatory: false,
        });
        toast.success("Communication method added locally.");
        return;
      }

      // Backend interaction for adding method
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newMethod,
          adminEmail,
          sequence: parseInt(sequence), // Send sequence as an integer
        }),
      });

      if (response.ok) {
        const addedMethod = await response.json();
        setMethods([...methods, addedMethod]);
        toast.success("Communication method added successfully.");
        fetchMethods();
        setNewMethod({
          name: "",
          description: "",
          sequence: "",
          mandatory: false,
        });
      } else {
        toast.error("Failed to add communication method.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to connect to the server.");
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const deleteMethod = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${deleteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMethods(methods.filter((method) => method.id !== deleteId));
        toast.success("Communication method deleted successfully.");
      } else {
        toast.error("Failed to delete communication method.");
      }
    } catch (error) {
      toast.error("Failed to connect to the server.");
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>Communication Method Management</h2>

      <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Method Name"
          value={newMethod.name}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newMethod.description}
          onChange={handleInputChange}
        />
        <label>
          <input
            type="checkbox"
            name="mandatory"
            checked={newMethod.mandatory}
            onChange={handleInputChange}
          />
          Mandatory
        </label>
        <button onClick={addOrUpdateMethod}>Add Method</button>
      </div>

      <div className="method-list">
        <h3>Existing Communication Methods</h3>
        {methods.length > 0 ? (
          <div className="method-grid">
            {methods.map((method) => (
              <div key={method.id} className="method-item">
                <span>
                  <strong>{method.name}</strong>
                </span>
                <p>{method.description}</p>
                <span>{method.mandatory ? "Mandatory" : "Optional"}</span>
                <button onClick={() => confirmDelete(method.id)}>Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No communication methods available.</p>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this communication method?</p>
            <button onClick={deleteMethod}>Yes</button>
            <button onClick={() => setShowModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationMethodManagement;
