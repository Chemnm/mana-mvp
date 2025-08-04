// v1.2
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import OperatorDashboard from './pages/OperatorDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import ManagerLayout from './components/layout/ManagerLayout';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ChatPage from './pages/ChatPage';
import FacilityManagementPage from './pages/FacilityManagementPage';
import WasteLogUploadPage from './pages/WasteLogUploadPage';
import FacilityDetailsPage from './pages/FacilityDetailsPage';
import RetailDashboard from './pages/RetailDashboard';
import ReportsPage from './pages/ReportsPage';
import ProductionAnalysisPage from './pages/ProductionAnalysisPage';
import ControlRoomPage from './pages/ControlRoomPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/common/PrivateRoute';

function App() {
  return (
    <ThemeProvider>
      {(theme) => (
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/operator" element={<OperatorDashboard />} />
              <Route path="/manager" element={<ManagerLayout><ManagerDashboard /></ManagerLayout>} />
              <Route path="/reports" element={<ManagerLayout><ReportsPage /></ManagerLayout>} />
              <Route path="/production-analysis" element={<ManagerLayout><ProductionAnalysisPage /></ManagerLayout>} />
              <Route path="/control-room" element={<ManagerLayout><ControlRoomPage /></ManagerLayout>} />
              <Route path="/settings" element={<ManagerLayout><SettingsPage /></ManagerLayout>} />
              <Route path="/profile" element={<ManagerLayout><ProfilePage /></ManagerLayout>} />
              <Route path="/chat" element={<ManagerLayout><ChatPage /></ManagerLayout>} />
              <Route path="/executive" element={<ExecutiveDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/retail" element={<RetailDashboard />} />
              <Route path="/facilities" element={<ManagerLayout><FacilityManagementPage /></ManagerLayout>} />
              <Route path="/facility/:id" element={<ManagerLayout><FacilityDetailsPage /></ManagerLayout>} />
              <Route path="/upload-log" element={<WasteLogUploadPage />} />
            </Route>
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </MuiThemeProvider>
      )}
    </ThemeProvider>
  );
}

export default App;
