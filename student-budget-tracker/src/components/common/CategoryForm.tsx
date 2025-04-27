import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import { Category } from '../../services/storageService';

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
  category?: Category;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ open, onClose, category }) => {
  const { addCategory, updateCategory } = useAppContext();
  const isEditing = Boolean(category);

  const [formData, setFormData] = useState<Partial<Category>>(
    category || {
      name: '',
      type: 'expense',
      color: '#60B5FF',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.type && formData.color) {
      if (isEditing && category) {
        updateCategory({ ...category, ...formData });
      } else {
        addCategory(formData as Omit<Category, 'id'>);
      }
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? 'Edit Category' : 'Add Category'}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={formData.type || 'expense'}
              label="Type"
              onChange={handleSelectChange}
            >
              <MenuItem value="expense">Expense</MenuItem>
              <MenuItem value="income">Income</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Color"
            name="color"
            type="color"
            value={formData.color || '#60B5FF'}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;
