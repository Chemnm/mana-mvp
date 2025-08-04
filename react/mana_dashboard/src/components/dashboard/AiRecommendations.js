import React from 'react';
import { Card, CardContent, Typography, List, ListItem, Box } from '@mui/material';

const recommendations = [
  { text: 'Reduce vegetable inventory by 15% to prevent spoilage based on current demand trends.', color: '#28a745' },
  { text: 'Adjust refrigeration temperature for fish storage from 36°F to 34°F to extend shelf life.', color: '#0d6efd' },
  { text: 'Schedule staff training on proper egg handling to reduce breakage by estimated 22%.', color: '#ffc107' },
];

const AiRecommendations = () => {
  return (
    <Card sx={{ height: '100%', p: 2, borderRadius: '16px', backgroundColor: 'background.paper' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          AI Recommendations
        </Typography>
        <List>
          {recommendations.map((item, index) => (
            <ListItem key={index} disableGutters sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: item.color, mr: 2, flexShrink: 0 }} />
              <Typography variant="body2">{item.text}</Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default AiRecommendations; 