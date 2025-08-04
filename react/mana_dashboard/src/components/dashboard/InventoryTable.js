import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { inventoryData } from '../../data/retailData';

const getExpirationColor = (dateString) => {
  if (!dateString) return 'inherit';
  const expirationDate = new Date(dateString);
  const today = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(today.getDate() + 7);

  if (expirationDate < today) {
    return 'red';
  }
  if (expirationDate < sevenDaysFromNow) {
    return 'orange';
  }
  return 'inherit';
};

const InventoryTable = ({ highlightedItem }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="inventory table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Stock Count</TableCell>
            <TableCell align="right">Expiration Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventoryData.map((item) => (
            <TableRow
              key={item.className}
              sx={{
                backgroundColor:
                  highlightedItem === item.className ? 'action.hover' : 'inherit',
              }}
            >
              <TableCell component="th" scope="row">
                {item.displayName}
              </TableCell>
              <TableCell align="right">{item.count}</TableCell>
              <TableCell
                align="right"
                sx={{ color: getExpirationColor(item.expirationDate) }}
              >
                {item.expirationDate || 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
