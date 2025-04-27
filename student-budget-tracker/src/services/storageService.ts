import { openDB, DBSchema, IDBPDatabase } from 'idb';

// Define the database schema
interface BudgetTrackerDB extends DBSchema {
  transactions: {
    key: string;
    value: Transaction;
    indexes: { 'by-date': Date };
  };
  budgets: {
    key: string;
    value: Budget;
    indexes: { 'by-month-year': [number, number] };
  };
  categories: {
    key: string;
    value: Category;
    indexes: { 'by-type': 'expense' | 'income' };
  };
}

// Define the data models
export interface Transaction {
  id: string;
  amount: number;
  type: 'expense' | 'income';
  category: string;
  date: Date;
  notes?: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  month: number;
  year: number;
}

export interface Category {
  id: string;
  name: string;
  type: 'expense' | 'income';
  color: string;
}

// Database name and version
const DB_NAME = 'student-budget-tracker';
const DB_VERSION = 1;

// StorageService class
class StorageService {
  private db: Promise<IDBPDatabase<BudgetTrackerDB>>;

  constructor() {
    this.db = this.initDatabase();
  }

  // Initialize the database
  private async initDatabase(): Promise<IDBPDatabase<BudgetTrackerDB>> {
    return openDB<BudgetTrackerDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Create transactions store
        if (!db.objectStoreNames.contains('transactions')) {
          const transactionsStore = db.createObjectStore('transactions', { keyPath: 'id' });
          transactionsStore.createIndex('by-date', 'date');
        }

        // Create budgets store
        if (!db.objectStoreNames.contains('budgets')) {
          const budgetsStore = db.createObjectStore('budgets', { keyPath: 'id' });
          budgetsStore.createIndex('by-month-year', ['month', 'year']);
        }

        // Create categories store
        if (!db.objectStoreNames.contains('categories')) {
          const categoriesStore = db.createObjectStore('categories', { keyPath: 'id' });
          categoriesStore.createIndex('by-type', 'type');
        }
      },
    });
  }

  // Transaction operations
  async getTransactions(): Promise<Transaction[]> {
    return (await this.db).getAll('transactions');
  }

  async getTransaction(id: string): Promise<Transaction | undefined> {
    return (await this.db).get('transactions', id);
  }

  async saveTransaction(transaction: Transaction): Promise<string> {
    await (await this.db).put('transactions', transaction);
    return transaction.id;
  }

  async deleteTransaction(id: string): Promise<void> {
    await (await this.db).delete('transactions', id);
  }

  // Budget operations
  async getBudgets(): Promise<Budget[]> {
    return (await this.db).getAll('budgets');
  }

  async getBudget(id: string): Promise<Budget | undefined> {
    return (await this.db).get('budgets', id);
  }

  async saveBudget(budget: Budget): Promise<string> {
    await (await this.db).put('budgets', budget);
    return budget.id;
  }

  async deleteBudget(id: string): Promise<void> {
    await (await this.db).delete('budgets', id);
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return (await this.db).getAll('categories');
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return (await this.db).get('categories', id);
  }

  async saveCategory(category: Category): Promise<string> {
    await (await this.db).put('categories', category);
    return category.id;
  }

  async deleteCategory(id: string): Promise<void> {
    await (await this.db).delete('categories', id);
  }

  // Additional query methods
  async getTransactionsByType(type: 'expense' | 'income'): Promise<Transaction[]> {
    const allTransactions = await this.getTransactions();
    return allTransactions.filter(transaction => transaction.type === type);
  }

  async getBudgetsByMonthYear(month: number, year: number): Promise<Budget[]> {
    const db = await this.db;
    const index = db.transaction('budgets').store.index('by-month-year');
    return index.getAll([month, year]);
  }

  async getCategoriesByType(type: 'expense' | 'income'): Promise<Category[]> {
    const db = await this.db;
    const index = db.transaction('categories').store.index('by-type');
    return index.getAll(type);
  }
}

// Create and export a singleton instance
const storageService = new StorageService();
export default storageService;
