import React, { useState, useEffect } from 'react';
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
import UserForm from './UserForm';
import { getUsers, deleteUser, updateUser, addUser } from '../../api/userService';
import { getFacilities } from '../../api/facilityService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedUsers, fetchedFacilities] = await Promise.all([
          getUsers(),
          getFacilities(),
        ]);
        setUsers(fetchedUsers);
        setFacilities(fetchedFacilities);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpen = (user = null) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleSave = async (userData) => {
    try {
      if (userData._id) {
        // Update existing user
        await updateUser(userData._id, userData);
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } else {
        // Add new user
        await addUser(userData);
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      }
      handleClose();
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.error('Failed to delete user:', error);
        // Handle error in UI
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">User Management</Typography>
        <Button variant="contained" onClick={() => handleOpen()}>Add New User</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Facility</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.facilityId ? user.facilityId.name : 'N/A'}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => handleOpen(user)} sx={{ mr: 1 }}>Edit</Button>
                  <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(user._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserForm
        open={open}
        onClose={handleClose}
        user={selectedUser}
        onSave={handleSave}
        facilities={facilities}
      />
    </Box>
  );
};

export default UserManagement;
