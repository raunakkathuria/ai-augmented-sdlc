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
  Tabs,
  Tab,
  SelectChangeEvent,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import { Transaction } from '../services/storageService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`transaction-tabpanel-${index}`}
      aria-labelledby={`transaction-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Transactions: React.FC = () => {
  const { state, addTransaction, updateTransaction, deleteTransaction } = useAppContext();
  const { transactions, categories } = state;

  // State for transaction form
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Partial<Transaction>>({
    type: 'expense',
    amount: 0,
    category: '',
    date: new Date(),
    notes: '',
  });

  // State for filtering
  const [tabValue, setTabValue] = useState(0);

  // Filter transactions based on tab value
  const filteredTransactions = transactions.filter(transaction => {
    if (tabValue === 0) return true; // All
    if (tabValue === 1) return transaction.type === 'expense'; // Expenses
    if (tabValue === 2) return transaction.type === 'income'; // Income
    return true;
  });

  // Sort transactions by date (newest first)
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Handle form open
  const handleOpen = (transaction?: Transaction) => {
    if (transaction) {
      setCurrentTransaction({ ...transaction });
      setIsEditing(true);
    } else {
      setCurrentTransaction({
        type: 'expense',
        amount: 0,
        category: categories.length > 0 ? categories[0].id : '',
        date: new Date(),
        notes: '',
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
      currentTransaction.type &&
      currentTransaction.amount !== undefined &&
      currentTransaction.category &&
      currentTransaction.date
    ) {
      if (isEditing && currentTransaction.id) {
        updateTransaction(currentTransaction as Transaction);
      } else {
        addTransaction(currentTransaction as Omit<Transaction, 'id'>);
      }
      setOpen(false);
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentTransaction(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setCurrentTransaction(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTransaction(prev => ({
      ...prev,
      date: new Date(e.target.value),
    }));
  };

  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle delete transaction
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h4" component="h1">
            Transactions
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
          >
            Add Transaction
          </Button>
        </Stack>

        <Paper sx={{ width: '100%', mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="All" />
            <Tab label="Expenses" />
            <Tab label="Income" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            {renderTransactionList(sortedTransactions)}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {renderTransactionList(sortedTransactions)}
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            {renderTransactionList(sortedTransactions)}
          </TabPanel>
        </Paper>
      </Box>

      {/* Transaction Form Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                name="type"
                value={currentTransaction.type || 'expense'}
                label="Type"
                onChange={handleSelectChange}
              >
                <MenuItem value="expense">Expense</MenuItem>
                <MenuItem value="income">Income</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={currentTransaction.amount || ''}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={currentTransaction.category || ''}
                label="Category"
                onChange={handleSelectChange}
              >
                {categories
                  .filter(cat => cat.type === currentTransaction.type)
                  .map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={
                currentTransaction.date
                  ? new Date(currentTransaction.date).toISOString().split('T')[0]
                  : ''
              }
              onChange={handleDateChange}
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              label="Notes"
              name="notes"
              multiline
              rows={3}
              value={currentTransaction.notes || ''}
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

  // Helper function to render transaction list
  function renderTransactionList(transactions: Transaction[]) {
    return transactions.length > 0 ? (
      transactions.map(transaction => (
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
            <Box sx={{ width: '40%' }}>
              <Typography variant="body1">
                {categories.find(c => c.id === transaction.category)?.name || transaction.category}
              </Typography>
              {transaction.notes && (
                <Typography variant="body2" color="text.secondary">
                  {transaction.notes}
                </Typography>
              )}
            </Box>
            <Box sx={{ width: '30%' }}>
              <Typography variant="body2" color="text.secondary">
                {new Date(transaction.date).toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={{ width: '20%' }}>
              <Typography
                variant="body1"
                align="right"
                color={transaction.type === 'income' ? 'success.main' : 'error.main'}
                fontWeight="bold"
              >
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ width: '10%', display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                size="small"
                color="primary"
                onClick={() => handleOpen(transaction)}
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDelete(transaction.id)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      ))
    ) : (
      <Typography variant="body1" sx={{ p: 2 }}>
        No transactions found. Add some to see them here!
      </Typography>
    );
  }
};

export default Transactions;
