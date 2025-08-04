import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const RetailVideo = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Retail Video Detection
        </Typography>
        <video width="100%" controls>
          <source src="https://public-waste-demos.s3.il-central-1.amazonaws.com/Tesco+Sample+with+Small+Training.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </CardContent>
    </Card>
  );
};

export default RetailVideo;
