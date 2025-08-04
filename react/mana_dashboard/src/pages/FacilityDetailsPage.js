import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import AppHeader from '../components/layout/AppHeader';
import { useParams } from 'react-router-dom';
import { getFacilityById } from '../api/facilityService';

const FacilityDetailsPage = () => {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const data = await getFacilityById(id);
        setFacility(data);
      } catch (error) {
        console.error("Failed to fetch facility:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacility();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!facility) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'background.default' }}>
        <AppHeader />
        <Box sx={{ flex: 1, p: 3 }}>
          <Typography variant="h4">Facility not found</Typography>
        </Box>
      </Box>
    );
  }

  return (
<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'background.default' }}>
      <AppHeader />
      <Box sx={{ flex: 1, p: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" sx={{ mb: 2 }}>{facility.name}</Typography>
            <Typography variant="body1"><strong>ID:</strong> {facility._id}</Typography>
            <Typography variant="body1"><strong>Location:</strong> {facility.location}</Typography>
            <Typography variant="body1"><strong>Status:</strong> {facility.status}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FacilityDetailsPage;
