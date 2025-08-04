import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Warning, ShoppingCart, TrendingUp, MonetizationOn } from '@mui/icons-material';

const recommendations = [
  {
    icon: <Warning color="error" />,
    primary: 'Stockout Alert: Tomatoes',
    secondary: 'Tomatoes are running low. Consider restocking.',
  },
  {
    icon: <MonetizationOn color="success" />,
    primary: 'Promotional Suggestion: Meat',
    secondary: 'Meat is nearing its expiration date. Suggest a 20% discount.',
  },
  {
    icon: <TrendingUp color="info" />,
    primary: 'Customer Traffic Insight',
    secondary: 'Peak customer traffic is between 5 PM and 6 PM. Adjust staffing accordingly.',
  },
  {
    icon: <ShoppingCart color="primary" />,
    primary: 'Promotional Effectiveness',
    secondary: 'The "Buy One Get One Free" on packaged cheese increased sales by 35%.',
  },
  {
    icon: <MonetizationOn color="warning" />,
    primary: 'Waste Reduction Tip',
    secondary: 'Consider donating items nearing expiration to a local food bank to reduce waste and receive a tax credit.',
  },
];

const Recommendations = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recommendations & Alerts
        </Typography>
        <List>
          {recommendations.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.primary} secondary={item.secondary} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
