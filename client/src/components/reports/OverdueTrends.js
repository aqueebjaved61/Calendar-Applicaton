import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './OverdueTrends.css';  // Ensure this path is correct

const OverdueTrends = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [error, setError] = useState('');

  const processChartData = useCallback((data) => {
    const companies = [...new Set(data.map(comm => comm.company))];
    const dates = [...new Set(data.map(comm => new Date(comm.date).toISOString().split('T')[0]))].sort();

    const datasets = companies.map(company => {
      const companyData = dates.map(date => {
        const count = data.filter(comm => comm.company === company && new Date(comm.date).toISOString().split('T')[0] === date).length;
        return count;
      });

      return {
        label: company,
        data: companyData,
        borderColor: getRandomColor(),
        fill: false,
      };
    });

    setChartData({
      labels: dates,
      datasets: datasets
    });
  }, []);

  useEffect(() => {
    axios.get('/api/communications')
      .then(response => {
        const overdueData = response.data.filter(comm => comm.status === 'overdue');
        processChartData(overdueData);
      })
      .catch(error => {
        setError(`Error fetching communications: ${error.response ? error.response.data.message : error.message}`);
      });
  }, [processChartData]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
      <h2>Overdue Communication Trends</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="chart-container">
        <Line 
          data={chartData} 
          options={{ 
            scales: { 
              y: { 
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Overdue Communications'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Date'
                }
              }
            },
            plugins: {
              title: {
                display: true,
                text: 'Overdue Communications by Company Over Time'
              }
            }
          }} 
        />
      </div>
    </div>
  );
};

export default OverdueTrends;













