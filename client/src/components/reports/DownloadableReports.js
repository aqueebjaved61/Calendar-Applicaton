import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const DownloadableReports = () => {
  const handleDownload = (format) => {
    axios.get(`/api/reports/download?format=${format}`, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `report.${format}`);
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => console.error('Error downloading report:', error));
  };

  return (
    <div>
      <h2>Downloadable Reports</h2>
      <Button variant="contained" onClick={() => handleDownload('pdf')}>Download PDF</Button>
      <Button variant="contained" onClick={() => handleDownload('csv')}>Download CSV</Button>
    </div>
  );
};

export default DownloadableReports;
