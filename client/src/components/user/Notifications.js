import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notifications.css';  // Include your CSS file for styling

const Notifications = () => {
  const [overdueCommunications, setOverdueCommunications] = useState([]);
  const [todaysCommunications, setTodaysCommunications] = useState([]);
  const [readNotifications, setReadNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/communications')
      .then(response => {
        console.log('Fetched communications:', response.data);  // Debug log

        const today = new Date().toISOString().split('T')[0];
        console.log('Today\'s date:', today);  // Debug log

        const overdue = response.data.filter(comm => {
          const commDate = new Date(comm.date);
          const isValidDate = !isNaN(commDate);
          if (!isValidDate) {
            console.error('Invalid date for communication:', comm);
            return false;
          }
          const isOverdue = comm.status === 'overdue' || commDate < new Date(today);
          console.log(`Communication with company ${comm.company} on ${commDate.toISOString()} is overdue:`, isOverdue);
          return isOverdue;
        });

        const todayDue = response.data.filter(comm => {
          const commDate = new Date(comm.date);
          const isValidDate = !isNaN(commDate);
          if (!isValidDate) {
            console.error('Invalid date for communication:', comm);
            return false;
          }
          const isTodayDue = commDate.toISOString().split('T')[0] === today;
          console.log(`Communication with company ${comm.company} on ${commDate.toISOString()} is due today:`, isTodayDue);
          return isTodayDue;
        });

        console.log('Overdue communications:', overdue);  // Debug log
        console.log('Today\'s communications:', todayDue);  // Debug log

        setOverdueCommunications(overdue);
        setTodaysCommunications(todayDue);
      })
      .catch(error => {
        console.error('Error fetching communications:', error.response ? error.response.data : error.message);
        setError(`Error fetching communications: ${error.response ? error.response.data.message : error.message}`);
      });
  }, []);

  const markAsRead = (commId) => {
    setReadNotifications(prevReadNotifications => [...prevReadNotifications, commId]);
  };

  return (
    <div className="notifications">
      {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
      <div className="notification-icon">
        <span className="badge">
          {overdueCommunications.length + todaysCommunications.length - readNotifications.length}
        </span>
      </div>
      <div className="notifications-section">
        <h4>Overdue Communications</h4>
        {overdueCommunications.length === 0 && <p>No overdue communications.</p>}
        <div className="communications-grid">
          {overdueCommunications.map((comm, index) => (
            <div
              key={index}
              className={`communication-item ${readNotifications.includes(comm._id) ? 'read' : ''}`}
              onClick={() => markAsRead(comm._id)}
            >
              <p><strong>Company:</strong> {comm.company}</p>
              <p><strong>Date:</strong> {new Date(comm.date).toLocaleDateString()}</p>
              <p><strong>Type:</strong> {comm.contactMethod}</p>
              <p><strong>Details:</strong> {comm.details}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="notifications-section">
        <h4>Today’s Communications</h4>
        {todaysCommunications.length === 0 && <p>No communications due today.</p>}
        <div className="communications-grid">
          {todaysCommunications.map((comm, index) => (
            <div
              key={index}
              className={`communication-item ${readNotifications.includes(comm._id) ? 'read' : ''}`}
              onClick={() => markAsRead(comm._id)}
            >
              <p><strong>Company:</strong> {comm.company}</p>
              <p><strong>Date:</strong> {new Date(comm.date).toLocaleDateString()}</p>
              <p><strong>Type:</strong> {comm.contactMethod}</p>
              <p><strong>Details:</strong> {comm.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;















