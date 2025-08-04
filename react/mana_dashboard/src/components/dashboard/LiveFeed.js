import React from 'react';
import { Box, Card, CardContent, Typography, Alert } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';

const LiveFeed = ({ videoSource, alertMessage, alertSeverity = 'warning', videoRef }) => {
  return (
    <Card sx={{ 
      width: '350px ', 
      height: 'auto', 
      backgroundColor: 'background.paper',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <CardContent sx={{ p: 0, height: '100%', position: 'relative' }}>
        {/* Live indicator */}
        <Box sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '4px 12px',
          borderRadius: '20px'
        }}>
          <Box sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#ff0000',
            animation: 'pulse 1.5s infinite'
          }} />
          <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>
            LIVE
          </Typography>
        </Box>

        {/* Video feed */}
        {videoSource ? (
          <video
            ref={videoRef}
            src={videoSource}
            autoPlay
            loop
            muted
            crossOrigin="anonymous"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            color: '#666'
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <VideocamIcon sx={{ fontSize: 64, mb: 2 }} />
              <Typography>No feed available</Typography>
            </Box>
          </Box>
        )}

        {/* Alert overlay */}
        {alertMessage && (
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
          }}>
            <Alert 
              severity={alertSeverity}
              sx={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                '& .MuiAlert-icon': {
                  color: alertSeverity === 'error' ? '#ff4444' : '#ffaa00'
                }
              }}
            >
              {alertMessage}
            </Alert>
          </Box>
        )}
      </CardContent>

      <style jsx="true">{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </Card>
  );
};

export default LiveFeed;
