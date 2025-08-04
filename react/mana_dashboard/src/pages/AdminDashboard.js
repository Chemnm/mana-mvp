import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Card, CardContent } from '@mui/material';
import AppHeader from '../components/layout/AppHeader';
import UserManagement from '../components/admin/UserManagement';
import FacilityManagement from '../components/admin/FacilityManagement';
import WasteLogUpload from '../components/admin/WasteLogUpload';

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'background.default' }}>
      <AppHeader />
      
      <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
<Typography variant="h4" sx={{ mb: 3, color: 'text.primary' }}>Admin Dashboard</Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} textColor="inherit" indicatorColor="primary">
<Tab label="User Management" sx={{ color: 'text.primary' }} />
<Tab label="Facility Management" sx={{ color: 'text.primary' }} />
<Tab label="Manual Waste Log Upload" sx={{ color: 'text.primary' }} />
          </Tabs>
        </Box>

<Card sx={{ backgroundColor: 'background.paper' }}>
          <CardContent>
            {tabValue === 0 && <UserManagement />}
            {tabValue === 1 && <FacilityManagement />}
            {tabValue === 2 && <WasteLogUpload />}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
