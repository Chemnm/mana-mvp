import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, ButtonGroup, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dailyData = [
  { name: '8 AM', customers: 12 },
  { name: '9 AM', customers: 19 },
  { name: '10 AM', customers: 25 },
  { name: '11 AM', customers: 32 },
  { name: '12 PM', customers: 45 },
  { name: '1 PM', customers: 40 },
  { name: '2 PM', customers: 35 },
  { name: '3 PM', customers: 38 },
  { name: '4 PM', customers: 42 },
  { name: '5 PM', customers: 55 },
  { name: '6 PM', customers: 60 },
  { name: '7 PM', customers: 50 },
];

const weeklyData = [
  { name: 'Mon', customers: 250 },
  { name: 'Tue', customers: 280 },
  { name: 'Wed', customers: 320 },
  { name: 'Thu', customers: 310 },
  { name: 'Fri', customers: 450 },
  { name: 'Sat', customers: 550 },
  { name: 'Sun', customers: 480 },
];

const monthlyData = [
  { name: 'Week 1', customers: 1500 },
  { name: 'Week 2', customers: 1600 },
  { name: 'Week 3', customers: 1800 },
  { name: 'Week 4', customers: 1750 },
];

const quarterlyData = [
  { name: 'Q1', customers: 20000 },
  { name: 'Q2', customers: 22000 },
  { name: 'Q3', customers: 25000 },
  { name: 'Q4', customers: 23000 },
];

const CustomerTrafficChart = () => {
  const [timeRange, setTimeRange] = useState('day');

  const getData = () => {
    switch (timeRange) {
      case 'week':
        return weeklyData;
      case 'month':
        return monthlyData;
      case 'quarter':
        return quarterlyData;
      default:
        return dailyData;
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Customer Traffic
          </Typography>
          <ButtonGroup size="small">
            <Button onClick={() => setTimeRange('day')} variant={timeRange === 'day' ? 'contained' : 'outlined'}>Day</Button>
            <Button onClick={() => setTimeRange('week')} variant={timeRange === 'week' ? 'contained' : 'outlined'}>Week</Button>
            <Button onClick={() => setTimeRange('month')} variant={timeRange === 'month' ? 'contained' : 'outlined'}>Month</Button>
            <Button onClick={() => setTimeRange('quarter')} variant={timeRange === 'quarter' ? 'contained' : 'outlined'}>Year</Button>
          </ButtonGroup>
        </Box>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="customers" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CustomerTrafficChart;
