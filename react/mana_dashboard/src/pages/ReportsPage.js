import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Tabs, Tab } from '@mui/material';
import TimeRangeSelector from '../components/dashboard/TimeRangeSelector';
import WasteTrendChart from '../components/dashboard/WasteTrendChart';
import TopLossReasons from '../components/dashboard/TopLossReasons';
import TopWastedFoods from '../components/dashboard/TopWastedFoods';
import OperatorEfficiencyChart from '../components/dashboard/OperatorEfficiencyChart';
import ComplianceLeaderboard from '../components/dashboard/ComplianceLeaderboard';
import WastedIngredientsBubbleChart from '../components/dashboard/WastedIngredientsBubbleChart';
import useAuthStore from '../store/authStore';
import { getTopWastedFoods, getTopLossReasons, getWasteTrend, getOperatorEfficiency, getComplianceData, getTopWastedIngredientsDetailed, getTopWastedIngredientsCo2 } from '../api/analyticsService';

const ReportsPage = () => {
  const [timeRange, setTimeRange] = useState(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
    return {
      from: startDate.toISOString().split('T')[0],
      to: endDate.toISOString().split('T')[0],
    };
  });
  const [wasteTrend, setWasteTrend] = useState([]);
  const [topLossReasons, setTopLossReasons] = useState([]);
  const [topWastedFoods, setTopWastedFoods] = useState([]);
  const [topWastedIngredientsDetailed, setTopWastedIngredientsDetailed] = useState([]);
  const [topWastedIngredientsCo2, setTopWastedIngredientsCo2] = useState([]);
  const [operatorEfficiency, setOperatorEfficiency] = useState([]);
  const [complianceData, setComplianceData] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const facilityId = user?.role === 'Admin' ? undefined : user?.facilityId;
    const fetchData = async () => {
      try {
        const [wasteTrendData, lossReasonsData, wastedFoodsData, operatorEfficiencyData, complianceData, topWastedIngredientsDetailedData, topWastedIngredientsCo2Data] = await Promise.all([
          getWasteTrend(facilityId, timeRange.from, timeRange.to),
          getTopLossReasons(facilityId, timeRange.from, timeRange.to),
          getTopWastedFoods(facilityId, timeRange.from, timeRange.to),
          getOperatorEfficiency(facilityId, timeRange.from, timeRange.to),
          getComplianceData(facilityId, timeRange.from, timeRange.to),
          getTopWastedIngredientsDetailed(facilityId, timeRange.from, timeRange.to),
          getTopWastedIngredientsCo2(facilityId, timeRange.from, timeRange.to),
        ]);
        setWasteTrend(wasteTrendData);
        setTopLossReasons(lossReasonsData);
        setTopWastedFoods(wastedFoodsData);
        setOperatorEfficiency(operatorEfficiencyData);
        setComplianceData(complianceData);
        setTopWastedIngredientsDetailed(topWastedIngredientsDetailedData);
        setTopWastedIngredientsCo2(topWastedIngredientsCo2Data);
      } catch (error) {
        console.error("Failed to fetch report data:", error);
      }
    };

    if (timeRange.from && timeRange.to) {
      fetchData();
    }
  }, [user, timeRange]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mt: 2 }}>
        <Tab label="Waste Trends" />
        <Tab label="Top Wasted Ingredients" />
        <Tab label="Top Loss Reasons" />
        <Tab label="Operator Efficiency" />
      </Tabs>
      {tabValue === 0 && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <WasteTrendChart data={wasteTrend} />
          </CardContent>
        </Card>
      )}
      {tabValue === 1 && (
        <Box sx={{ mt: 2 }}>
          <Card>
            <CardContent>
              <TopWastedFoods data={topWastedIngredientsDetailed} />
            </CardContent>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <WastedIngredientsBubbleChart data={topWastedIngredientsCo2} />
            </CardContent>
          </Card>
        </Box>
      )}
      {tabValue === 2 && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <TopLossReasons data={topLossReasons} />
          </CardContent>
        </Card>
      )}
      {tabValue === 3 && (
        <Box sx={{ mt: 2 }}>
          <Card>
            <CardContent>
              <OperatorEfficiencyChart data={operatorEfficiency} />
            </CardContent>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <ComplianceLeaderboard data={complianceData} />
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default ReportsPage;
