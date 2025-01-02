import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import CommunicationAction from './CommunicationAction';
import Notifications from './Notifications';
import CalendarView from './CalendarView';
import './User.css';  // Include your CSS file for styling

const User = () => {
  return (
    <div className="user-container">
      <nav className="horizontal-nav">
        <ul>
          <li><Link to="communication-action">Communication Action</Link></li>
          <li><Link to="notifications">Notifications</Link></li>
          <li><Link to="calendar">Calendar</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<User />}>
      <Route path="communication-action" element={<CommunicationAction />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="calendar" element={<CalendarView />} />
    </Route>
  </Routes>
);

export default UserRoutes;




