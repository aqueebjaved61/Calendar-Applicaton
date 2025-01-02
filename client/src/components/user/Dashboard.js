import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Include your CSS file for styling

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [overrides, setOverrides] = useState({});

  useEffect(() => {
    axios.get('/api/companies')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));

    axios.get('/api/communications')
      .then(response => setCommunications(response.data))
      .catch(error => console.error('Error fetching communications:', error));
  }, []);

  const getLastFiveCommunications = (companyId) => {
    return communications
      .filter(comm => comm.company === companyId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  };

  const getNextScheduledCommunication = (companyId) => {
    const futureComms = communications
      .filter(comm => comm.company === companyId && new Date(comm.date) > new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return futureComms.length > 0 ? futureComms[0] : null;
  };

  const getHighlightClass = (communication, companyId) => {
    if (!communication || !communication.date || overrides[companyId]) {
      return '';
    }

    const today = new Date();
    const commDate = new Date(communication.date);

    if (communication.status === 'overdue' || commDate < today) {
      return 'highlight-red';
    }
    if (commDate.toDateString() === today.toDateString()) {
      return 'highlight-yellow';
    }
    return '';
  };

  const toggleOverride = (companyId) => {
    setOverrides(prevOverrides => ({
      ...prevOverrides,
      [companyId]: !prevOverrides[companyId],
    }));
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Last Five Communications</th>
            <th>Next Scheduled Communication</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company._id} className={getHighlightClass(getNextScheduledCommunication(company._id), company._id)}>
              <td>{company.name}</td>
              <td>
                {getLastFiveCommunications(company._id).map((comm, index) => (
                  <div key={index} className="communication-item">
                    {comm.contactMethod} - {new Date(comm.date).toLocaleDateString()}
                    <div className="tooltip">{comm.notes}</div>
                  </div>
                ))}
              </td>
              <td>
                {(() => {
                  const nextComm = getNextScheduledCommunication(company._id);
                  return nextComm ? `${nextComm.contactMethod} - ${new Date(nextComm.date).toLocaleDateString()}` : 'No upcoming communication';
                })()}
              </td>
              <td>
                <button onClick={() => toggleOverride(company._id)}>
                  {overrides[company._id] ? 'Enable Highlight' : 'Disable Highlight'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;














