import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Receipt as ReceiptIcon,
  AccountBalance as AccountBalanceIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentPage }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigationItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, value: 'dashboard' },
    { text: 'Transactions', icon: <ReceiptIcon />, value: 'transactions' },
    { text: 'Budget', icon: <AccountBalanceIcon />, value: 'budget' },
    { text: 'Categories', icon: <CategoryIcon />, value: 'categories' }
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.value} disablePadding>
            <ListItemButton
              onClick={() => {
                onNavigate(item.value);
                setDrawerOpen(false);
              }}
              selected={currentPage === item.value}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {!isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Budget Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer for desktop */}
      {!isMobile && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerToggle}
        >
          {drawer}
        </Drawer>
      )}

      {/* Bottom navigation for mobile */}
      {isMobile && (
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100 }}
          elevation={3}
        >
          <BottomNavigation
            value={currentPage}
            onChange={(_, newValue) => {
              onNavigate(newValue);
            }}
            showLabels
          >
            {navigationItems.map((item) => (
              <BottomNavigationAction
                key={item.value}
                label={item.text}
                icon={item.icon}
                value={item.value}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </>
  );
};

export default Navigation;
