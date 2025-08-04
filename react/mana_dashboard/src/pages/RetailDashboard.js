import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import AppHeader from '../components/layout/AppHeader';
import RetailVideoPlayer from '../components/dashboard/RetailVideoPlayer';
import ProductSidebar from '../components/dashboard/ProductSidebar';
import ProductSummary from '../components/dashboard/ProductSummary';
import CustomerTrafficChart from '../components/dashboard/CustomerTrafficChart';
import Recommendations from '../components/dashboard/Recommendations';

const RetailDashboard = () => {
  const [productTimeline, setProductTimeline] = useState([]);
  const [productSummary, setProductSummary] = useState({});
  const [detectedProducts, setDetectedProducts] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetch('/product_timeline.json')
      .then((response) => response.json())
      .then((data) => setProductTimeline(data));
    fetch('/product_summary.json')
      .then((response) => response.json())
      .then((data) => setProductSummary(data));
  }, []);

  const handleTimeUpdate = (currentTime) => {
    const activeProducts = productTimeline.filter(
      (item) => currentTime >= item.timestamp
    );
    setDetectedProducts(activeProducts);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'background.default' }}>
      <AppHeader />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Retail Dashboard
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Live Feed" />
          <Tab label="Statistics & Recommendations" />
        </Tabs>
        {tabValue === 0 && (
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <RetailVideoPlayer onTimeUpdate={handleTimeUpdate} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <ProductSidebar detectedProducts={detectedProducts} />
              </Box>
            </Box>
          </Box>
        )}
        {tabValue === 1 && (
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <CustomerTrafficChart />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Recommendations />
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <ProductSummary summaryData={productSummary} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RetailDashboard;
