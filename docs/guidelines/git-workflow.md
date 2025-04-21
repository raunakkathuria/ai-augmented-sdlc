# Git Workflow Guidelines

## Branch Strategy

### Main Branches
- **main**: Production-ready code
- **MVP**: Minimum viable product implementation
- **phase1/implementation**: Phase 1 features implementation
- **phase2/implementation**: Phase 2 features implementation

### Feature Branches
For specific features, create branches from the current phase branch:
- Format: `phase#/feature-name`
- Example: `phase1/expense-tracking`

### Bugfix Branches
For bug fixes, create branches from the affected phase branch:
- Format: `phase#/fix-description`
- Example: `phase1/fix-date-calculation`

## Commit Guidelines

### Commit Message Format
```
<type>: <subject>

[optional body]

[optional footer]
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Formatting, missing semicolons, etc; no code change
- **refactor**: Code refactoring
- **test**: Adding tests, refactoring tests
- **chore**: Updating build tasks, package manager configs, etc

### Subject Guidelines
- Use imperative, present tense: "add" not "added" or "adds"
- Don't capitalize the first letter
- No period at the end
- Keep it under 50 characters
- Be descriptive and concise

### Body Guidelines
- Explain what and why vs. how
- Include motivation for the change
- Reference issues and pull requests

### Examples
```
feat: add expense categorization feature

Implement the ability to categorize expenses by type.
This allows users to better organize their spending data.

Resolves: #123
```

```
fix: correct date calculation in monthly report

The report was using local timezone which caused issues
with month boundaries. Now using UTC consistently.
```

## Pull Request Process
1. Create a PR from your feature branch to the appropriate phase branch
2. Fill out the PR template with details about your changes
3. Request reviews from team members
4. Address review comments
5. Merge only when approved and CI passes

## Tagging and Releases
- Tag major milestones with semantic versioning
- Format: `v<major>.<minor>.<patch>-<phase>`
- Example: `v0.1.0-phase1`

## Code Review Guidelines
- Review for functionality, not just style
- Be constructive and respectful
- Suggest alternatives when pointing out issues
- Approve only when you're confident in the changes
