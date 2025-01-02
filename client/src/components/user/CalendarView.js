import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date()),
  getDay,
  locales,
});

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/communications')
      .then(response => {
        const communications = response.data.map(comm => ({
          title: `${comm.contactMethod}: ${comm.notes}`,
          start: new Date(comm.date),
          end: new Date(comm.date),
        }));
        setEvents(communications);
      })
      .catch(error => console.error('Error fetching communications:', error));
  }, []);

  return (
    <div className="calendar-view">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarView;


