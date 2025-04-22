import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import appReducer, { initialState } from './appReducer';
import { AppState, AppAction, ActionType } from '../types';
import storageService, { Transaction, Budget, Category } from '../services/storageService';

// Create the context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Action creators
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addBudget: (budget: Omit<Budget, 'id'>) => Promise<void>;
  updateBudget: (budget: Budget) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  loadData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load initial data and initialize default categories if needed
  useEffect(() => {
    const initializeApp = async () => {
      await loadData();

      try {
        // Check if categories already exist
        const existingCategories = await storageService.getCategories();

        // If very few categories exist, add default categories
        if (existingCategories.length < 3) {
          const { defaultExpenseCategories, defaultIncomeCategories } = await import('../utils/initialData');

          // Create a map of existing category names to avoid duplicates
          const existingCategoryNames = new Set(existingCategories.map(cat => cat.name));

          // Add default expense categories (avoiding duplicates)
          for (const category of defaultExpenseCategories) {
            if (!existingCategoryNames.has(category.name)) {
              await addCategory(category);
              existingCategoryNames.add(category.name);
            }
          }

          // Add default income categories (avoiding duplicates)
          for (const category of defaultIncomeCategories) {
            if (!existingCategoryNames.has(category.name)) {
              await addCategory(category);
              existingCategoryNames.add(category.name);
            }
          }

          console.log('Default categories initialized successfully');

          // Reload data to update the state with the new categories
          await loadData();
        }
      } catch (error) {
        console.error('Error initializing default categories:', error);
      }
    };

    initializeApp();
  }, []);

  // Action creators
  const addTransaction = async (transactionData: Omit<Transaction, 'id'>) => {
    try {
      dispatch({ type: ActionType.SET_LOADING, payload: true });

      const transaction: Transaction = {
        ...transactionData,
        id: uuidv4(),
      };

      await storageService.saveTransaction(transaction);
      dispatch({ type: ActionType.ADD_TRANSACTION, payload: transaction });
    } catch (error) {
      dispatch({
        type: ActionType.SET_ERROR,
        payload: error instanceof Error ? error.message : 'Failed to add transaction'
      });
    }
  };

  const updateTransaction = async (transaction: Transaction) => {
    try {
      dispatch({ type: ActionType.SET_LOADING, payload: true });
      await storageService.saveTransaction(transaction);
      dispatch({ type: ActionType.UPDATE_TRANSACTION, payload: transaction });
    } catch (error) {
      dispatch({
        type: ActionType.SET_ERROR,
        payload: error instanceof Error ? error.message : 'Failed to update transaction'
      });
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      dispatch({ type: ActionType.SET_LOADING, payload: true });
      await storageService.deleteTransaction(id);
      dispatch({ type: ActionType.DELETE_TRANSACTION, payload: id });
    } catch (error) {
      dispatch({
        type: ActionType.SET_ERROR,
        payload: error instanceof Error ? error.message : 'Failed to delete transaction'
      });
    }
  };

  const addBudget = async (budgetData: Omit<Budget, 'id'>) => {
    try {
      dispatch({ type: ActionType.SET_LOADING, payload: true });

      const budget: Budget = {
        ...budgetData,
        id: uuidv4(),
      };

      await storageService.saveBudget(budget);
      dispatch({ type: ActionType.ADD_BUDGET, payload: budget });
    } catch (error) {
      dispatch({
        type: ActionType.SET_ERROR,
        payload: error instanceof Error ? error.message : 'Failed to add budget'
      });
    }
  };

  const updateBudget = async (budget: Budget) => {
    try {
      dispatch({ type: ActionType.SET_LOADING, payload: true });
      await storageService.saveBudget(budget);
      dispatch({ type: ActionType.UPDATE_BUDGET, payload: budget });
    } catch (error) {
      dispatch({
        type: ActionType.SET_ERROR,
        payload: error instanceof Error ? error.message : 'Failed to update budget'
      });
    }
  };

  const deleteBudget = async (id: string) => {
    try {
      dispatch({ type: ActionType.SET_LOADING, payload: true });
      await storageService.deleteBudget(id);
      dispatch({ type: ActionType.DELETE_BUDGET, payload: id });
    } catch (error) {
      dispatch({
        type: ActionType.SET_ERROR,
        payload: error instanceof Error ? error.message : 'Failed to delete budget'
      });
    }
  };

  const addCategory = async (categoryData: Omit<Category, 'id'>) => {
    try {
      dispatch({ type: ActionType.SET_LOADING, payload: true });

      const category: Category = {
        ...categoryData,
        id: uuidv4(),
      };

      await storageService.saveCategory(category);
      dispatch({ type: ActionType.ADD_CATEGORY, payload: category });
    } catch (error) {
      dispatch({
        type: ActionType.SET_ERROR,
        payload: error instanceof Error ? error.message : 'Failed to add category'
      });
    }
  };

  const updateCategory = async (category: Category) => {
    try {
      dispatch({ type: ActionType.SET_LOADING, payload: true });
      await storageService.saveCategory(category);
      dispatch({ type: ActionType.UPDATE_CATEGORY, payload: category });
    } catch (error) {
      dispatch({
        type: ActionType.SET_ERROR,
        payload: error instanceof Error ? error.message : 'Failed to update category'
      });
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      dispatch({ type: ActionType.SET_LOADING, payload: true });
      await storageService.deleteCategory(id);
      dispatch({ type: ActionType.DELETE_CATEGORY, payload: id });
    } catch (error) {
      dispatch({
        type: ActionType.SET_ERROR,
        payload: error instanceof Error ? error.message : 'Failed to delete category'
      });
    }
  };

  const loadData = async () => {
    try {
      dispatch({ type: ActionType.SET_LOADING, payload: true });

      const [transactions, budgets, categories] = await Promise.all([
        storageService.getTransactions(),
        storageService.getBudgets(),
        storageService.getCategories(),
      ]);

      dispatch({
        type: ActionType.LOAD_DATA,
        payload: { transactions, budgets, categories },
      });
    } catch (error) {
      dispatch({
        type: ActionType.SET_ERROR,
        payload: error instanceof Error ? error.message : 'Failed to load data'
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addBudget,
        updateBudget,
        deleteBudget,
        addCategory,
        updateCategory,
        deleteCategory,
        loadData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
