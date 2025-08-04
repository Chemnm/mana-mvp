import React from 'react';
import { Box } from '@mui/material';
import NewSidebar from './NewSidebar';

const ManagerLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NewSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default ManagerLayout;
