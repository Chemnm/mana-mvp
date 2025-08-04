import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import useDataStore from '../../store/dataStore';

const TimeRangeSelector = () => {
  const { timeRange, setTimeRange } = useDataStore();

  const handleChange = (event, newTimeRange) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  return (
    <ToggleButtonGroup
      value={timeRange}
      exclusive
      onChange={handleChange}
      aria-label="time range"
      sx={{
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.2)',
        '& .MuiToggleButtonGroup-grouped': {
          border: 0,
          color: 'text.secondary',
          padding: '8px 24px',
          '&.Mui-selected': {
            backgroundColor: '#28a745',
            color: 'white',
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: '#218838',
            }
          },
          '&:not(:first-of-type)': {
            borderRadius: '20px',
          },
          '&:first-of-type': {
            borderRadius: '20px',
          },
        },
      }}
    >
      <ToggleButton value="week" aria-label="weekly">
        Week
      </ToggleButton>
      <ToggleButton value="month" aria-label="monthly">
        Month
      </ToggleButton>
      <ToggleButton value="quarter" aria-label="quarterly">
        Quarter
      </ToggleButton>
      <ToggleButton value="year" aria-label="yearly">
        Year
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TimeRangeSelector; 