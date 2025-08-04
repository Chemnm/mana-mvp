import React, { useState } from 'react';
import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import AppHeader from '../components/layout/AppHeader';
import ManaAiChat from '../components/chatbot/ManaAiChat';
import StatCard from '../components/common/StatCard';
import WasteTrendChart from '../components/dashboard/WasteTrendChart';
import TopWastedFoods from '../components/dashboard/TopWastedFoods';
import TopLossReasons from '../components/dashboard/TopLossReasons';

// Mock data for different time periods
const executiveData = {
  day: {
    stats: [
      { title: 'Total Waste Value', value: '$3,842', trend: 'up', percentage: '12%' },
      { title: 'Carbon Impact', value: '842 kg CO₂', trend: 'up', percentage: '8%' },
      { title: 'Top Loss Reason', value: 'Equipment Failure', trend: 'neutral', percentage: '0%' },
      { title: 'Efficiency Rate', value: '87.5%', trend: 'down', percentage: '3%' }
    ],
    trend: [
      { name: '6AM', value: 320 },
      { name: '9AM', value: 580 },
      { name: '12PM', value: 950 },
      { name: '3PM', value: 720 },
      { name: '6PM', value: 1100 },
      { name: '9PM', value: 850 }
    ]
  },
  week: {
    stats: [
      { title: 'Total Waste Value', value: '$24,563', trend: 'down', percentage: '5%' },
      { title: 'Carbon Impact', value: '5.2 tons CO₂', trend: 'down', percentage: '7%' },
      { title: 'Top Loss Reason', value: 'Overproduction', trend: 'neutral', percentage: '0%' },
      { title: 'Efficiency Rate', value: '89.2%', trend: 'up', percentage: '2%' }
    ],
    trend: [
      { name: 'Mon', value: 3200 },
      { name: 'Tue', value: 3800 },
      { name: 'Wed', value: 3500 },
      { name: 'Thu', value: 4100 },
      { name: 'Fri', value: 4800 },
      { name: 'Sat', value: 3200 },
      { name: 'Sun', value: 1800 }
    ]
  },
  month: {
    stats: [
      { title: 'Total Waste Value', value: '$112,847', trend: 'down', percentage: '15%' },
      { title: 'Carbon Impact', value: '23.8 tons CO₂', trend: 'down', percentage: '12%' },
      { title: 'Top Loss Reason', value: 'Quality Defects', trend: 'neutral', percentage: '0%' },
      { title: 'Efficiency Rate', value: '91.3%', trend: 'up', percentage: '4%' }
    ],
    trend: [
      { name: 'Week 1', value: 28500 },
      { name: 'Week 2', value: 31200 },
      { name: 'Week 3', value: 26800 },
      { name: 'Week 4', value: 26347 }
    ]
  }
};

const ExecutiveDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const currentData = executiveData[timeRange];

  const handleTimeChange = (event, newTime) => {
    if (newTime !== null) {
      setTimeRange(newTime);
    }
  };

  return (
<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'background.default' }}>
      <AppHeader />
      <ManaAiChat />
      
      <Box sx={{ flex: 1, p: 3 }}>
        {/* Header with Time Filter */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">
            Executive Overview
          </Typography>
          <ToggleButtonGroup
            value={timeRange}
            exclusive
            onChange={handleTimeChange}
            aria-label="time range"
          >
            <ToggleButton value="day" aria-label="day">
              Day
            </ToggleButton>
            <ToggleButton value="week" aria-label="week">
              Week
            </ToggleButton>
            <ToggleButton value="month" aria-label="month">
              Month
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Grid container spacing={3}>
          {/* KPI Cards */}
          {currentData.stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatCard 
                title={stat.title} 
                value={stat.value} 
                trend={stat.trend} 
                percentage={stat.percentage} 
              />
            </Grid>
          ))}

          {/* Waste Trend Chart */}
          <Grid item xs={12} md={8}>
            <Box sx={{ height: 400 }}>
              <WasteTrendChart 
                title={`Waste Trend - ${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}`}
                data={currentData.trend}
                color="#28a745"
              />
            </Box>
          </Grid>

          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StatCard 
                  title="Cost Savings Opportunity" 
                  value="$18,450" 
                  trend="neutral" 
                  percentage="Potential monthly savings" 
                />
              </Grid>
              <Grid item xs={12}>
                <StatCard 
                  title="Compliance Score" 
                  value="96.5%" 
                  trend="up" 
                  percentage="Above target" 
                />
              </Grid>
              <Grid item xs={12}>
                <StatCard 
                  title="ROI on Waste Reduction" 
                  value="4.2x" 
                  trend="up" 
                  percentage="YTD performance" 
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Bottom Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: 300 }}>
              <TopWastedFoods data={[
                { name: 'Bakery Products', value: 320, color: '#28a745' },
                { name: 'Dairy', value: 245, color: '#0d6efd' },
                { name: 'Produce', value: 215, color: '#ffc107' },
                { name: 'Meat', value: 180, color: '#dc3545' }
              ]} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: 300 }}>
              <TopLossReasons data={currentData.trend} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ExecutiveDashboard;
