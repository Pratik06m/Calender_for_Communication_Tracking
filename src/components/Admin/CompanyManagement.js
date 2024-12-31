import React, { useState } from "react";
import './CompanyManagement.css'; // Ensure the path is correct

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: "",
    location: "",
    linkedIn: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    periodicity: "2 weeks",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [error, setError] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  // Add or update a company
  const addCompany = () => {
    // Validate required fields
    if (!newCompany.name || !newCompany.location || !newCompany.emails) {
      setError("Name, Location, and Email are required!");
      return;
    }

    // Clear error if validation passes
    setError("");

    if (isEditing) {
      const updatedCompanies = companies.map((company, index) =>
        index === currentIndex ? newCompany : company
      );
      setCompanies(updatedCompanies);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setCompanies([...companies, newCompany]);
    }

    setNewCompany({
      name: "",
      location: "",
      linkedIn: "",
      emails: "",
      phoneNumbers: "",
      comments: "",
      periodicity: "2 weeks",
    });
  };

  // Edit a company
  const editCompany = (index) => {
    setIsEditing(true);
    setCurrentIndex(index);
    setNewCompany(companies[index]);
  };

  // Delete a company
  const deleteCompany = (index) => {
    const filteredCompanies = companies.filter((_, i) => i !== index);
    setCompanies(filteredCompanies);
  };

  return (
    <div>
      <h2>Company Management</h2>
      <div className="form">
        {error && <p className="error-message">{error}</p>} {/* Display error */}
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={newCompany.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newCompany.location}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="emails"
          placeholder="Emails"
          value={newCompany.emails}
          onChange={handleInputChange}
        />
        <input
          type="url"
          name="linkedIn"
          placeholder="LinkedIn Profile"
          value={newCompany.linkedIn}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phoneNumbers"
          placeholder="Phone Numbers"
          value={newCompany.phoneNumbers}
          onChange={handleInputChange}
        />
        <textarea
          name="comments"
          placeholder="Comments"
          value={newCompany.comments}
          onChange={handleInputChange}
        />
        <select
          name="periodicity"
          value={newCompany.periodicity}
          onChange={handleInputChange}
        >
          <option value="1 week">1 Week</option>
          <option value="2 weeks">2 Weeks</option>
          <option value="1 month">1 Month</option>
        </select>
        <button onClick={addCompany}>
          {isEditing ? "Update Company" : "Add Company"}
        </button>
      </div>
      <div className="company-list">
        <h3>Companies</h3>
        <ul>
          {companies.map((company, index) => (
            <li key={index}>
              <div>
                <strong>{company.name}</strong> - {company.location}
              </div>
              <div className="EDbutton">
                <button onClick={() => editCompany(index)}>Edit</button>
                <button onClick={() => deleteCompany(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyManagement;
