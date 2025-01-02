import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Set the app element for the modal
Modal.setAppElement('#root');

const CommunicationAction = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [communicationType, setCommunicationType] = useState('');
  const [communicationDate, setCommunicationDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    axios.get('/api/companies')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  const handleSelectCompany = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedCompanies(selectedOptions);
  };

  const handleLogCommunication = () => {
    setModalIsOpen(true);
  };

  const handleSubmit = () => {
    selectedCompanies.forEach(companyId => {
      const communicationData = {
        company: companyId,
        contactMethod: communicationType,
        date: communicationDate,
        notes: notes,
        status: "completed",  // Assuming status to be completed
      };

      // Send the communication data to the server
      axios.post('/api/communications', communicationData)
        .then(response => {
          console.log('Communication logged successfully for company:', companyId);
        })
        .catch(error => console.error('Error logging communication for company:', companyId, error));
    });

    setModalIsOpen(false);
    setSelectedCompanies([]);
    setCommunicationType('');
    setCommunicationDate('');
    setNotes('');
  };

  return (
    <div>
      <h2>Communication Action</h2>
      <select multiple onChange={handleSelectCompany}>
        {companies.map(company => (
          <option key={company._id} value={company._id}>
            {company.name}
          </option>
        ))}
      </select>
      <button onClick={handleLogCommunication}>Communication Performed</button>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Log Communication</h2>
        <form>
          <label>
            Type of Communication:
            <select value={communicationType} onChange={(e) => setCommunicationType(e.target.value)}>
              <option value="LinkedIn Post">LinkedIn Post</option>
              <option value="Email">Email</option>
              {/* Add other types as needed */}
            </select>
          </label>
          <label>
            Date of Communication:
            <input type="date" value={communicationDate} onChange={(e) => setCommunicationDate(e.target.value)} />
          </label>
          <label>
            Notes:
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
          </label>
          <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default CommunicationAction;








