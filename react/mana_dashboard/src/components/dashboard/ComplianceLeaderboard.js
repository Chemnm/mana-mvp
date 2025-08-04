import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const ComplianceLeaderboard = ({ data }) => {
  // Aggregate compliance data
  const aggregatedData = data.reduce((acc, curr) => {
    const existing = acc.find(item => item.operatorId === curr.operatorId);
    if (existing) {
      existing.totalScore += curr.score;
      existing.count += 1;
    } else {
      acc.push({
        operatorId: curr.operatorId,
        name: curr.operatorId.name,
        totalScore: curr.score,
        count: 1,
      });
    }
    return acc;
  }, []);

  const leaderboardData = aggregatedData.map(item => ({
    ...item,
    averageScore: item.totalScore / item.count,
  })).sort((a, b) => b.averageScore - a.averageScore);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Compliance Leaderboard
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Operator</TableCell>
                <TableCell>Compliance Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.map((row, index) => (
                <TableRow key={`${row.operatorId}-${index}`}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.averageScore.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ComplianceLeaderboard;
