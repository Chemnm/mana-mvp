import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';

const data = [
  { name: 'Jan', wasteReduced: 400 },
  { name: 'Feb', wasteReduced: 300 },
  { name: 'Mar', wasteReduced: 500 },
  { name: 'Apr', wasteReduced: 450 },
  { name: 'May', wasteReduced: 600 },
  { name: 'Jun', wasteReduced: 550 },
];

const TeamWasteReductionChart = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Team Waste Reduction (Last 6 Months)
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="wasteReduced" stroke="#8884d8" name="Waste Reduced (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamWasteReductionChart;
