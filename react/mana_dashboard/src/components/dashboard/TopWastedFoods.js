import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = {
  'Spillage': '#0088FE',
  'Contamination': '#00C49F',
  'Overproduction': '#FFBB28',
  'Packaging Defect': '#FF8042',
  'Ingredient Error': '#AF19FF',
};

const TopWastedFoods = ({ data }) => {
  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Top Wasted Ingredients
        </Typography>
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip
                  contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#ffffff'
                  }}
              />
              <Legend />
              {Object.keys(COLORS).map(wasteType => (
                <Bar key={wasteType} dataKey={`wasteTypes.${wasteType}`} stackId="a" fill={COLORS[wasteType]} name={wasteType} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TopWastedFoods;
