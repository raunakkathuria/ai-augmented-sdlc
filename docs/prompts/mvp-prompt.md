# Student Budget Tracker - MVP Developer Prompt

## Project Context
You are developing a Student Budget Tracker application for university students. The application helps students track expenses, manage budgets, and gain insights into their spending habits. We are currently implementing the Minimum Viable Product (MVP), which focuses on essential functionality that delivers immediate value to users.

## MVP Documentation References
The complete documentation for the MVP is available in the `docs/mvp` directory:
- [MVP Requirements](../mvp/requirements.md) - What we're building and for whom
- [MVP Technical Specification](../mvp/technical-specification.md) - Technology stack and architecture
- [MVP Implementation Plan](../mvp/implementation-plan.md) - Detailed development roadmap
- [MVP Testing Strategy](../mvp/testing-strategy.md) - How to ensure quality
- [MVP User Guide](../mvp/user-guide.md) - How the application should function

## Technical Context
- **Frontend**: React.js with Material-UI
- **Storage**: IndexedDB for local persistence
- **State Management**: React Context API + useReducer
- **No backend services** in MVP (local-only application)

## MVP Feature Requirements
1. **Basic Expense Tracking**
   - Add, edit, and delete expense transactions
   - Record essential transaction details (amount, category, date, type, notes)
   - View list of transactions
   - Basic filtering by transaction type

2. **Simple Budget Setting**
   - Set monthly budget amounts by category
   - View current budget allocations
   - Basic editing of budget amounts
   - Simple comparison of budget vs. actual spending

3. **Minimal Reporting Functionality**
   - Current month summary (total income, expenses, balance)
   - Basic category breakdown of expenses
   - Simple budget vs. actual comparison

4. **Local Data Storage**
   - Persist all user data between sessions using IndexedDB
   - Basic CRUD operations for transactions, budgets, and categories

5. **Basic UI**
   - Simple, intuitive interface
   - Mobile-responsive design
   - Essential navigation between main sections
   - Minimal but functional styling

## Implementation Approach
Please follow the implementation plan in [MVP Implementation Plan](../mvp/implementation-plan.md), which breaks down the development into 6 phases:

1. **Project Setup and Infrastructure** (1 day)
   - Create React application with Create React App
   - Install and configure dependencies
   - Set up project structure
   - Implement IndexedDB service

2. **State Management** (1 day)
   - Create AppContext and reducer
   - Implement actions for CRUD operations
   - Connect context to storage service

3. **Core Components** (2 days)
   - Implement navigation component
   - Create page layouts
   - Build form components
   - Implement list components

4. **Feature Implementation** (3 days)
   - Implement transaction management
   - Implement budget management
   - Create basic reporting functionality

5. **UI Refinement** (1 day)
   - Apply consistent styling
   - Ensure mobile responsiveness
   - Implement basic error handling
   - Add loading states

6. **Testing and Documentation** (2 days)
   - Write unit tests for core functionality
   - Test components
   - Document code
   - Create user guide

## Development Guidelines
- **IMPORTANT**: Follow the [Custom Instructions](../guidelines/custom-instructions.md) for all changes
- Follow the coding guidelines in [Coding Guidelines](../guidelines/coding-guidelines.md)
- Adhere to the git workflow in [Git Workflow Guidelines](../guidelines/git-workflow.md)
- Use the MVP branch for development
- Follow the TDD (Test-Driven Development) approach for all features
- Keep code modular with clear separation of concerns
- Prioritize simplicity (KISS principle) over complex solutions
- Ensure responsive design for all screen sizes
- Document code with clear comments

## Deliverables
1. Complete implementation of MVP features
2. Unit tests for core functionality
3. Documentation for components and functions
4. Working application that meets all success criteria

## Success Criteria
- Users can add, edit, and delete transactions
- Users can set and manage budgets by category
- Users can view basic reports (monthly summary, category breakdown)
- All data persists between sessions
- UI is responsive and works on mobile devices
- Basic tests pass
- Code is documented

## AI Collaboration
If you choose to use AI tools during development, please follow the guidelines in [AI Collaboration Guidelines](../guidelines/ai-collaboration.md) to ensure effective use of these tools.

## Questions and Clarifications
If you have any questions or need clarification on any aspect of the implementation, please don't hesitate to ask. Clear communication is essential for the success of this project.
