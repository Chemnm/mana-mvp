import React, { useState } from 'react';
import { Box, Grid, Button, Typography, Card, CardContent } from '@mui/material';
import AppHeader from '../components/layout/AppHeader';
import LiveFeed from '../components/dashboard/LiveFeed';
import RealTimeAlerts from '../components/dashboard/RealTimeAlerts';

const videoScenarios = [

  {
    id: 'no-gloves',
    label: 'No Gloves Violation',
    video: 'https://public-waste-demos.s3.il-central-1.amazonaws.com/no-gloves.mp4',
    alert: {
      message: 'CRITICAL: Worker without gloves detected - Contamination risk! Immediate action required.',
      severity: 'error',
      timestamp: new Date().toLocaleTimeString(),
      location: 'Production Line 2'
    }
  },
  {
    id: 'flour-waste',
    label: 'Excessive Flour Pour',
    video: 'https://public-waste-demos.s3.il-central-1.amazonaws.com/pouring-flower.mp4',
    alert: {
      message: 'WARNING: Excessive flour detected - 40% above recipe spec. Batch may be compromised.',
      severity: 'warning',
      timestamp: new Date().toLocaleTimeString(),
      location: 'Mixing Station A'
    }
  },
  {
    id: 'machine-jam',
    label: 'Machine Jam',
    video: 'https://public-waste-demos.s3.il-central-1.amazonaws.com/machine-jammed.mp4',
    alert: {
      message: 'ALERT: Conveyor belt jammed - Product backup detected. Production halted.',
      severity: 'error',
      timestamp: new Date().toLocaleTimeString(),
      location: 'Packaging Line 1'
    }
  }
];

const OperatorDashboard = () => {
  const [currentScenario, setCurrentScenario] = useState(videoScenarios[0]);
  const [alerts, setAlerts] = useState(videoScenarios[0].alert ? [videoScenarios[0].alert] : []);

  const handleScenarioChange = (scenario) => {
    setCurrentScenario(scenario);
    if (scenario.alert) {
      setAlerts([scenario.alert]); // Show only the current alert
    } else {
      setAlerts([]); // Clear alerts if no alert for this scenario
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'background.default' }}>
      <AppHeader />
      
      <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Control Panel */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Simulation Controls
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {videoScenarios.map((scenario) => (
                <Button
                  key={scenario.id}
                  variant={currentScenario.id === scenario.id ? 'contained' : 'outlined'}
                  color={scenario.alert?.severity === 'error' ? 'error' : scenario.alert ? 'warning' : 'primary'}
                  onClick={() => handleScenarioChange(scenario)}
                >
                  {scenario.label}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Grid container spacing={3} sx={{ flex: 1 }}>
          {/* Live Feed - Large */}
          <Grid item xs={12} md={8}>
            <Box sx={{ 
              height: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: 'background.default',
              borderRadius: 2
            }}>
              <Box sx={{ width: '250px' }}>
                <LiveFeed
                  videoSource={currentScenario.video}
                  alertMessage={currentScenario.alert?.message}
                  alertSeverity={currentScenario.alert?.severity}
                />
              </Box>
            </Box>
          </Grid>

          {/* Right Panel */}
          <Grid item xs={12} md={4}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Real-time Alerts */}
              <Box sx={{ flex: 1 }}>
                <RealTimeAlerts alerts={alerts} />
              </Box>

              {/* AI Recommendations */}
              <Card sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    AI Recommendations
                  </Typography>
                  {currentScenario.alert ? (
                    <Box>
                      <Typography variant="body2" paragraph>
                        Based on the current situation:
                      </Typography>
                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                        {currentScenario.id === 'no-gloves' && (
                          <>
                            <li><Typography variant="body2">Stop the production line immediately</Typography></li>
                            <li><Typography variant="body2">Notify floor supervisor</Typography></li>
                            <li><Typography variant="body2">Dispose of potentially contaminated products</Typography></li>
                            <li><Typography variant="body2">Ensure worker puts on proper PPE</Typography></li>
                          </>
                        )}
                        {currentScenario.id === 'flour-waste' && (
                          <>
                            <li><Typography variant="body2">Adjust flour dispenser settings</Typography></li>
                            <li><Typography variant="body2">Check batch weight against recipe</Typography></li>
                            <li><Typography variant="body2">Consider batch adjustment or disposal</Typography></li>
                            <li><Typography variant="body2">Retrain operator on proper portioning</Typography></li>
                          </>
                        )}
                        {currentScenario.id === 'machine-jam' && (
                          <>
                            <li><Typography variant="body2">Emergency stop activated</Typography></li>
                            <li><Typography variant="body2">Clear jam following safety protocol</Typography></li>
                            <li><Typography variant="body2">Inspect products for damage</Typography></li>
                            <li><Typography variant="body2">Schedule preventive maintenance</Typography></li>
                          </>
                        )}
                      </ul>
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      All systems operating normally. Continue monitoring for any anomalies.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OperatorDashboard;
