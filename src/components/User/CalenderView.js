// src/components/CalendarView.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CalendarView.css';

// Sample data for communications
const communicationsData = [
  {
    companyName: 'Tech Innovators',
    communications: [
      { type: 'LinkedIn Post', date: '2024-09-05', notes: 'Initial outreach' },
      { type: 'Phone Call', date: '2024-09-10', notes: 'Discussed project details' },
      { type: 'Email', date: '2024-09-15', notes: 'Follow-up email' },
      { type: 'LinkedIn Message', date: '2024-09-20', notes: 'Project update' },
    ],
  },
  {
    companyName: 'GreenTech',
    communications: [
      { type: 'LinkedIn Post', date: '2024-10-01', notes: 'Introduction to new project' },
      { type: 'Email', date: '2024-10-05', notes: 'Project details' },
      { type: 'Phone Call', date: '2024-10-10', notes: 'Call to discuss next steps' },
    ],
  },
];

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Helper function to determine if a date has past or upcoming communication
  const getCommunicationMarkers = () => {
    const markers = [];
    communicationsData.forEach((company) => {
      company.communications.forEach((comm) => {
        const commDate = new Date(comm.date);
        markers.push({
          date: commDate,
          type: comm.type,
          companyName: company.companyName,
          notes: comm.notes,
        });
      });
    });
    return markers;
  };

  // Get all communication markers
  const communicationMarkers = getCommunicationMarkers();

  // Mark the selected date and show related communication data
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Highlight dates with past or upcoming communications
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      const isCommunicationDate = communicationMarkers.some(
        (marker) => marker.date.toISOString().split('T')[0] === formattedDate
      );
      return isCommunicationDate ? 'has-communication' : null;
    }
    return null;
  };

  return (
    <div className="calendar-view-container">
      <h2>Calendar View</h2>
      <div className="calendar">
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={tileClassName}
          onClickDay={handleDateClick}
        />
      </div>

      {selectedDate && (
        <div className="selected-date-details">
          <h3>Communications on {selectedDate.toDateString()}</h3>
          <ul>
            {communicationMarkers
              .filter((marker) => marker.date.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0])
              .map((marker, index) => (
                <li key={index}>
                  <strong>{marker.type}</strong> ({marker.companyName}) - {marker.notes}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
