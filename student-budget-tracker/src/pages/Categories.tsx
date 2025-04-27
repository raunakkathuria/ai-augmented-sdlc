import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import CategoryForm from '../components/common/CategoryForm';
import { Category } from '../services/storageService';

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
      id={`category-tabpanel-${index}`}
      aria-labelledby={`category-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Categories: React.FC = () => {
  const { state, deleteCategory } = useAppContext();
  const { categories } = state;

  // State for category form
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | undefined>(undefined);

  // State for filtering
  const [tabValue, setTabValue] = useState(0);

  // Get unique categories by name and type
  const uniqueCategories = Array.from(
    new Map(
      categories.map(category => [`${category.name}-${category.type}`, category])
    ).values()
  );

  // Filter categories based on tab value
  const expenseCategories = uniqueCategories.filter(category => category.type === 'expense');
  const incomeCategories = uniqueCategories.filter(category => category.type === 'income');

  // Handle form open
  const handleOpen = (category?: Category) => {
    setCurrentCategory(category);
    setOpen(true);
  };

  // Handle form close
  const handleClose = () => {
    setOpen(false);
    setCurrentCategory(undefined);
  };

  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle delete category
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h4" component="h1">
            Categories
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
          >
            Add Category
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
            <Tab label="Expense Categories" />
            <Tab label="Income Categories" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            {renderCategoryList(expenseCategories)}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {renderCategoryList(incomeCategories)}
          </TabPanel>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Category Tips
          </Typography>
          <Typography variant="body2" paragraph>
            • Create specific categories for major expenses (Rent, Groceries, Utilities)
          </Typography>
          <Typography variant="body2" paragraph>
            • Use consistent categories to better track your spending patterns
          </Typography>
          <Typography variant="body2" paragraph>
            • Consider using color coding to easily identify different types of expenses
          </Typography>
          <Typography variant="body2">
            • Regularly review your categories and adjust as your spending habits change
          </Typography>
        </Paper>
      </Box>

      {/* Category Form Dialog */}
      <CategoryForm open={open} onClose={handleClose} category={currentCategory} />
    </Container>
  );

  // Helper function to render category list
  function renderCategoryList(categories: Category[]) {
    return categories.length > 0 ? (
      <List>
        {categories.map((category, index) => (
          <React.Fragment key={category.id}>
            <ListItem
              secondaryAction={
                <Box>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleOpen(category)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(category.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  bgcolor: category.color,
                  mr: 2,
                }}
              />
              <ListItemText primary={category.name} />
            </ListItem>
            {index < categories.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    ) : (
      <Typography variant="body1" sx={{ p: 2 }}>
        No categories found. Add some to organize your transactions!
      </Typography>
    );
  }
};

export default Categories;
