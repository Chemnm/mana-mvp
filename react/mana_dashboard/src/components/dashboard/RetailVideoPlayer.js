import React, { useEffect, useRef } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const RetailVideoPlayer = ({ onTimeUpdate }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      onTimeUpdate(video.currentTime);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onTimeUpdate]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Live Retail Feed
        </Typography>
        <video
          ref={videoRef}
          style={{ width: '100%' }}
          controls
          autoPlay
          muted
          loop
          src="https://public-waste-demos.s3.il-central-1.amazonaws.com/Tesco_Demo_Feed.mov"
        />
      </CardContent>
    </Card>
  );
};

export default RetailVideoPlayer;
