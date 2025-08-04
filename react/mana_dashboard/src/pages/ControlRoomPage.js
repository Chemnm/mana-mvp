import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Card, CardContent, Button, Chip, IconButton } from '@mui/material';
import { PlayArrow, Pause, SkipNext, SkipPrevious } from '@mui/icons-material';
import LiveFeed from '../components/dashboard/LiveFeed';

const demoEvents = [
  {
    _id: '1',
    incidentType: 'PPE Violation',
    capturedAt: '7/29/2025 14:35:42',
    alertMessage: 'CRITICAL: Worker without gloves detected - Contamination risk!',
    description: 'This evidence was automatically captured by the MANA monitoring system during production operations.',
    relatedInfo: {
      'Production Line': 'Line 3',
      'Shift': 'Afternoon (2:00 PM - 10:00 PM)',
      'Operator': 'John Smith',
      'Product': 'Chocolate Chip Cookies',
    },
    status: 'Under Review',
    videoUrl: 'https://public-waste-demos.s3.il-central-1.amazonaws.com/no-gloves.mp4',
    alertSeverity: 'error',
  },
  {
    _id: '2',
    incidentType: 'Overpouring Incident',
    capturedAt: '7/29/2025 14:41:18',
    alertMessage: 'WARNING: Excessive flour detected - 40% above recipe spec.',
    description: 'This evidence was automatically captured by the MANA monitoring system during production operations.',
    relatedInfo: {
        'Production Line': 'Line 3',
        'Shift': 'Afternoon (2:00 PM - 10:00 PM)',
        'Operator': 'John Smith',
        'Product': 'Chocolate Chip Cookies',
    },
    status: 'Resolved',
    videoUrl: 'https://public-waste-demos.s3.il-central-1.amazonaws.com/pouring-flower.mp4',
    alertSeverity: 'warning',
  },
  {
    _id: '3',
    incidentType: 'Equipment Malfunction',
    capturedAt: '7/29/2025 14:47:03',
    alertMessage: 'ALERT: Conveyor belt jammed - Production halted.',
    description: 'This evidence was automatically captured by the MANA monitoring system during production operations.',
    relatedInfo: {
        'Production Line': 'Line 3',
        'Shift': 'Afternoon (2:00 PM - 10:00 PM)',
        'Operator': 'John Smith',
        'Product': 'Chocolate Chip Cookies',
    },
    status: 'Maintenance Required',
    videoUrl: 'https://public-waste-demos.s3.il-central-1.amazonaws.com/machine-jammed.mp4',
    alertSeverity: 'error',
  },
];

const getStatusChip = (status) => {
    let color;
    switch (status) {
      case 'Resolved':
        color = 'success';
        break;
      case 'Under Review':
        color = 'warning';
        break;
      case 'Maintenance Required':
        color = 'error';
        break;
      default:
        color = 'default';
    }
    return <Chip label={status} color={color} size="small" />;
  };

const ControlRoomPage = () => {
  const [events, setEvents] = useState(demoEvents);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  const selectedEvent = events[currentIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const setVideoDuration = () => setDuration(video.duration);
      const updateCurrentTime = () => setCurrentTime(video.currentTime);

      video.addEventListener('loadedmetadata', setVideoDuration);
      video.addEventListener('timeupdate', updateCurrentTime);

      return () => {
        video.removeEventListener('loadedmetadata', setVideoDuration);
        video.removeEventListener('timeupdate', updateCurrentTime);
      };
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying, selectedEvent]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flex: '2 1 auto' }}>
            <Card sx={{ height: '100%'}}>
                <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Video Feed Evidence Review</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="body2" color="text.secondary">{selectedEvent.capturedAt}</Typography>
                            {getStatusChip(selectedEvent.status)}
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, backgroundColor: '#000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LiveFeed 
                            videoRef={videoRef}
                            videoSource={selectedEvent.videoUrl}
                            alertMessage={selectedEvent.alertMessage}
                            alertSeverity={selectedEvent.alertSeverity}
                        />
                    </Box>
                    <Box sx={{ p: 1, backgroundColor: 'rgba(0,0,0,0.9)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                            <Typography variant="body2" sx={{ color: 'white' }}>{currentIndex + 1} of {events.length}</Typography>
                            <IconButton onClick={handlePrevious} sx={{ color: 'white' }}><SkipPrevious /></IconButton>
                            <IconButton onClick={() => setIsPlaying(!isPlaying)} sx={{ color: 'white', backgroundColor: 'rgba(40, 167, 69, 0.8)', '&:hover': { backgroundColor: 'rgba(33, 136, 56, 0.8)' } }}>
                                {isPlaying ? <Pause /> : <PlayArrow />}
                            </IconButton>
                            <IconButton onClick={handleNext} sx={{ color: 'white' }}><SkipNext /></IconButton>
                            <Typography variant="body2" sx={{ color: 'white' }}>
                                {Math.floor(currentTime)}s / {Math.floor(duration)}s
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                    <Typography variant="h6" gutterBottom>Evidence Details</Typography>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="text.secondary">Incident Type</Typography>
                        <Typography variant="h5" sx={{ mt: 0.5 }}>{selectedEvent.incidentType}</Typography>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="text.secondary">Captured At</Typography>
                        <Typography variant="body1" sx={{ mt: 0.5 }}>{selectedEvent.capturedAt}</Typography>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="text.secondary">Alert Message</Typography>
                        <Box sx={{ mt: 1, p: 2, borderRadius: 1, backgroundColor: selectedEvent.alertSeverity === 'error' ? 'rgba(220, 53, 69, 0.1)' : 'rgba(255, 193, 7, 0.1)', border: `1px solid ${selectedEvent.alertSeverity === 'error' ? '#dc3545' : '#ffc107'}` }}>
                            <Typography variant="body2">{selectedEvent.alertMessage}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="text.secondary">Description</Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>{selectedEvent.description}</Typography>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Related Information</Typography>
                        <Box sx={{ mt: 1 }}>
                            {Object.entries(selectedEvent.relatedInfo).map(([key, value]) => (
                                <Typography key={key} variant="body2" color="text.secondary">• {key}: {value}</Typography>
                            ))}
                        </Box>
                    </Box>
                </CardContent>
                <Box sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>Actions</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                        <Button variant="contained" color="success" size="small">Mark Resolved</Button>
                        <Button variant="contained" color="info" size="small">Create Report</Button>
                        <Button variant="contained" color="warning" size="small">Assign to Team</Button>
                    </Box>
                </Box>
            </Card>
        </Box>
    </Box>
  );
};

export default ControlRoomPage;
