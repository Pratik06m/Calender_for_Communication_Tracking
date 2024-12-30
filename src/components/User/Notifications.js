// src/components/Notifications.jsx
import React, { useState, useEffect } from 'react';
import './Notifications.css';

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
  },
  {
    companyName: 'GreenTech',
    recentCommunications: [
      { type: 'LinkedIn Post', date: '1st October', notes: 'Introduction to new project' },
      { type: 'Email', date: '5th October', notes: 'Detailed project brief' },
    ],
    nextCommunication: { type: 'Phone Call', date: '10th October' },
  },
  // Add more company data as needed
];

const Notifications = () => {
  const [overdueCompanies, setOverdueCompanies] = useState([]);
  const [dueTodayCompanies, setDueTodayCompanies] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  // Helper function to check for overdue or due today communication
  const checkCommunicationStatus = () => {
    const currentDate = new Date();
    let overdue = [];
    let dueToday = [];

    sampleData.forEach((company) => {
      const nextCommunicationDate = new Date(company.nextCommunication.date);
      const diffInTime = nextCommunicationDate - currentDate;
      if (diffInTime < 0) {
        overdue.push(company);
      } else if (diffInTime <= 86400000) {
        dueToday.push(company);
      }
    });

    setOverdueCompanies(overdue);
    setDueTodayCompanies(dueToday);
    setNotificationCount(overdue.length + dueToday.length);
  };

  useEffect(() => {
    checkCommunicationStatus();
  }, []);

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>Notifications</h2>
        <div className="notification-icon">
          <span>{notificationCount}</span>
        </div>
      </div>

      <div className="notification-grid">
        <div className="grid-item">
          <h3>Overdue Communications</h3>
          <table className="notification-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Next Communication</th>
              </tr>
            </thead>
            <tbody>
              {overdueCompanies.map((company, index) => (
                <tr key={index}>
                  <td>{company.companyName}</td>
                  <td>{company.nextCommunication.type} - {company.nextCommunication.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid-item">
          <h3>Today's Communications</h3>
          <table className="notification-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Next Communication</th>
              </tr>
            </thead>
            <tbody>
              {dueTodayCompanies.map((company, index) => (
                <tr key={index}>
                  <td>{company.companyName}</td>
                  <td>{company.nextCommunication.type} - {company.nextCommunication.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
