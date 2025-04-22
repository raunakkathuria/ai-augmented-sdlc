import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AppProvider } from './context/AppContext';
import theme from './utils/theme';
import Navigation from './components/common/Navigation';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Categories from './pages/Categories';
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Render the current page based on navigation state
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'budget':
        return <Budget />;
      case 'categories':
        return <Categories />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <div className="app">
          <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
          <main className="content">
            {renderPage()}
          </main>
        </div>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
