import { Transaction, Budget, Category } from '../services/storageService';

// App State
export interface AppState {
  transactions: Transaction[];
  budgets: Budget[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

// Action Types
export enum ActionType {
  // Transaction actions
  ADD_TRANSACTION = 'ADD_TRANSACTION',
  UPDATE_TRANSACTION = 'UPDATE_TRANSACTION',
  DELETE_TRANSACTION = 'DELETE_TRANSACTION',

  // Budget actions
  ADD_BUDGET = 'ADD_BUDGET',
  UPDATE_BUDGET = 'UPDATE_BUDGET',
  DELETE_BUDGET = 'DELETE_BUDGET',

  // Category actions
  ADD_CATEGORY = 'ADD_CATEGORY',
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
  DELETE_CATEGORY = 'DELETE_CATEGORY',

  // Data loading actions
  LOAD_DATA = 'LOAD_DATA',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
}

// Action Interfaces
export interface AddTransactionAction {
  type: ActionType.ADD_TRANSACTION;
  payload: Transaction;
}

export interface UpdateTransactionAction {
  type: ActionType.UPDATE_TRANSACTION;
  payload: Transaction;
}

export interface DeleteTransactionAction {
  type: ActionType.DELETE_TRANSACTION;
  payload: string; // Transaction ID
}

export interface AddBudgetAction {
  type: ActionType.ADD_BUDGET;
  payload: Budget;
}

export interface UpdateBudgetAction {
  type: ActionType.UPDATE_BUDGET;
  payload: Budget;
}

export interface DeleteBudgetAction {
  type: ActionType.DELETE_BUDGET;
  payload: string; // Budget ID
}

export interface AddCategoryAction {
  type: ActionType.ADD_CATEGORY;
  payload: Category;
}

export interface UpdateCategoryAction {
  type: ActionType.UPDATE_CATEGORY;
  payload: Category;
}

export interface DeleteCategoryAction {
  type: ActionType.DELETE_CATEGORY;
  payload: string; // Category ID
}

export interface LoadDataAction {
  type: ActionType.LOAD_DATA;
  payload: {
    transactions: Transaction[];
    budgets: Budget[];
    categories: Category[];
  };
}

export interface SetLoadingAction {
  type: ActionType.SET_LOADING;
  payload: boolean;
}

export interface SetErrorAction {
  type: ActionType.SET_ERROR;
  payload: string | null;
}

// Union type for all actions
export type AppAction =
  | AddTransactionAction
  | UpdateTransactionAction
  | DeleteTransactionAction
  | AddBudgetAction
  | UpdateBudgetAction
  | DeleteBudgetAction
  | AddCategoryAction
  | UpdateCategoryAction
  | DeleteCategoryAction
  | LoadDataAction
  | SetLoadingAction
  | SetErrorAction;
