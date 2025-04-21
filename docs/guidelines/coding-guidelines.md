# Coding Guidelines

## General Principles
- **Keep It Simple**: Prefer simple, readable solutions over clever, complex ones
- **DRY (Don't Repeat Yourself)**: Extract reusable code into functions/components
- **Single Responsibility**: Each function/component should do one thing well
- **Testability**: Write code that is easy to test

## Naming Conventions

### Files and Directories
- React components: PascalCase (e.g., `TransactionList.jsx`)
- Utilities and hooks: camelCase (e.g., `useLocalStorage.js`)
- Test files: Same name as the file they test with `.test` suffix (e.g., `TransactionList.test.jsx`)
- Style files: Same name as the component they style (e.g., `TransactionList.css`)

### Code Elements
- Variables and functions: camelCase (e.g., `getUserTransactions`)
- Components: PascalCase (e.g., `TransactionList`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_TRANSACTIONS`)
- Interfaces/Types: PascalCase with descriptive names (e.g., `TransactionData`)

## File Structure
```
src/
├── components/         # Reusable UI components
│   ├── common/         # Shared components (buttons, inputs, etc.)
│   └── feature/        # Feature-specific components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # Service layers (storage, API, etc.)
├── utils/              # Utility functions
├── context/            # React Context definitions
├── types/              # TypeScript type definitions
└── assets/             # Static assets (images, icons, etc.)
```

## Code Style
- Use ESLint and Prettier for consistent formatting
- 2 space indentation
- Semicolons required
- Single quotes for strings
- Trailing commas in multiline objects/arrays
- No unused variables or imports
- Explicit return types for functions

## React Best Practices
- Use functional components with hooks
- Keep components small and focused
- Extract complex logic to custom hooks
- Use prop destructuring
- Avoid inline styles (use CSS modules or styled-components)
- Memoize expensive calculations and callbacks

## State Management
- Use React Context for global state
- Use useState for local component state
- Use useReducer for complex state logic
- Keep state normalized when possible
- Minimize state duplication

## Error Handling
- Use try/catch for async operations
- Provide meaningful error messages
- Log errors appropriately
- Gracefully degrade functionality when errors occur
- Display user-friendly error messages

## Testing
- Write tests for all business logic
- Test component rendering and interactions
- Mock external dependencies
- Aim for high test coverage of critical paths
- Use TDD approach when appropriate
