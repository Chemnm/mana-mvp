import React, { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Typography, Tooltip, Divider } from '@mui/material';
import { Dashboard, Assessment, BarChart, Videocam, Business, Settings, Chat, ChevronRight, ChevronLeft } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import manaLogo from '../../assets/mana-logo.png';
import useAuthStore from '../../store/authStore';

const NewSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuthStore();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/manager' },
    { text: 'Reports', icon: <Assessment />, path: '/reports' },
    { text: 'Production Analysis', icon: <BarChart />, path: '/production-analysis' },
    { text: 'Control Room', icon: <Videocam />, path: '/control-room' },
    { text: 'Facilities', icon: <Business />, path: '/facilities' },
    { text: 'Navi', icon: <Chat />, path: '/chat' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <Box
      component="nav"
      sx={{
        width: isExpanded ? 280 : 80,
        flexShrink: 0,
        transition: 'width 0.3s',
        height: '100vh',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', height: 64 }}>
        <img src={manaLogo} alt="Mana Logo" style={{ width: 40, height: 40, marginRight: 10 }} />
        <Typography variant="h6" component="div" sx={{ opacity: isExpanded ? 1 : 0, transition: 'opacity 0.3s', whiteSpace: 'nowrap' }}>
          Mana
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1, py: 0 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <Tooltip title={isExpanded ? '' : item.text} placement="right" arrow>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: isExpanded ? 'initial' : 'center',
                  px: 2.5,
                  margin: '10px 15px',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: '#2a2a2a',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#007bff',
                    '&:hover': {
                      backgroundColor: '#0056b3',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isExpanded ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: isExpanded ? 1 : 0, transition: 'opacity 0.2s' }} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
       <Divider sx={{ borderColor: '#333' }} />
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{
              minHeight: 48,
              justifyContent: 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              {isExpanded ? <ChevronLeft /> : <ChevronRight />}
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      <Box>
        <Divider sx={{ borderColor: '#333' }} />
        <Box
          component={Link}
          to="/profile"
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
              backgroundColor: '#2a2a2a',
            },
            overflow: 'hidden',
          }}
        >
          <Avatar 
            sx={{ width: 40, height: 40, mr: isExpanded ? 2 : 'auto' }}
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
          <Box sx={{ opacity: isExpanded ? 1 : 0, transition: 'opacity 0.2s', whiteSpace: 'nowrap' }}>
            <Typography variant="body1">{user?.name || 'User'}</Typography>
            <Typography variant="body2" color="text.secondary">{user?.role}</Typography>
          </Box>
        </Box>
       
      </Box>
    </Box>
  );
};

export default NewSidebar;
