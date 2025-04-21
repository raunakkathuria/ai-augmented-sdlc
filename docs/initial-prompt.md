## Initial prompt

I want to demo to university students on how you can make efficient use of AI with a proper development workflow (using git) and phased implementation to solve any project or problem statement

I want to present how you can structure the git repository, here is the git log --oneline output of  one of the projects solved using this

## **Requirements refinement**
* You start with the main branch, and the first commit is all about the  docs
   * You start with a basic requirement and other context-related information
   * Then you ask AI to come up with the initial implementation plan and ask it to divide it into a phased implementation by defining phases that we will work on
   * and ask it to provide the preferred tech stack, keeping simplicity in mind
* then finalise the documentation once you are satisfied with the initial plan
* Ask AI to create a prompt for a developer to work on phase 1, and ask it to create coding guidelines and custom instructions for it
   * Add best practices like the " keep it simple policy
   * follow the TDD approach for development and so on
* Maintain a detailed Changelog to track all changes, decisions, and progress throughout the project

## Quick MVP
* Create a separate branch `MVP`
* Create a new task and ask AI to develop as per developer-prompt,
* Develop a quick MVP without prompting additional details in that task, see what AI has missed and based on the initial MVP, update the documentation
* This way, you would quickly know what works and what is missing. This phase helps to fine-tune your documentation

## Phase 1
* Create a separate branch `phase1/implementation`
* Create a new task and ask AI to work on the developer prompt created, and mark the phase 1 when you are done
* Commit each  change that you discuss with AI
* Once you are sure phase 1 is complete, then rebase all the commits into a single commit, or you can leave it  as it is, and when merging the  PR, do a squash and merge

## Phase 2
* Create a separate branch phase2/implementation
And so on

Here is git log --oneline of one of the projects that I worked on, which worked well

```
be500e5 Merge pull request #2 from regentmarkets/phase/2-single-connection

faec08b (tag: v0.1.0-phase2, tag: v0.1.0-phase1) Merge pull request #1 from regentmarkets/phase/1-core-connectivity

22d8d4e (phase/2-single-connection) Implement phase 2: single persistent TCP connection to MT5 servers

740e9de (phase/1-core-connectivity) Implement Phase 1: Core MT5 Connectivity

d57991b docs: project requirement, specification and planning documents
```


Can you create a blog for this to present to university students? Keep in mind, we need to create slides so high-level diagrams and other visuals will help with this
