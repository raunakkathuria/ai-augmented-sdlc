import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#60B5FF',
      light: '#AFDDFF',
      dark: '#4A91CC',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF9149',
      light: '#FFECDB',
      dark: '#CC7439',
      contrastText: '#ffffff',
    },
    error: {
      main: '#F16767',
      light: '#F48E8E',
      dark: '#C15252',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FF9149',
      light: '#FFB07C',
      dark: '#CC7439',
      contrastText: '#ffffff',
    },
    info: {
      main: '#60B5FF',
      light: '#AFDDFF',
      dark: '#4A91CC',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#ffffff',
    },
    background: {
      default: '#FFECDB',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 16,
        },
      },
    },
  },
});

export default theme;
