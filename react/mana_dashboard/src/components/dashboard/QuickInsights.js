import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const QuickInsights = ({ insights }) => {
  const theme = useTheme();
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'text.primary', borderBottom: 1, borderColor: 'divider', paddingBottom: '10px' }}>
        Quick Insights
      </Typography>
      {insights ? (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            <strong>Peak waste time:</strong> {insights.peakWasteTime}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            <strong>Most affected line:</strong> {insights.mostAffectedLine}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            <strong>Top waste category:</strong> {insights.topWasteCategory}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            <strong>Compliance improvement:</strong> {insights.complianceImprovement}
          </Typography>
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Loading insights...
        </Typography>
      )}
    </Box>
  );
};

export default QuickInsights;
