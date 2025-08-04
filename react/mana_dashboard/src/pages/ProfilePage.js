import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import useAuthStore from '../store/authStore';
import { getFacilities } from '../api/facilityService';

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const [facility, setFacility] = useState(null);

  useEffect(() => {
    const fetchFacility = async () => {
      if (user?.facilityId) {
        try {
          const facilities = await getFacilities();
          const userFacility = facilities.find(f => f._id === user.facilityId);
          setFacility(userFacility);
        } catch (error) {
          console.error("Failed to load facility details:", error);
        }
      }
    };

    fetchFacility();
  }, [user]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar 
            sx={{ width: 80, height: 80, mr: 2 }} 
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
          <Box>
            <Typography variant="h5">{user?.firstName} {user?.lastName}</Typography>
            <Typography variant="body1" color="text.secondary">{user?.role}</Typography>
            <Button variant="outlined" size="small" sx={{ mt: 1 }}>
              Change Picture
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>
          User Details
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Email" secondary={user?.email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Facility" secondary={facility?.name || 'N/A'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Facility Location" secondary={facility?.location || 'N/A'} />
          </ListItem>
        </List>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>
          Security
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button variant="contained">Reset Password</Button>
            <Button variant="outlined" color="error" onClick={logout}>
                Logout
            </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
