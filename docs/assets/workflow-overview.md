# Workflow Overview Diagram

This diagram illustrates the AI-assisted Git workflow for university projects, showing the progression from documentation to implementation phases.

## Mermaid Diagram Code

```mermaid
flowchart TD
    subgraph main["Main Branch"]
        A[Documentation] --> B[Requirements]
        B --> C[Implementation Plan]
        C --> D[Technical Specification]
        D --> E[Guidelines & Prompts]
    end

    subgraph mvp["MVP Branch"]
        F[Quick Implementation] --> G[Basic Features]
        G --> H[Evaluation]
        H --> I[Requirement Refinement]
    end

    subgraph phase1["Phase 1 Branch"]
        J[Core Implementation] --> K[Complete Features]
        K --> L[Testing]
        L --> M[Documentation]
    end

    subgraph phase2["Phase 2 Branch"]
        N[Enhanced Features] --> O[Advanced Functionality]
        O --> P[Optimization]
        P --> Q[Final Documentation]
    end

    E --> F
    I --> J
    M --> N

    style main fill:#d4f1f9,stroke:#05a0c8,stroke-width:2px
    style mvp fill:#ffe6cc,stroke:#ff9933,stroke-width:2px
    style phase1 fill:#d5e8d4,stroke:#82b366,stroke-width:2px
    style phase2 fill:#e1d5e7,stroke:#9673a6,stroke-width:2px
```

## Description

The diagram shows four main phases of development:

1. **Main Branch (Documentation Phase)**:
   - Starting with requirements definition
   - Creating an implementation plan
   - Establishing technical specifications
   - Developing guidelines and prompts

2. **MVP Branch**:
   - Quick implementation of basic features
   - Evaluation of the implementation
   - Refinement of requirements based on findings

3. **Phase 1 Branch**:
   - Implementation of core features
   - Comprehensive testing
   - Documentation of implemented features

4. **Phase 2 Branch**:
   - Implementation of enhanced features
   - Performance optimization
   - Final documentation updates

The arrows between branches show the progression of the project, with each phase building on the learnings from the previous phase.
