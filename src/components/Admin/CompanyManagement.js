import React, { useState, useEffect } from "react";
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
    adminEmail: localStorage.getItem("AdminEmail"),
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [error, setError] = useState("");

  const baseUrl = "https://calendar-application-for-communication.onrender.com/api/v1/company";

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const adminEmail = localStorage.getItem("AdminEmail"); // Get admin email from localStorage
        if (!adminEmail) {
          setError("Admin email not found in localStorage");
          return;
        }
  
        // Append the email as a query parameter to the URL
        const url = `${baseUrl}/get?email=${encodeURIComponent(adminEmail)}`;
        
        const response = await fetch(url, {
          method: "GET"
        });
  
        if (response.ok) {
          const data = await response.json();
          setCompanies(data); // Set the fetched companies
        } else {
          setError("Failed to fetch companies");
        }
      } catch (error) {
        setError("Failed to connect to the server");
        console.error("Fetch error:", error);
      }
    };
  
    fetchCompanies();
  }, []);
  
  

  // Handle input change
  const handleInputChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  // Add or update a company
  const addOrUpdateCompany = async () => {
    if (!newCompany.name || !newCompany.location || !newCompany.emails) {
      setError("Name, Location, and Email are required!");
      return;
    }

    setError(""); // Clear error

    try {
      if (isEditing) {
        // Update company
        const response = await fetch(`${baseUrl}/${currentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCompany),
        });

        if (response.ok) {
          const updatedCompany = await response.json();
          const updatedCompanies = companies.map((company) =>
            company.id === currentId ? updatedCompany : company
          );
          setCompanies(updatedCompanies);
          setIsEditing(false);
          setCurrentId(null);
        } else {
          setError("Failed to update the company");
        }
      } else {
        // Add company
        const response = await fetch(`${baseUrl}/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCompany),
        });

        if (response.ok) {
          const addedCompany = await response.json();
          setCompanies([...companies, addedCompany]);
        } else {
          setError("Failed to add the company");
        }
      }

      setNewCompany({
        name: "",
        location: "",
        linkedIn: "",
        emails: "",
        phoneNumbers: "",
        comments: "",
        periodicity: "2 weeks",
        adminEmail: localStorage.getItem("AdminEmail"),
      });
    } catch (error) {
      setError("Failed to connect to the server");
      console.error(error);
    }
  };

  // Edit a company
  const editCompany = (id) => {
    const companyToEdit = companies.find((company) => company.id === id);
    setIsEditing(true);
    setCurrentId(id);
    setNewCompany(companyToEdit);
  };

  // Delete a company
  const deleteCompany = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCompanies(companies.filter((company) => company.id !== id));
      } else {
        setError("Failed to delete the company");
      }
    } catch (error) {
      setError("Failed to connect to the server");
      console.error(error);
    }
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
        <button onClick={addOrUpdateCompany}>
          {isEditing ? "Update Company" : "Add Company"}
        </button>
      </div>
      <div className="company-list">
        <h3>Companies</h3>
        <ul>
          {companies.map((company) => (
            <li key={company.id}>
              <div>
                <strong>{company.name}</strong> - {company.location}
              </div>
              <div className="EDbutton">
                <button onClick={() => editCompany(company.id)}>Edit</button>
                <button onClick={() => deleteCompany(company.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyManagement;
