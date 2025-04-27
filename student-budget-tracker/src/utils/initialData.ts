import { Category } from '../services/storageService';

/**
 * Default expense categories for the application
 */
export const defaultExpenseCategories: Omit<Category, 'id'>[] = [
  {
    name: 'Housing',
    type: 'expense',
    color: '#FF5722', // Deep Orange
  },
  {
    name: 'Food',
    type: 'expense',
    color: '#4CAF50', // Green
  },
  {
    name: 'Transportation',
    type: 'expense',
    color: '#2196F3', // Blue
  },
  {
    name: 'Utilities',
    type: 'expense',
    color: '#9C27B0', // Purple
  },
  {
    name: 'Entertainment',
    type: 'expense',
    color: '#FFC107', // Amber
  },
  {
    name: 'Education',
    type: 'expense',
    color: '#3F51B5', // Indigo
  },
  {
    name: 'Shopping',
    type: 'expense',
    color: '#E91E63', // Pink
  },
  {
    name: 'Health',
    type: 'expense',
    color: '#00BCD4', // Cyan
  },
];

/**
 * Default income categories for the application
 */
export const defaultIncomeCategories: Omit<Category, 'id'>[] = [
  {
    name: 'Salary',
    type: 'income',
    color: '#4CAF50', // Green
  },
  {
    name: 'Allowance',
    type: 'income',
    color: '#2196F3', // Blue
  },
  {
    name: 'Scholarship',
    type: 'income',
    color: '#9C27B0', // Purple
  },
  {
    name: 'Gifts',
    type: 'income',
    color: '#FFC107', // Amber
  },
  {
    name: 'Part-time Job',
    type: 'income',
    color: '#3F51B5', // Indigo
  },
];

/**
 * Initialize the database with default categories if none exist
 */
export const initializeDefaultData = async (
  getCategories: () => Promise<Category[]>,
  saveCategory: (category: Omit<Category, 'id'>) => Promise<string | void>
): Promise<void> => {
  try {
    // Check if categories already exist
    const existingCategories = await getCategories();

    if (existingCategories.length === 0) {
      // Add default expense categories
      for (const category of defaultExpenseCategories) {
        await saveCategory(category);
      }

      // Add default income categories
      for (const category of defaultIncomeCategories) {
        await saveCategory(category);
      }

      console.log('Default categories initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing default categories:', error);
  }
};
