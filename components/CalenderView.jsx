// components/MyCalendar.jsx
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calender.css"
const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalenderView = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  });
  const [currentView, setCurrentView] = useState(Views.MONTH); // Track selected view

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ title: "", start, end });
    setShowModal(true);
  };

  const handleAddEvent = () => {
    if (!newEvent.title) return alert("Title is required");
    setEvents([...events, newEvent]);
    setShowModal(false);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        defaultView={Views.MONTH}
        view={currentView}
        onView={(view) => setCurrentView(view)} // Allow user to change view
        views={[Views.MONTH, Views.WEEK, Views.DAY]} // Enable buttons
        style={{ height: 600 }}
        onSelectSlot={handleSelectSlot}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-lg font-semibold mb-2">Add New Event</h3>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="w-full p-2 border rounded mb-4"
            />
            <p className="text-sm text-gray-600 mb-2">
              {format(newEvent.start, "PPpp")} → {format(newEvent.end, "PPpp")}
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleAddEvent}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalenderView;
