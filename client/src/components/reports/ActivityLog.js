import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './ActivityLog.css';  // Include your CSS file for styling

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [sortKey, setSortKey] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Fetch initial data
    axios.get('/api/activities')
      .then(response => {
        console.log('Fetched activities:', response.data); // Debug log
        const sortedData = sortData(response.data, sortKey, sortOrder);
        setActivities(sortedData);
      })
      .catch(error => console.error('Error fetching activities:', error));

    // Setup WebSocket connection
    const socket = io('http://localhost:3000');  // Ensure the URL is correct
    socket.on('newActivity', activity => {
      console.log('New activity received:', activity); // Debug log
      setActivities(prevActivities => {
        const updatedActivities = [activity, ...prevActivities];
        console.log('Updated activities:', updatedActivities); // Debug log
        return sortData(updatedActivities, sortKey, sortOrder);
      });
    });

    // Clean up socket on unmount
    return () => {
      console.log('Socket disconnected'); // Debug log
      socket.disconnect();
    };
  }, [sortKey, sortOrder]);

  const sortData = (data, key, order) => {
    console.log(`Sorting data by ${key} in ${order} order`); // Debug log
    return data.sort((a, b) => {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key) => {
    const order = (sortKey === key && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortKey(key);
    setSortOrder(order);
    const sortedData = sortData([...activities], key, order);
    console.log('Sorted data:', sortedData); // Debug log
    setActivities(sortedData);
  };

  return (
    <div>
      <h2>Real-Time Activity Log</h2>
      <div className="sort-options">
        <button onClick={() => handleSort('date')}>Sort by Date</button>
        <button onClick={() => handleSort('user')}>Sort by User</button>
        <button onClick={() => handleSort('company')}>Sort by Company</button>
      </div>
      <div className="activity-feed">
        {activities.length === 0 && <p>No activities to display.</p>}
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <p><strong>Date:</strong> {new Date(activity.date).toLocaleString()}</p>
            <p><strong>User:</strong> {activity.user}</p>
            <p><strong>Company:</strong> {activity.company}</p>
            <p><strong>Action:</strong> {activity.action}</p>
            <p><strong>Details:</strong> {activity.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;










