import React from 'react';
import { Box, Typography, ImageList, ImageListItem, Card, CardContent } from '@mui/material';
import fallingOffConveyorBelt from '../../assets/images/falling-off-conveyor-belt.png';
import rollsInGarbage from '../../assets/images/rolls-in-garbage.png';

const images = [
  fallingOffConveyorBelt,
  rollsInGarbage,
  fallingOffConveyorBelt,
  rollsInGarbage,
];

const PhotoStream = () => {
  return (
    <Card sx={{ width: '100%', height: '100%', p: 2, borderRadius: '16px', backgroundColor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Photo Stream
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Your Most Recent Transaction Photos
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: 2,
            overflowY: 'auto',
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'rgba(0,0,0,0.2)',
              }}
            >
              <img src={image} alt={`stream-img-${index}`} style={{ width: '100%', height: '100px'}} />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PhotoStream;
