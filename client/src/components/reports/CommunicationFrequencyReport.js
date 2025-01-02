import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CommunicationFrequencyReport.css';  // Include your CSS file for styling

const CommunicationFrequencyReport = () => {
  const [communications, setCommunications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Communication Frequency',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    }]
  });

  useEffect(() => {
    axios.get('/api/communications')
      .then(response => {
        setCommunications(response.data);
        console.log('Communications Data:', response.data);
      })
      .catch(error => console.error('Error fetching communications:', error));

    axios.get('/api/companies')
      .then(response => {
        setCompanies(response.data);
        console.log('Companies Data:', response.data);
      })
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  const applyFilters = () => {
    let filteredData = communications;

    if (selectedCompany) {
      filteredData = filteredData.filter(comm => comm.company === selectedCompany);
    }

    if (startDate && endDate) {
      filteredData = filteredData.filter(comm => 
        new Date(comm.date) >= new Date(startDate) && new Date(comm.date) <= new Date(endDate)
      );
    }

    if (selectedMethod) {
      filteredData = filteredData.filter(comm => comm.contactMethod === selectedMethod);
    }

    const methodCounts = filteredData.reduce((acc, comm) => {
      acc[comm.contactMethod] = (acc[comm.contactMethod] || 0) + 1;
      return acc;
    }, {});

    console.log('Filtered Data:', filteredData);
    console.log('Method Counts:', methodCounts);

    setChartData({
      labels: Object.keys(methodCounts),
      datasets: [{
        label: 'Communication Frequency',
        data: Object.values(methodCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }]
    });
  };

  useEffect(() => {
    if (communications && companies) {
      applyFilters();
    }
  }, [selectedCompany, startDate, endDate, selectedMethod, communications]);

  return (
    <div>
      <h2>Communication Frequency Report</h2>

      <div className="filters">
        <label>
          Company:
          <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
            <option value="">All Companies</option>
            {companies.map(company => (
              <option key={company._id} value={company._id}>{company.name}</option>
            ))}
          </select>
        </label>

        <label>
          Date Range:
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="End Date"
          />
        </label>

        <label>
          Communication Method:
          <select value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
            <option value="">All Methods</option>
            <option value="LinkedIn Post">LinkedIn Post</option>
            <option value="Email">Email</option>
            {/* Add other communication methods as needed */}
          </select>
        </label>
      </div>

      <div className="chart-container">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default CommunicationFrequencyReport;











