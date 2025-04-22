import React from 'react';
import { Box, Typography, Paper, Container, Stack } from '@mui/material';
import { useAppContext } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const { state } = useAppContext();
  const { transactions, budgets } = state;

  // Calculate total income, expenses, and balance
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Get recent transactions (last 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>

        {/* Monthly Summary */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
          <Box sx={{ width: { xs: '100%', sm: '33.33%' } }}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'success.light',
                color: 'success.contrastText',
              }}
            >
              <Typography variant="h6">Income</Typography>
              <Typography variant="h4">${totalIncome.toFixed(2)}</Typography>
            </Paper>
          </Box>
          <Box sx={{ width: { xs: '100%', sm: '33.33%' } }}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'error.light',
                color: 'error.contrastText',
              }}
            >
              <Typography variant="h6">Expenses</Typography>
              <Typography variant="h4">${totalExpenses.toFixed(2)}</Typography>
            </Paper>
          </Box>
          <Box sx={{ width: { xs: '100%', sm: '33.33%' } }}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: balance >= 0 ? 'primary.light' : 'warning.light',
                color: balance >= 0 ? 'primary.contrastText' : 'warning.contrastText',
              }}
            >
              <Typography variant="h6">Balance</Typography>
              <Typography variant="h4">${balance.toFixed(2)}</Typography>
            </Paper>
          </Box>
        </Stack>

        {/* Recent Transactions */}
        <Typography variant="h5" component="h2" gutterBottom>
          Recent Transactions
        </Typography>
        <Paper sx={{ p: 2, mb: 4 }}>
          {recentTransactions.length > 0 ? (
            recentTransactions.map(transaction => (
              <Box
                key={transaction.id}
                sx={{
                  p: 2,
                  mb: 1,
                  borderLeft: 6,
                  borderColor: transaction.type === 'income' ? 'success.main' : 'error.main',
                  '&:last-child': { mb: 0 },
                }}
              >
                <Stack direction="row" alignItems="center">
                  <Box sx={{ width: '50%' }}>
                    <Typography variant="body1">
                      {state.categories.find(cat => cat.id === transaction.category)?.name || transaction.category}
                    </Typography>
                    {transaction.notes && (
                      <Typography variant="body2" color="text.secondary">
                        {transaction.notes}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ width: '25%' }}>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(transaction.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '25%' }}>
                    <Typography
                      variant="body1"
                      align="right"
                      color={transaction.type === 'income' ? 'success.main' : 'error.main'}
                      fontWeight="bold"
                    >
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))
          ) : (
            <Typography variant="body1" sx={{ p: 2 }}>
              No transactions yet. Add some to see them here!
            </Typography>
          )}
        </Paper>

        {/* Budget Overview */}
        <Typography variant="h5" component="h2" gutterBottom>
          Budget Overview
        </Typography>
        <Paper sx={{ p: 2 }}>
          {budgets.length > 0 ? (
            budgets.map(budget => {
              // Calculate spent amount for this budget category
              const spent = transactions
                .filter(t => t.type === 'expense' && t.category === budget.category)
                .reduce((sum, t) => sum + t.amount, 0);

              // Calculate percentage spent
              const percentSpent = (spent / budget.amount) * 100;

              return (
                <Box key={budget.id} sx={{ mb: 2, '&:last-child': { mb: 0 } }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ width: '50%' }}>
                      <Typography variant="body1">
                      {state.categories.find(cat => cat.id === budget.category)?.name || budget.category}
                    </Typography>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                      <Typography variant="body2" align="right">
                        ${spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                      </Typography>
                    </Box>
                  </Stack>
                  <Box
                    sx={{
                      mt: 1,
                      height: 10,
                      borderRadius: 5,
                      bgcolor: 'grey.300',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${Math.min(percentSpent, 100)}%`,
                        bgcolor: percentSpent > 100 ? 'error.main' : 'primary.main',
                      }}
                    />
                  </Box>
                </Box>
              );
            })
          ) : (
            <Typography variant="body1" sx={{ p: 2 }}>
              No budgets set yet. Add some to track your spending!
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
