import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip
} from '@mui/material';
import { getWasteEventsByFacility } from '../../api/wasteEventService';
import useAuthStore from '../../store/authStore';

const EventLogTable = () => {
  const [events, setEvents] = useState([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const facilityId = user?.facilityId;
    if (facilityId) {
      const fetchEvents = async () => {
        try {
          const fetchedEvents = await getWasteEventsByFacility(facilityId);
          // Sort by most recent and take the top 5 for the dashboard view
          const sortedEvents = fetchedEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setEvents(sortedEvents.slice(0, 5));
        } catch (error) {
          console.error("Failed to fetch waste events:", error);
        }
      };
      fetchEvents();
    }
  }, [user]);

  const getSeverity = (cost) => {
    if (cost > 50) return { label: 'High', color: 'error' };
    if (cost > 20) return { label: 'Medium', color: 'warning' };
    return { label: 'Low', color: 'info' };
  };

  return (
    <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Recent Waste Events
        </Typography>
        <TableContainer sx={{ flexGrow: 1 }}>
          <Table stickyHeader sx={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Impact</TableCell>
                <TableCell>Operator</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => {
                const severity = getSeverity(event.costUsd);
                return (
                  <TableRow key={event._id} hover>
                    <TableCell sx={{ wordBreak: 'break-all' }}>{new Date(event.timestamp).toLocaleTimeString()}</TableCell>
                    <TableCell sx={{ wordBreak: 'break-all' }}>{event.wasteType}</TableCell>
                    <TableCell sx={{ wordBreak: 'break-all' }}>{`${event.facilityId.name} - ${event.productionLine}`}</TableCell>
                    <TableCell sx={{ wordBreak: 'break-all' }}>
                      <Chip 
                        label={severity.label} 
                        color={severity.color}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ wordBreak: 'break-all' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        ${event.costUsd.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ wordBreak: 'break-all' }}>{event.operatorId ? event.operatorId.name : 'N/A'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default EventLogTable;
