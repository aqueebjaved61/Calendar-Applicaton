import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import CommunicationFrequencyReport from './CommunicationFrequencyReport';
import EngagementEffectivenessDashboard from './EngagementEffectivenessDashboard';
import OverdueTrends from './OverdueTrends';
import DownloadableReports from './DownloadableReports';
import ActivityLog from './ActivityLog';
import './Reports.css';  // Include your CSS file for styling

const Reports = () => {
  return (
    <div className="reports-container">
      <nav className="horizontal-nav">
        <ul>
          <li><Link to="communication-frequency">Communication Frequency</Link></li>
          <li><Link to="engagement-effectiveness">Engagement Effectiveness</Link></li>
          <li><Link to="overdue-trends">Overdue Trends</Link></li>
          <li><Link to="downloadable">Downloadable Reports</Link></li>
          <li><Link to="activity-log">Activity Log</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

const ReportsRoutes = () => (
  <Routes>
    <Route path="/" element={<Reports />}>
      <Route path="communication-frequency" element={<CommunicationFrequencyReport />} />
      <Route path="engagement-effectiveness" element={<EngagementEffectivenessDashboard />} />
      <Route path="overdue-trends" element={<OverdueTrends />} />
      <Route path="downloadable" element={<DownloadableReports />} />
      <Route path="activity-log" element={<ActivityLog />} />
    </Route>
  </Routes>
);

export default ReportsRoutes;





