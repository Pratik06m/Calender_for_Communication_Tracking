import React, { useState } from "react";
import './CommunicationMethodManagement.css';

const CommunicationMethodManagement = () => {
  // Initial list of communication methods
  const defaultMethods = [
    { name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: true },
    { name: "LinkedIn Message", description: "Message on LinkedIn", sequence: 2, mandatory: true },
    { name: "Email", description: "Send email to the user", sequence: 3, mandatory: false },
    { name: "Phone Call", description: "Call the user on the phone", sequence: 4, mandatory: false },
    { name: "Other", description: "Other communication methods", sequence: 5, mandatory: false },
  ];

  const [methods, setMethods] = useState(defaultMethods);
  const [newMethod, setNewMethod] = useState({
    name: "",
    description: "",
    sequence: "",
    mandatory: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMethod({
      ...newMethod,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addMethod = () => {
    if (!newMethod.name.trim()) {
      alert("Method Name is required.");
      return;
    }
  
    setMethods([
      ...methods,
      {
        ...newMethod,
        sequence: methods.length + 1,
      },
    ]);
    setNewMethod({
      name: "",
      description: "",
      sequence: "",
      mandatory: false,
    });
  };
  

  const handleDelete = (index) => {
    const updatedMethods = methods.filter((_, i) => i !== index);
    setMethods(updatedMethods);
  };

  return (
    <div>
      <h2>Communication Method Management</h2>
      
      {/* Form to add new communication method */}
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
            className="inputcheckbox"
            checked={newMethod.mandatory}
            onChange={handleInputChange}
          />
          Mandatory
          
        </label>
        <button onClick={addMethod}>Add Method</button>
      </div>
      
      {/* List of communication methods */}
      <div className="method-list">
        <h3>Existing Communication Methods</h3>
        <div className="method-grid">
          {methods.map((method, index) => (
            <div key={index} className="method-item">
              <span><strong>{method.name}</strong> (Sequence: {method.sequence})</span>
              <p>{method.description}</p>
              <span>{method.mandatory ? "Mandatory" : "Optional"}</span>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunicationMethodManagement;
