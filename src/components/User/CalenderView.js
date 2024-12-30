import React from "react";
import FullCalendar from "@fullcalendar/react"; // Import FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid"; // For month/day view
import timeGridPlugin from "@fullcalendar/timegrid"; // For time grid view
import interactionPlugin from "@fullcalendar/interaction"; // For drag and drop
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";


function CalendarView() {
    const handleDateClick = (info) => {
        alert(`Date clicked: ${info.dateStr}`);
    };

    const events = [
        { title: "Event 1", date: "2024-12-25" },
        { title: "Event 2", date: "2024-12-31" },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Calendar View</h1>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                editable={true} // Allow drag and drop
                selectable={true} // Allow selecting dates
                events={events} // Pass your events array
                dateClick={handleDateClick} // Handle date click events
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                height="auto" />
        </div>
    );
}

export default CalendarView;
