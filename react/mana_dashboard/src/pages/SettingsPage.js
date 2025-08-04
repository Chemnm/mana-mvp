import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ThemeSwitcher from '../components/common/ThemeSwitcher';

const SettingsPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6">Theme</Typography>
        <ThemeSwitcher />
      </Paper>
    </Box>
  );
};

export default SettingsPage;
