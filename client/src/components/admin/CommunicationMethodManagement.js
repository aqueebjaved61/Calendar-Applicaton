import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, FormControlLabel } from '@mui/material';
import '../user/Dashboard.css'; // Correct path to the CSS file

const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState([]);
  const [newMethod, setNewMethod] = useState({
    name: '',
    description: '',
    sequence: 0,
    mandatory: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [editMethodId, setEditMethodId] = useState(null);

  // Base URL for backend API
  const BASE_URL = 'http://localhost:3001/api/communication-methods';

  useEffect(() => {
    axios.get(BASE_URL)
      .then((response) => {
        console.log('Fetched Methods:', response.data); // Log the fetched data
        setMethods(response.data);
      })
      .catch((error) => console.error('Error fetching methods:', error));
  }, []);

  const handleAddOrUpdateMethod = () => {
    if (!newMethod.name || !newMethod.description) {
      alert('Please fill in all required fields.');
      return;
    }

    if (editMode) {
      // Update existing method
      axios.put(`${BASE_URL}/${editMethodId}`, newMethod)
        .then((response) => {
          setMethods(methods.map((method) => (method._id === editMethodId ? response.data : method)));
          resetForm();
        })
        .catch((error) => {
          console.error('Error updating method:', error);
          alert('Failed to update the method. Please try again.');
        });
    } else {
      // Add new method
      axios.post(BASE_URL, newMethod)
        .then((response) => {
          setMethods([...methods, response.data]);
          resetForm();
        })
        .catch((error) => {
          console.error('Error adding method:', error);
          alert('Failed to add the method. Please try again.');
        });
    }
  };

  const handleEditMethod = (method) => {
    setEditMode(true);
    setEditMethodId(method._id);
    setNewMethod({
      name: method.name,
      description: method.description,
      sequence: method.sequence,
      mandatory: method.mandatory,
    });
  };

  const handleDeleteMethod = (id) => {
    axios.delete(`${BASE_URL}/${id}`)
      .then(() => {
        setMethods(methods.filter((method) => method._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting method:', error);
        alert('Failed to delete the method. Please try again.');
      });
  };

  const resetForm = () => {
    setNewMethod({
      name: '',
      description: '',
      sequence: 0,
      mandatory: false,
    });
    setEditMode(false);
    setEditMethodId(null);
  };

  return (
    <div>
      <h2>Communication Method Management</h2>
      <div>
        <TextField
          label="Name"
          value={newMethod.name}
          onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
        />
        <TextField
          label="Description"
          value={newMethod.description}
          onChange={(e) => setNewMethod({ ...newMethod, description: e.target.value })}
        />
        <TextField
          label="Sequence"
          type="number"
          value={newMethod.sequence}
          onChange={(e) => setNewMethod({ ...newMethod, sequence: parseInt(e.target.value, 10) })}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newMethod.mandatory}
              onChange={(e) => setNewMethod({ ...newMethod, mandatory: e.target.checked })}
            />
          }
          label="Mandatory"
        />
        <Button variant="contained" onClick={handleAddOrUpdateMethod}>
          {editMode ? 'Update Method' : 'Add Method'}
        </Button>
        {editMode && <Button onClick={resetForm}>Cancel Edit</Button>}
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Sequence</TableCell>
            <TableCell>Mandatory</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {methods.map((method) => (
            <TableRow key={method._id}>
              <TableCell>{method.name}</TableCell>
              <TableCell>{method.description}</TableCell>
              <TableCell>{method.sequence}</TableCell>
              <TableCell>{method.mandatory ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditMethod(method)}>Edit</Button>
                <Button onClick={() => handleDeleteMethod(method._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommunicationMethodManagement;






