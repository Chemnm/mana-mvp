import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const StatCard = ({ title, value, trend, percentage }) => {
  const theme = useTheme();
  const isPositive = trend === 'up';
  
  // Custom colors based on title for the value
  const valueColor = {
    "Waste Value": "#66FF66", // Bright Green
    "Waste Weight": theme.palette.text.primary,
    "Waste Transactions": theme.palette.text.primary,
    "Compliance Rate": theme.palette.text.primary,
    "Active Lines": theme.palette.text.primary,
    "Carbon Impact": "#FF6666" // Bright Red
  }[title] || theme.palette.text.primary;

  const trendIcon = isPositive ? <ArrowUpwardIcon sx={{ fontSize: '1rem' }} /> : <ArrowDownwardIcon sx={{ fontSize: '1rem' }} />;
  
  // For "Waste Value", up is good (green). For "Carbon Impact", down is good (green).
  let trendColor = 'text.secondary';
  if (title === 'Waste Value' || title === 'Waste Transactions') {
    trendColor = isPositive ? 'success.main' : 'error.main';
  } else if (title === 'Waste Weight' || title === 'Carbon Impact') {
    trendColor = isPositive ? 'error.main' : 'success.main';
  }


  return (
    <Card sx={{ background: 'none', boxShadow: 'none', p: 2, borderRadius: '16px', backgroundColor: 'background.paper' }}>
      <CardContent>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h3" component="div" fontWeight="bold" sx={{ color: valueColor, my: 1 }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', color: trendColor }}>
          {trendIcon}
          <Typography variant="body2" sx={{ ml: 1 }}>
            {percentage}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
