import React from 'react';
import { Grid, Box } from '@mui/material';
import useDataStore from '../store/dataStore';

// Import all the components
import AppHeader from '../components/layout/AppHeader';
import StatCard from '../components/common/StatCard';
import TopWastedFoods from '../components/dashboard/TopWastedFoods';
import TopLossReasons from '../components/dashboard/TopLossReasons';
import PhotoStream from '../components/dashboard/PhotoStream';
import AiRecommendations from '../components/dashboard/AiRecommendations';
import ActionsTaken from '../components/dashboard/ActionsTaken';
import TimeRangeSelector from '../components/dashboard/TimeRangeSelector';

const DashboardPage = () => {
  const { dashboardData } = useDataStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3, boxSizing: 'border-box', gap: 2 }}>
      <AppHeader />

      {/* Row 1: Stat Cards */}
      <Grid container spacing={3}>
        {dashboardData.stats.map((stat, index) => (
          <Grid item xs={12} md={12} key={index}>
            <StatCard title={stat.title} value={stat.value} trend={stat.trend} percentage={stat.percentage} />
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
        {/* Row 2 */}
        <Grid container spacing={3} sx={12}>
          <Grid item xs={4} sx={{ display: 'flex' }}><TopWastedFoods data={dashboardData.topWastedFoods} /></Grid>
          <Grid item xs={5} sx={{ display: 'flex' }}><TopLossReasons data={dashboardData.topLossReasons} /></Grid>
          <Grid item xs={3} sx={{ display: 'flex' }}><PhotoStream /></Grid>
        </Grid>
        
        {/* Row 3 */}
        <Grid container spacing={3} sx={12}>
          <Grid item xs={6} sx={{ display: 'flex' }}><AiRecommendations /></Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}><ActionsTaken /></Grid>
        </Grid>
      </Box>
      
      <Box sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        p: 2,
        // backgroundColor: '#121212',
        zIndex: 10,
      }}>
        <TimeRangeSelector />
      </Box>
    </Box>
  );
};

export default DashboardPage; 