import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, CardContent, Typography, TextField, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { getWasteEvents, addWasteEvent } from '../../api/wasteEventService';
import { getFacilities } from '../../api/facilityService';

const WasteLogUpload = () => {
  const [logs, setLogs] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [newLog, setNewLog] = useState({
    timestamp: '',
    wasteType: '',
    weightKg: '',
    facilityId: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedEvents, fetchedFacilities] = await Promise.all([
          getWasteEvents(),
          getFacilities(),
        ]);
        setLogs(fetchedEvents);
        setFacilities(fetchedFacilities);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLog({ ...newLog, [name]: value });
  };

  const handleAddLog = async () => {
    try {
      await addWasteEvent(newLog);
      const fetchedEvents = await getWasteEvents();
      setLogs(fetchedEvents);
      setNewLog({ timestamp: '', wasteType: '', weightKg: '', facilityId: '' });
    } catch (error) {
      console.error("Failed to add waste log:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Handle the file upload logic here
      console.log('Uploading file:', selectedFile.name);
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Manual Entry Form */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Add Waste Log Manually</Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label="Timestamp"
                name="timestamp"
                type="datetime-local"
                value={newLog.timestamp}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Facility</InputLabel>
                <Select
                  name="facilityId"
                  value={newLog.facilityId}
                  onChange={handleInputChange}
                  label="Facility"
                >
                  {facilities.map((facility) => (
                    <MenuItem key={facility._id} value={facility._id}>
                      {facility.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Waste Type"
                name="wasteType"
                value={newLog.wasteType}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weightKg"
                type="number"
                value={newLog.weightKg}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" onClick={handleAddLog}>Add Log</Button>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Upload from File</Typography>
            <TextField
              type="file"
              onChange={handleFileChange}
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={!selectedFile}
            >
              Upload File
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Log Table */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Manual Waste Logs</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Facility</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Weight (kg)</TableCell>
                        <TableCell>Cost (USD)</TableCell>
                      </TableRow>
                </TableHead>
                    <TableBody>
                      {logs.map((log) => (
                        <TableRow key={log._id}>
                          <TableCell>{log._id}</TableCell>
                          <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                          <TableCell>{log.facilityId ? log.facilityId.name : 'N/A'}</TableCell>
                          <TableCell>{log.wasteType}</TableCell>
                          <TableCell>{log.weightKg}</TableCell>
                          <TableCell>{log.costUsd}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default WasteLogUpload;
