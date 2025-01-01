// src/components/UserDashboard.jsx
import React, { useState } from 'react';
import './UserDashboard.css';
import { useNavigate } from "react-router-dom";

// Sample data for companies and communications
const sampleData = [
  {
    companyName: 'Tech Innovators',
    recentCommunications: [
      { type: 'LinkedIn Post', date: '5th September', notes: 'Initial outreach' },
      { type: 'Email', date: '10th September', notes: 'Follow up on LinkedIn post' },
      { type: 'Phone Call', date: '15th September', notes: 'Discussed project details' },
      { type: 'LinkedIn Message', date: '20th September', notes: 'Project update' },
      { type: 'Email', date: '25th September', notes: 'Final follow up' },
    ],
    nextCommunication: { type: 'Phone Call', date: '30th September' },
    lastCommunicationDate: '25th September',
  },
  // Add more company data as needed
];

const UserDashboard = () => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [communicationData, setCommunicationData] = useState({
    type: '',
    date: '',
    notes: '',
  });

  // Handle row selection
  const handleCompanySelection = (companyName) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyName)
        ? prev.filter((company) => company !== companyName)
        : [...prev, companyName]
    );
  };

  // Handle modal input changes
  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setCommunicationData({
      ...communicationData,
      [name]: value,
    });
  };

  // Submit communication and reset highlights
  const handleSubmitCommunication = () => {
    // Reset highlight logic here
    setShowModal(false);
    setCommunicationData({
      type: '',
      date: '',
      notes: '',
    });
  };

  const navigate = useNavigate();
  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  const handleCalendarClick = () => {
    navigate("/calender");
  };

  // Helper function to check for overdue or due today communication
  const getHighlightClass = (company) => {
    const nextCommunicationDate = new Date(company.nextCommunication.date);
    const currentDate = new Date();
    const diffInTime = nextCommunicationDate - currentDate;
    if (diffInTime < 0) return 'highlight-red'; // Overdue
    if (diffInTime <= 86400000) return 'highlight-yellow'; // Due today
    return '';
  };

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>

      <table className="company-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Company Name</th>
            <th>Last Five Communications</th>
            <th>Next Scheduled Communication</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((company, index) => (
            <tr key={index} className={getHighlightClass(company)}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCompanySelection(company.companyName)}
                />
              </td>
              <td>{company.companyName}</td>
              <td>
                <ul>
                  {company.recentCommunications.map((comm, idx) => (
                    <li key={idx} className="communication-item">
                      <span>{comm.type}</span> - <span>{comm.date}</span>
                      <div className="tooltip">{comm.notes}</div>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <div>
                  {company.nextCommunication.type} - {company.nextCommunication.date}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => setShowModal(true)}
        disabled={selectedCompanies.length === 0}
      >
        Communication Performed
      </button>

      {showModal && (
  <>
    <div className="modal-backdrop"></div>
    <div className="modal">
      <h3>Log New Communication</h3>
      <form>
        <label>
          Type of Communication:
          <select
            name="type"
            value={communicationData.type}
            onChange={handleModalInputChange}
          >
            <option value="LinkedIn Post">LinkedIn Post</option>
            <option value="Email">Email</option>
            <option value="Phone Call">Phone Call</option>
            <option value="LinkedIn Message">LinkedIn Message</option>
          </select>
        </label>

        <label>
          Date of Communication:
          <input
            type="date"
            name="date"
            value={communicationData.date}
            onChange={handleModalInputChange}
          />
        </label>

        <label>
          Notes:
          <textarea
            name="notes"
            value={communicationData.notes}
            onChange={handleModalInputChange}
          ></textarea>
        </label>

        <button type="button" onClick={handleSubmitCommunication}>
          Submit
        </button>
        <button type="button" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </form>
    </div>
  </>
)}


      {/* Floating buttons */}
      <div className="floating-buttons">
        {/* Notification Button */}
        <button className="floating-button notification-button" title="Notifications" onClick={handleNotificationClick}>
          <i className="fas fa-bell"></i> {/* Font Awesome Notification Icon */}
          <span className="notification-badge">5</span>
        </button>


        {/* Calendar Button */}
        <button className="floating-button calendar-button" title="Calendar" onClick={handleCalendarClick} >
          <i className="fas fa-calendar-alt"></i> {/* Font Awesome Calendar Icon */}
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
