import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import EventLogTable from '../components/dashboard/EventLogTable';
import StatCard from '../components/common/StatCard';
import useAuthStore from '../store/authStore';
import { getStats } from '../api/analyticsService';

const ManagerDashboard = () => {
  const [stats, setStats] = useState({ totalWaste: 0, wasteEvents: 0, complianceRate: 0 });
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const facilityId = user?.role === 'Admin' ? undefined : user?.facilityId;

    const fetchData = async () => {
      try {
        const statsData = await getStats(facilityId);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Stat Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Waste Cost" value={`$${stats.totalWaste?.toFixed(2)}`} trend="up" percentage="12%" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Waste Events" value={stats.wasteEvents} trend="down" percentage="8%" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Compliance Rate" value={`${stats.complianceRate}%`} trend="up" percentage="2%" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Lines" value="4/5" trend="neutral" percentage="0%" />
        </Grid>

        {/* Event Log */}
        <Grid item xs={12}>
          <EventLogTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManagerDashboard;
