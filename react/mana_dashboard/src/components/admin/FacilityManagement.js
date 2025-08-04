import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import FacilityForm from '../dashboard/FacilityForm';
import { Link } from 'react-router-dom';

const initialFacilities = [
  { id: 1, name: 'Factory A', location: 'New York, USA', status: 'Active' },
  { id: 2, name: 'Factory B', location: 'London, UK', status: 'Active' },
  { id: 3, name: 'Factory C', location: 'Tokyo, Japan', status: 'Inactive' },
];

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState(initialFacilities);
  const [open, setOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  const handleOpen = (facility = null) => {
    setSelectedFacility(facility);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFacility(null);
  };

  const handleSave = (facility) => {
    if (facility.id) {
      setFacilities(facilities.map((f) => (f.id === facility.id ? facility : f)));
    } else {
      const newFacility = { ...facility, id: facilities.length + 1 };
      setFacilities([...facilities, newFacility]);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Facility Management</Typography>
        <Button variant="contained" onClick={() => handleOpen()}>Add New Facility</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facilities.map((facility) => (
              <TableRow key={facility.id}>
                <TableCell>{facility.id}</TableCell>
                <TableCell>{facility.name}</TableCell>
                <TableCell>{facility.location}</TableCell>
                <TableCell>{facility.status}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/facility/${facility.id}`} variant="outlined" size="small" sx={{ mr: 1 }}>View</Button>
                  <Button variant="outlined" size="small" onClick={() => handleOpen(facility)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FacilityForm
        open={open}
        onClose={handleClose}
        facility={selectedFacility}
        onSave={handleSave}
      />
    </Box>
  );
};

export default FacilityManagement;
