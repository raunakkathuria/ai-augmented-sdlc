import { AppState, AppAction, ActionType } from '../types';

export const initialState: AppState = {
  transactions: [],
  budgets: [],
  categories: [],
  isLoading: false,
  error: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    // Transaction actions
    case ActionType.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case ActionType.UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction
        ),
      };

    case ActionType.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };

    // Budget actions
    case ActionType.ADD_BUDGET:
      return {
        ...state,
        budgets: [...state.budgets, action.payload],
      };

    case ActionType.UPDATE_BUDGET:
      return {
        ...state,
        budgets: state.budgets.map((budget) =>
          budget.id === action.payload.id ? action.payload : budget
        ),
      };

    case ActionType.DELETE_BUDGET:
      return {
        ...state,
        budgets: state.budgets.filter((budget) => budget.id !== action.payload),
      };

    // Category actions
    case ActionType.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    case ActionType.UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
      };

    case ActionType.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };

    // Data loading actions
    case ActionType.LOAD_DATA:
      return {
        ...state,
        transactions: action.payload.transactions,
        budgets: action.payload.budgets,
        categories: action.payload.categories,
        isLoading: false,
      };

    case ActionType.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default appReducer;
