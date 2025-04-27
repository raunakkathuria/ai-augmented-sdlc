import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  LinearProgress,
  SelectChangeEvent,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import { Budget as BudgetType } from '../services/storageService';

const Budget: React.FC = () => {
  const { state, addBudget, updateBudget, deleteBudget } = useAppContext();
  const { budgets, categories, transactions } = state;

  // State for budget form
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBudget, setCurrentBudget] = useState<Partial<BudgetType>>({
    category: '',
    amount: 0,
    month: new Date().getMonth() + 1, // 1-12
    year: new Date().getFullYear(),
  });

  // Get current month and year
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const currentYear = new Date().getFullYear();

  // Filter budgets for current month and year
  const currentBudgets = budgets.filter(
    budget => budget.month === currentMonth && budget.year === currentYear
  );

  // Handle form open
  const handleOpen = (budget?: BudgetType) => {
    if (budget) {
      setCurrentBudget({ ...budget });
      setIsEditing(true);
    } else {
      setCurrentBudget({
        category: categories.length > 0 ? categories[0].id : '',
        amount: 0,
        month: currentMonth,
        year: currentYear,
      });
      setIsEditing(false);
    }
    setOpen(true);
  };

  // Handle form close
  const handleClose = () => {
    setOpen(false);
  };

  // Handle form submit
  const handleSubmit = () => {
    if (
      currentBudget.category &&
      currentBudget.amount !== undefined &&
      currentBudget.month &&
      currentBudget.year
    ) {
      if (isEditing && currentBudget.id) {
        updateBudget(currentBudget as BudgetType);
      } else {
        addBudget(currentBudget as Omit<BudgetType, 'id'>);
      }
      setOpen(false);
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentBudget(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setCurrentBudget(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle delete budget
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      deleteBudget(id);
    }
  };

  // Calculate spent amount for a budget
  const calculateSpent = (categoryId: string) => {
    return transactions
      .filter(
        t =>
          t.type === 'expense' &&
          t.category === categoryId &&
          new Date(t.date).getMonth() + 1 === currentMonth &&
          new Date(t.date).getFullYear() === currentYear
      )
      .reduce((sum, t) => sum + t.amount, 0);
  };

  // Get month name
  const getMonthName = (month: number) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[month - 1];
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h4" component="h1">
            Budget for {getMonthName(currentMonth)} {currentYear}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
          >
            Add Budget
          </Button>
        </Stack>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Budget Overview
          </Typography>

          {currentBudgets.length > 0 ? (
            currentBudgets.map(budget => {
              const spent = calculateSpent(budget.category);
              const percentSpent = (spent / budget.amount) * 100;
              const category = categories.find(c => c.id === budget.category);

              return (
                <Box key={budget.id} sx={{ mb: 3 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {category ? category.name : budget.category}
                    </Typography>
                    <Box>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpen(budget)}
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(budget.id)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      ${spent.toFixed(2)} of ${budget.amount.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={percentSpent > 100 ? 'error.main' : 'text.secondary'}
                    >
                      {percentSpent.toFixed(0)}%
                    </Typography>
                  </Stack>

                  <LinearProgress
                    variant="determinate"
                    value={Math.min(percentSpent, 100)}
                    color={percentSpent > 100 ? 'error' : 'primary'}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              );
            })
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              No budgets set for this month. Add some to track your spending!
            </Typography>
          )}
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Budget Tips
          </Typography>
          <Typography variant="body2" paragraph>
            • Set realistic budgets based on your income and essential expenses.
          </Typography>
          <Typography variant="body2" paragraph>
            • Prioritize needs over wants when allocating your budget.
          </Typography>
          <Typography variant="body2" paragraph>
            • Review your spending regularly to stay on track.
          </Typography>
          <Typography variant="body2" paragraph>
            • Adjust your budgets as needed based on your actual spending patterns.
          </Typography>
          <Typography variant="body2">
            • Consider using the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.
          </Typography>
        </Paper>
      </Box>

      {/* Budget Form Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Budget' : 'Add Budget'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={currentBudget.category || ''}
                label="Category"
                onChange={handleSelectChange}
              >
                {categories
                  .filter(cat => cat.type === 'expense')
                  .map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={currentBudget.amount || ''}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="month-label">Month</InputLabel>
              <Select
                labelId="month-label"
                id="month"
                name="month"
                value={currentBudget.month?.toString() || currentMonth.toString()}
                label="Month"
                onChange={handleSelectChange}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <MenuItem key={month} value={month}>
                    {getMonthName(month)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Year"
              name="year"
              type="number"
              value={currentBudget.year || currentYear}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Budget;
