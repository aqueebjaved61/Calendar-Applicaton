import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import CommunicationMethodManagement from './CommunicationMethodManagement';
import CompanyManagement from './CompanyManagement';
import './Admin.css';  // Include your CSS file for styling

const Admin = () => {
  return (
    <div className="admin-container">
      <nav className="horizontal-nav">
        <ul>
          <li><Link to="communication-methods">Communication Methods</Link></li>
          <li><Link to="company-management">Company Management</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<Admin />}>
      <Route path="communication-methods" element={<CommunicationMethodManagement />} />
      <Route path="company-management" element={<CompanyManagement />} />
    </Route>
  </Routes>
);

export default AdminRoutes;







