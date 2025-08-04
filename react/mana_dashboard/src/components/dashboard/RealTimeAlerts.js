import React from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

const RealTimeAlerts = ({ alerts = [] }) => {
  const getAlertIcon = (severity) => {
    switch (severity) {
      case 'error':
        return <ErrorIcon sx={{ color: '#ff4444' }} />;
      case 'warning':
        return <WarningIcon sx={{ color: '#ffaa00' }} />;
      default:
        return <InfoIcon sx={{ color: '#00aaff' }} />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error':
        return '#ff4444';
      case 'warning':
        return '#ffaa00';
      default:
        return '#00aaff';
    }
  };

  return (
    <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Real-Time Alerts
        </Typography>
        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {alerts.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
              No active alerts
            </Typography>
          ) : (
            alerts.map((alert, index) => (
              <ListItem
                key={index}
                sx={{
                  borderLeft: `4px solid ${getSeverityColor(alert.severity)}`,
                  mb: 1,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '0 4px 4px 0'
                }}
              >
                <ListItemIcon>
                  {getAlertIcon(alert.severity)}
                </ListItemIcon>
                <ListItemText
                  primary={alert.message}
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        {alert.timestamp}
                      </Typography>
                      {alert.location && (
                        <Chip label={alert.location} size="small" />
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default RealTimeAlerts; 