import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './EngagementEffectivenessDashboard.css';  // Include your CSS file for styling

const EngagementEffectivenessDashboard = () => {
  const [communications, setCommunications] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Success Rate (%)',
      data: [],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    }]
  });
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/communications')
      .then(response => {
        console.log('Fetched communications:', response.data);  // Log fetched data
        setCommunications(response.data);
        calculateMetrics(response.data);
      })
      .catch(error => {
        console.error('Error fetching communications:', error.response ? error.response.data : error.message);
        setError(`Error fetching communications: ${error.response ? error.response.data.message : error.message}`);
      });
  }, []);

  const calculateMetrics = (data) => {
    console.log('Calculating metrics with data:', data);  // Log data for metrics calculation
    const methods = ['Email', 'Phone Call', 'LinkedIn Message']; // Add other methods as needed
    const metrics = methods.reduce((acc, method) => {
      const total = data.filter(comm => comm.contactMethod === method).length;
      console.log(`Total communications for ${method}:`, total);  // Log total
      const successful = data.filter(comm => comm.contactMethod === method && comm.status === 'successful').length;
      console.log(`Successful communications for ${method}:`, successful);  // Log successful
      const successRate = total > 0 ? (successful / total) * 100 : 0;
      console.log(`Success rate for ${method}:`, successRate);  // Log success rate
      acc[method] = successRate;
      return acc;
    }, {});
    console.log('Calculated metrics:', metrics);  // Log calculated metrics

    setChartData({
      labels: Object.keys(metrics),
      datasets: [{
        label: 'Success Rate (%)',
        data: Object.values(metrics),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      }]
    });
  };

  return (
    <div>
      <h2>Engagement Effectiveness Dashboard</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
      <div className="chart-container">
        <Bar 
          data={chartData} 
          options={{ 
            scales: { 
              y: { 
                beginAtZero: true, 
                max: 100 
              } 
            },
            plugins: {
              title: {
                display: true,
                text: 'Engagement Success Rates by Communication Method'
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.dataset.label || '';
                    return `${label}: ${context.raw.toFixed(2)}%`;
                  }
                }
              }
            }
          }} 
        />
      </div>
    </div>
  );
};

export default EngagementEffectivenessDashboard;








