import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#34D399',
          },
          background: {
            default: '#ffffff',
            paper: '#f0f0f0',
          },
          text: {
            primary: '#0a0a0a',
            secondary: '#5f6368',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#34D399',
          },
          background: {
            default: '#121212',
            paper: '#1E1E1E',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
          },
        }),
    success: {
      main: '#28a745',
    },
    error: {
      main: '#dc3545',
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

export default getTheme;
