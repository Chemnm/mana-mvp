import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import logo from '../../assets/mana-logo.png';
import ThemeSwitcher from '../common/ThemeSwitcher';
import { ThemeContext } from '../../context/ThemeContext';

const AppHeader = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const { mode } = useContext(ThemeContext);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.background.paper }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src={logo} alt="MANA Logo" style={{ height: '40px', marginRight: '16px' }} />
          <Typography variant="h6" component="div" sx={{ color: theme.palette.text.primary }}>
            MANA Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
            {user.name}
          </Typography>
          <ThemeSwitcher />
          <Button
            variant="outlined"
            size="small"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderColor: mode === 'light' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)',
              color: theme.palette.text.primary,
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
