import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const ProductSummary = ({ summaryData }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="product summary table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">First Seen</TableCell>
            <TableCell align="right">Total Detections</TableCell>
            <TableCell align="right">Avg. Confidence</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(summaryData).map(([productName, data]) => (
            <TableRow key={productName}>
              <TableCell component="th" scope="row">
                {productName.replace(/_/g, ' ')}
              </TableCell>
              <TableCell align="right">{data.first_seen_formatted}</TableCell>
              <TableCell align="right">{data.total_detections}</TableCell>
              <TableCell align="right">{(data.confidence_avg * 100).toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductSummary;
