# AI Collaboration Guidelines

## When to Use AI

### Effective Use Cases
- **Documentation generation**: Initial drafts of documentation
- **Boilerplate code**: Setting up project structure, config files
- **UI component creation**: Basic component scaffolding
- **Test generation**: Creating test cases for existing code
- **Debugging assistance**: Analyzing error messages and suggesting fixes
- **Code refactoring**: Improving existing code structure
- **Learning new concepts**: Getting explanations and examples

### Less Effective Use Cases
- **Complex business logic**: Core algorithms that require deep domain understanding
- **System architecture**: High-level design decisions with long-term implications
- **Performance optimization**: Without specific context and metrics
- **Security-critical code**: Authentication, authorization, data protection

## Effective Prompting Strategies

### General Principles
1. **Be specific**: Clearly define what you want
2. **Provide context**: Include relevant information about your project
3. **Set constraints**: Specify limitations or requirements
4. **Request explanations**: Ask for reasoning behind suggestions
5. **Iterate**: Refine based on initial responses

### Prompt Templates

#### Documentation Request
```
Create documentation for [feature/component] that:
1. Explains its purpose and functionality
2. Describes its inputs and outputs
3. Provides usage examples
4. Notes any limitations or edge cases

Context: [brief project description]
```

#### Code Generation Request
```
Generate [language] code for a [component/function] that:
1. [Specific functionality]
2. Handles [edge cases]
3. Follows these patterns: [patterns]

Project context:
- Using [framework/library]
- Following [architectural pattern]
- Must integrate with [existing system]
```

#### Code Review Request
```
Review this code for:
1. Potential bugs or edge cases
2. Performance issues
3. Readability and maintainability
4. Adherence to our coding guidelines

[code block]
```

## Reviewing AI-Generated Code

### Checklist
- **Functionality**: Does it work as expected?
- **Edge cases**: Are all scenarios handled?
- **Performance**: Are there any inefficient patterns?
- **Security**: Are there potential vulnerabilities?
- **Maintainability**: Is the code clear and well-structured?
- **Integration**: Does it fit with the existing codebase?
- **Tests**: Are there appropriate tests?

### Common Issues to Watch For
- Hallucinated function calls or APIs
- Outdated patterns or deprecated methods
- Overly complex solutions for simple problems
- Missing error handling
- Inconsistent naming or styling
- Security vulnerabilities (SQL injection, XSS, etc.)

## Learning from AI Collaboration
- Understand the "why" behind suggestions
- Research unfamiliar concepts or patterns
- Adapt solutions to your specific needs
- Develop your own mental models
- Use AI as a learning tool, not just a code generator
