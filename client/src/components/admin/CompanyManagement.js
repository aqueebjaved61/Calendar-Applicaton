import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CompanyManagement() {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    location: '',
    linkedin: '',
    email: '',
    phone: '',
    comments: '',
    communication: '',
  });
  const [editCompanyId, setEditCompanyId] = useState(null);

  useEffect(() => {
    axios.get('/api/companies')
      .then(response => {
        setCompanies(response.data);
      })
      .catch(error => {
        console.error('Error fetching companies:', error);
      });
  }, []);

  const handleAddCompany = () => {
    if (!newCompany.name || !newCompany.location ) {
      console.error('Company name and location are required');
      return;
    }

    if (editCompanyId) {
      axios.put(`/api/companies/${editCompanyId}`, newCompany)
        .then(response => {
          setCompanies(companies.map(company => (company._id === editCompanyId ? response.data : company)));
          setNewCompany({
            name: '',
            location: '',
            linkedin: '',
            email: '',
            phone: '',
            comments: '',
            communication: '',
          });
          setEditCompanyId(null);
        })
        .catch(error => {
          console.error('Error updating company:', error);
        });
    } else {
      axios.post('/api/companies', newCompany)
        .then(response => {
          setCompanies([...companies, response.data]);
          setNewCompany({
            name: '',
            location: '',
            linkedin: '',
            email: '',
            phone: '',
            comments: '',
            communication: '',
          });
        })
        .catch(error => {
          console.error('Error adding company:', error);
        });
    }
  };

  const handleEditCompany = (company) => {
    setNewCompany({
      name: company.name,
      location: company.location,
      linkedin: company.linkedin,
      email: company.email,
      phone: company.phone,
      comments: company.comments,
      communication: company.communication,
    });
    setEditCompanyId(company._id);
  };

  const handleDeleteCompany = (id) => {
    axios.delete(`/api/companies/${id}`)
      .then(() => {
        setCompanies(companies.filter(company => company._id !== id));
      })
      .catch(error => {
        console.error('Error deleting company:', error);
      });
  };

  return (
    <div>
      <h2>Company Management</h2>
      <div>
        <input
          type="text"
          placeholder="Company Name"
          value={newCompany.name}
          onChange={e => setNewCompany({ ...newCompany, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newCompany.location}
          onChange={e => setNewCompany({ ...newCompany, location: e.target.value })}
        />
        <input
          type="url"
          placeholder="LinkedIn Profile"
          value={newCompany.linkedin}
          onChange={e => setNewCompany({ ...newCompany, linkedin: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newCompany.email}
          onChange={e => setNewCompany({ ...newCompany, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={newCompany.phone}
          onChange={e => setNewCompany({ ...newCompany, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Comments"
          value={newCompany.comments}
          onChange={e => setNewCompany({ ...newCompany, comments: e.target.value })}
        />
        <input
          type="text"
          placeholder="Communication Periodicity"
          value={newCompany.communication}
          onChange={e => setNewCompany({ ...newCompany, communication: e.target.value })}
        />
        <button onClick={handleAddCompany}>
          {editCompanyId ? 'Update Company' : 'Add Company'}
        </button>
      </div>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>LinkedIn Profile</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Comments</th>
            <th>Communication Periodicity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td>{company.name}</td>
              <td>{company.location}</td>
              <td>{company.linkedin}</td>
              <td>{company.email}</td>
              <td>{company.phone}</td>
              <td>{company.comments}</td>
              <td>{company.communication}</td>
              <td>
                <button onClick={() => handleEditCompany(company)} style={{ marginRight: '10px' }}>Edit</button>
                <button onClick={() => handleDeleteCompany(company._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompanyManagement;








