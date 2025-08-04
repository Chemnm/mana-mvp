import React, { useState } from 'react';
import {
  Box, Button, Card, CardContent, Typography, TextField, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import AppHeader from '../components/layout/AppHeader';

const initialLogs = [
  { id: 1, date: '2023-10-27', type: 'Organic', amount: 50, disposal: 'Compost', emissions: 0.02 },
  { id: 2, date: '2023-10-27', type: 'Plastic', amount: 25, disposal: 'Recycling', emissions: 0.05 },
];

const WasteLogUploadPage = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [newLog, setNewLog] = useState({
    date: '',
    type: '',
    amount: '',
    disposal: '',
    emissions: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLog({ ...newLog, [name]: value });
  };

  const handleAddLog = () => {
    const logToAdd = { ...newLog, id: logs.length + 1 };
    setLogs([...logs, logToAdd]);
    setNewLog({ date: '', type: '', amount: '', disposal: '', emissions: '' });
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
<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'background.default' }}>
      <AppHeader />
      <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
        <Grid container spacing={3}>
          {/* Manual Entry Form */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>Add Waste Log Manually</Typography>
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    fullWidth
                    label="Date"
                    name="date"
                    type="date"
                    value={newLog.date}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Waste Type</InputLabel>
                    <Select
                      name="type"
                      value={newLog.type}
                      onChange={handleInputChange}
                      label="Waste Type"
                    >
                      <MenuItem value="Organic">Organic</MenuItem>
                      <MenuItem value="Plastic">Plastic</MenuItem>
                      <MenuItem value="Paper">Paper</MenuItem>
                      <MenuItem value="Glass">Glass</MenuItem>
                      <MenuItem value="Metal">Metal</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Amount (kg)"
                    name="amount"
                    type="number"
                    value={newLog.amount}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Disposal Method"
                    name="disposal"
                    value={newLog.disposal}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Carbon Emissions (tCO2e)"
                    name="emissions"
                    type="number"
                    value={newLog.emissions}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                  <Button variant="contained" onClick={handleAddLog}>Add Log</Button>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>Upload from File</Typography>
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
                <Typography variant="h5" sx={{ mb: 2 }}>Manual Waste Logs</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Amount (kg)</TableCell>
                        <TableCell>Disposal Method</TableCell>
                        <TableCell>Carbon Emissions (tCO2e)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {logs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>{log.id}</TableCell>
                          <TableCell>{log.date}</TableCell>
                          <TableCell>{log.type}</TableCell>
                          <TableCell>{log.amount}</TableCell>
                          <TableCell>{log.disposal}</TableCell>
                          <TableCell>{log.emissions}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WasteLogUploadPage;
