import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/admin/company-management">Company Management</Link></li>
        <li><Link to="/admin/communication-methods">Communication Methods</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/reports/communication-frequency">Communication Reports</Link></li>
        <li><Link to="/reports/activity-log">Activity Log</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
