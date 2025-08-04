import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AppHeader from '../components/layout/AppHeader';
import FacilityForm from '../components/dashboard/FacilityForm';
import { Link } from 'react-router-dom';
import { getFacilities, createFacility, updateFacility, deleteFacility } from '../api/facilityService';
import useAuthStore from '../store/authStore';

const FacilityManagementPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const user = useAuthStore((state) => state.user);

  const loadFacilities = useCallback(async () => {
    try {
      let data = await getFacilities();
      if (user?.role === 'Manager') {
        data = data.filter(facility => facility._id === user.facilityId);
      }
      setFacilities(data);
    } catch (error) {
      console.error("Failed to load facilities:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadFacilities();
    }
  }, [user, loadFacilities]);

  const handleOpen = (facility = null) => {
    setSelectedFacility(facility);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFacility(null);
  };

  const handleSave = async (facility) => {
    try {
      if (facility._id) {
        await updateFacility(facility._id, facility);
      } else {
        await createFacility(facility);
      }
      loadFacilities();
    } catch (error) {
      console.error("Failed to save facility:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await deleteFacility(_id);
      loadFacilities();
    } catch (error) {
      console.error("Failed to delete facility:", error);
    }
  };

  return (
<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'background.default' }}>
      <AppHeader />
      <Box sx={{ flex: 1, p: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4">Facility Management</Typography>
              {user?.role === 'Admin' && (
                <Button variant="contained" onClick={() => handleOpen()}>Add New Facility</Button>
              )}
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
                    <TableRow key={facility._id}>
                      <TableCell>{facility._id}</TableCell>
                      <TableCell>{facility.name}</TableCell>
                      <TableCell>{facility.location}</TableCell>
                      <TableCell>{facility.status}</TableCell>
                      <TableCell>
                        <Button component={Link} to={`/facility/${facility._id}`} variant="outlined" size="small" sx={{ mr: 1 }}>View</Button>
                        {user?.role === 'Admin' && (
                          <>
                            <Button variant="outlined" size="small" onClick={() => handleOpen(facility)} sx={{ mr: 1 }}>Edit</Button>
                            <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(facility._id)}>Delete</Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
        <FacilityForm
          open={open}
          onClose={handleClose}
          facility={selectedFacility}
          onSave={handleSave}
        />
      </Box>
    </Box>
  );
};

export default FacilityManagementPage;
