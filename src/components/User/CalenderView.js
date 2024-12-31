import React from "react";
import FullCalendar from "@fullcalendar/react"; // FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // For month/day view
import timeGridPlugin from "@fullcalendar/timegrid"; // For time grid view
import interactionPlugin from "@fullcalendar/interaction"; // For interactions like drag & drop

// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

const CalendarView = () => {
  const handleDateClick = (info) => {
    alert(`Clicked on date: ${info.dateStr}`);
  };

  const events = [
    { title: "Christmas", date: "2024-12-25" },
    { title: "New Year's Eve", date: "2024-12-31" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Calendar View</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        editable={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="auto"
      />
    </div>
  );
};

export default CalendarView;
