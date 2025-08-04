import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WastedIngredientsBubbleChart = ({ data }) => {
  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Wasted Ingredients by CO2e
        </Typography>
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="name" name="ingredient" />
              <YAxis type="number" dataKey="value" name="co2e" unit="kg" />
              <ZAxis type="number" dataKey="value" range={[100, 1000]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Wasted Ingredients" data={data} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WastedIngredientsBubbleChart;
