import React from 'react';
import { Card, CardContent, Typography, List, ListItem, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const actions = [
  { text: 'Adjusted inventory ordering - June 10', status: 'done' },
  { text: 'Updated storage protocols - June 8', status: 'done' },
  { text: 'Staff training scheduled - June 15', status: 'pending' },
  { text: 'Equipment maintenance - June 5', status: 'done' },
];

const StatusIcon = ({ status }) => {
  if (status === 'done') {
    return <CheckCircleIcon sx={{ color: '#28a745' }} />;
  }
  return <HourglassEmptyIcon sx={{ color: '#ffc107' }} />;
};

const ActionsTaken = () => {
  return (
    <Card sx={{ height: '100%', p: 2, borderRadius: '16px', backgroundColor: 'background.paper' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Actions Taken
        </Typography>
        <List>
          {actions.map((item, index) => (
            <ListItem key={index} disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 2, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <Typography variant="body2">{item.text}</Typography>
              <Box sx={{ ml: 2 }}>
                <StatusIcon status={item.status} />
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ActionsTaken; 