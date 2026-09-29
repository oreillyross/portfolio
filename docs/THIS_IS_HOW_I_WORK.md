# This Is How I Work

> Working title / source material for a portfolio blog post about how I build software as a solopreneur using AI agents, Claude Code, Omarchy, and a reliability-first engineering workflow.

## Purpose

This document is source material for Claude Code to turn into a polished first-person blog post for my portfolio site.

The post should explain **how I actually work**, rather than present a generic "AI coding productivity" setup.

The central idea is:

> **I am moving from being the person who writes every line of code to being the person who designs, directs, tests, constrains, and improves a small software system made up of myself, AI coding agents, tools, memory, automation, and infrastructure.**

I want the article to make this feel practical and real.

It should not sound like a productivity influencer article. It should sound like a working engineer/building founder documenting the system he is developing for himself.

---

# 1. The Bigger Context

I am a software engineer and aspiring solopreneur building toward owning my own time and space.

My direction is increasingly:

- build useful internet software
- use AI aggressively as a force multiplier
- stay technically deep enough to understand and control the system
- reduce repetitive implementation work
- spend more of my time on architecture, product decisions, experiments, reliability, and leverage
- build systems that allow one person to operate at a much larger scale

I am particularly interested in **agentic AI reliability engineering**.

That means I am not primarily interested in asking:

> "How can AI write code faster?"

I am more interested in:

> "How do I build a development environment in which AI can do substantial amounts of work while remaining aligned with what I actually want?"

That distinction is important.

---

# 2. My Mental Model

I think of an LLM as an extremely capable reasoning engine, but not as an autonomous software engineer that can simply be trusted indefinitely.

An LLM can:

- reason over code
- infer intent
- generate implementations
- inspect failures
- propose changes
- transform structured information
- call tools
- iterate

But an agentic system needs more than the model.

It needs:

- context
- memory
- constraints
- tools
- state
- tests
- feedback loops
- observability
- checkpoints
- human judgement
- recovery mechanisms

So my interest is increasingly in the **system around the model**.

The model is one component.

The engineering environment is the larger system.

---

# 3. Jev: LLM Reasoning → Structured Decisions

One of the concepts I have been developing is **Jev**.

The idea is that an LLM can be used as a reasoning layer that turns messy natural-language situations into structured outputs that deterministic software can act upon.

Conceptually:

```text
real-world input
       ↓
      LLM
       ↓
reasoning / interpretation
       ↓
structured output
       ↓
rules / if-else / application logic
       ↓
action
       ↓
feedback
```

The interesting part is the boundary between probabilistic reasoning and deterministic software.

Instead of pretending the LLM itself should control everything, I can use it to produce:

- classifications
- decisions
- probabilities
- structured state
- proposed actions
- next steps
- tool calls

Then conventional software can enforce the rules.

This is one of the ideas behind my interest in reliable agentic systems.

---

# 4. My Current Development Philosophy

My development workflow is becoming increasingly **agent-first but reliability-first**.

The agent should have freedom to work, but inside a clearly defined environment.

I want:

- small tasks
- explicit acceptance criteria
- clear project instructions
- architectural constraints
- tests
- validation
- git history
- visible state
- easy rollback
- human checkpoints where appropriate

The goal is not to micromanage the agent.

The goal is to make the environment good enough that the agent can operate effectively without constantly needing me to rescue it.

---

# 5. Claude Code Is the Main Coding Partner

Claude Code is increasingly the primary interface through which I work on projects.

I use it for things such as:

- exploring an unfamiliar codebase
- implementing features
- refactoring
- debugging
- writing tests
- inspecting dependencies
- running commands
- analysing failures
- updating documentation
- iterating on an implementation

The important shift is psychological:

I don't necessarily think:

> "I need to write this feature."

I increasingly think:

> "I need to define the desired outcome and construct the conditions under which the agent can implement it safely."

That makes the surrounding workflow extremely important.

---

# 6. The Project Instruction Layer

I use project-level documentation to keep the agent aligned.

Typical concepts include files such as:

```text
AGENT.md
TASKS.md
CURRENT_TASK.md
ALIGNMENT.md
ADR/
```

The exact filenames are less important than the principle.

### AGENT.md

How the repository works.

Examples:

- technology choices
- commands
- conventions
- architecture
- testing expectations
- things the agent must not change casually

### TASKS.md

The larger backlog and sequence of work.

### CURRENT_TASK.md

The specific piece of work currently being attempted.

This keeps the agent focused.

### ALIGNMENT.md

A particularly important idea for me.

This is intended to reduce **LLM drift**.

It describes:

- what we are building
- why it exists
- important product decisions
- architectural boundaries
- what is explicitly out of scope
- current priorities
- assumptions that must remain true

### ADRs

Architectural Decision Records capture decisions so that future agent sessions do not repeatedly rediscover or accidentally reverse them.

---

# 7. Small Tasks Beat Huge Prompts

I am increasingly convinced that one of the biggest improvements to agentic coding is simply reducing ambiguity.

Instead of:

> "Build the whole feature."

I want something closer to:

```text
Goal
Constraints
Relevant files
Acceptance criteria
Tests
Definition of done
```

The agent gets enough autonomy to solve the problem while the problem itself remains bounded.

This is analogous to good engineering management.

The agent doesn't need every keystroke dictated.

It needs a good problem definition.

---

# 8. My Reliability Loop

The workflow I am aiming for looks roughly like this:

```text
Define
  ↓
Plan
  ↓
Agent implements
  ↓
Run tests
  ↓
Inspect result
  ↓
Agent evaluates failure
  ↓
Fix
  ↓
Re-test
  ↓
Review diff
  ↓
Commit
  ↓
Update project state
```

For larger tasks:

```text
specification
    ↓
implementation
    ↓
automated tests
    ↓
eval cases
    ↓
human review
    ↓
production observation
    ↓
feedback into specification
```

The system should learn from failures at the **process level**, not merely fix the individual bug.

---

# 9. Evals and Test Cases

A major part of my interest is moving beyond traditional unit tests.

For agentic systems I also want **evals**.

For example:

- given this request, does the agent produce the expected structured result?
- does it call the right tool?
- does it respect a boundary?
- does it avoid an unsafe action?
- does it recover from a failed tool call?
- does it preserve architectural constraints?
- does it correctly interpret ambiguous input?

This is important because an agent can produce code that passes a narrow unit test while still misunderstanding the actual product intent.

I want to test the behaviour of the **agent + tools + instructions + application**, not only individual functions.

---

# 10. My Tech Stack

My current web-development stack commonly includes:

- TypeScript
- React
- Vite
- Tailwind
- Express
- tRPC
- React Query
- Zod
- Drizzle
- PostgreSQL
- GitHub
- Railway
- Replit
- Claude Code

I am also exploring:

- MCP
- Hono
- LangGraph / LangChain
- agent harnesses
- long-running agents
- scheduled agent loops
- memory systems
- structured outputs
- eval frameworks
- PWA architecture
- cloud infrastructure
- DNS / networking
- containerisation

The stack is not sacred.

The principle is to choose technology that lets a small team — potentially one person plus agents — move quickly without creating unnecessary complexity.

---

# 11. Omarchy as the Workstation

I will use **Omarchy** as part of this setup.

The point is not that Omarchy is magically better than every other operating system.

The point is that I want my local machine to become a serious **engineering cockpit**.

The environment should make it natural to work from:

- terminal
- tmux
- editor
- browser
- git
- Claude Code
- project documentation
- monitoring / logs
- remote machines

I want the computer to disappear as much as possible.

The interface should support the workflow rather than become the workflow.

Omarchy fits the direction because it gives me a deliberately keyboard-driven, terminal-centric environment that is well suited to working with agents and development tools.

---

# 12. Local Machine vs Remote Machine

An important part of my thinking is separating:

> **where I am sitting**

from:

> **where the work is happening**

This is inspired by the increasingly common remote-agent development workflow.

A long-running agent should not necessarily die because I close a laptop.

Ideally:

```text
                    ┌──────────────────┐
                    │  Remote machine  │
                    │                  │
                    │ Claude Code      │
                    │ repositories     │
                    │ databases        │
                    │ tmux sessions    │
                    │ services         │
                    └────────┬─────────┘
                             │
                         secure link
                             │
             ┌───────────────┼───────────────┐
             │               │               │
          Omarchy         laptop           phone
           desktop
```

The client becomes a window into the development environment.

This is particularly useful for agents because some tasks take time.

I should be able to:

- start an agent
- disconnect
- do something else
- reconnect
- inspect progress
- continue

The work should persist independently of my current device.

---

# 13. tmux and Long-Running Work

I like the simplicity of tmux.

It provides a very useful fallback:

```text
project-a
project-b
project-c
agent-testing
database
logs
```

If a fancy GUI disappears, the work is still there.

SSH in.

Attach to tmux.

Continue.

This is a useful reliability principle:

> **The simplest recovery path should remain available underneath the abstractions.**

---

# 14. Security Is Part of the Workflow

Agentic coding increases the importance of security.

An agent may have access to:

- source code
- environment variables
- terminals
- package managers
- git
- deployment tools
- APIs
- MCP servers
- databases

That means the question is not simply:

> "Can the agent do this?"

It is:

> "What should this agent be allowed to do?"

I am interested in:

- least privilege
- scoped credentials
- secrets management
- isolated environments
- explicit tool boundaries
- auditable actions
- private networking
- avoiding unnecessary exposure of services
- understanding the security implications of MCP and agent tooling

The agent should have enough access to be useful, but not unlimited access by default.

---

# 15. My Projects Are the Laboratory

I don't want this workflow to remain theoretical.

I use my own projects as the laboratory.

## Pantler

Pantler is a practical pantry / food-management application.

The broader idea includes:

- food inventory
- photographs
- expiry tracking
- recipes
- reducing food waste
- potentially connecting inventory to grocery ordering

It is a useful testbed because it is a real product rather than a toy.

It lets me experiment with:

- product iteration
- agentic coding
- PWA behaviour
- database design
- deployment
- UX
- structured AI features
- reliability

## Horizon Lite

Horizon Lite is an analyst-oriented project involving:

- themes
- scenarios
- indicators
- geopolitical information
- structured analysis

It gives me another environment in which to explore agentic reasoning and structured outputs.

## Verity

Verity explores encrypted interaction logging and gives me another laboratory for thinking about:

- security
- encryption
- traceability
- trustworthy AI interactions

## 2ndBrain

My 2ndBrain / Zettelkasten work is another example of using software to improve the way I think and organise information.

---

# 16. The Solopreneur Angle

This is ultimately about leverage.

A traditional small software company might have:

```text
founder
designer
frontend developer
backend developer
QA
DevOps
researcher
project manager
```

I am interested in what happens when one capable person can orchestrate increasingly capable AI systems that cover parts of all of those functions.

Not perfectly.

Not autonomously.

But sufficiently well to change the economics of building software.

My job becomes increasingly:

```text
vision
   ↓
product decisions
   ↓
architecture
   ↓
specification
   ↓
agent orchestration
   ↓
evaluation
   ↓
quality control
   ↓
shipping
```

That is where I see the opportunity.

---

# 17. Agentic AI Reliability Engineer

This is emerging as a personal positioning for me.

The phrase describes someone who understands both sides:

### AI

- LLM behaviour
- prompting
- structured outputs
- tool use
- agents
- memory
- evaluation
- probabilistic reasoning

### Engineering

- software architecture
- testing
- security
- infrastructure
- observability
- deployment
- failure modes
- deterministic systems

The interesting space is the boundary.

The question is:

> **How do you turn probabilistic intelligence into dependable software?**

That is the problem I want to spend more time solving.

---

# 18. Long-Running Agents

I am particularly interested in agents that feel less like a chatbot and more like a software process.

For example:

```text
agent
  ↓
observe state
  ↓
reason
  ↓
choose action
  ↓
call tool
  ↓
update state
  ↓
wait
  ↓
wake again
```

Potentially:

- scheduled jobs
- cron loops
- queues
- event triggers
- persistent memory
- project state
- evaluation loops

This starts to look less like "chatting with AI" and more like operating a small artificial software organism.

I am interested in where that abstraction becomes useful without becoming unnecessarily complicated.

---

# 19. The Human Still Matters

This is not about removing myself from the loop entirely.

I still need to provide:

- taste
- judgement
- product sense
- priorities
- values
- architecture
- context
- final accountability

The agent can generate ten possible implementations.

I decide which problem is worth solving.

The agent can write the code.

I decide whether the result is actually good.

The agent can run tests.

I decide whether the tests represent reality.

The most important human skill may therefore become **knowing what should exist in the first place**.

---

# 20. My Working Environment Should Feel Like a System

The ultimate goal is something like:

```text
                    MY INTENT
                        │
                        ▼
                 project context
                        │
                        ▼
                  Claude Code
                        │
             ┌──────────┼──────────┐
             ▼          ▼          ▼
           tools      memory      repo
             │          │          │
             └──────────┼──────────┘
                        ▼
                  implementation
                        │
                        ▼
                 tests / evals
                        │
                        ▼
                    feedback
                        │
                        └──────────► next iteration
```

The individual tools matter less than the system.

---

# 21. What "Good" Looks Like

A good working session should feel like:

1. I know what I am trying to achieve.
2. The agent has enough context to understand it.
3. The task is bounded.
4. The agent can inspect the repository.
5. The agent can make changes.
6. Tests and checks provide objective feedback.
7. Failures are visible.
8. The agent can iterate.
9. I can inspect the resulting diff.
10. The state of the project remains understandable to the next agent session.
11. I can stop at any point without losing the work.
12. I can return tomorrow and continue.

The system should reduce cognitive overhead rather than create more of it.

---

# 22. What I Don't Want This Article to Become

Avoid turning the article into:

- "10 AI productivity hacks"
- generic Claude Code praise
- a list of software tools
- an Omarchy fanboy post
- a tutorial pretending every setup is universal
- a claim that AI can replace engineers
- an unrealistic autonomous-agent manifesto
- a productivity bro article
- an enormous configuration dump with no explanation

The article should be about **the reasoning behind the workflow**.

Commands and configuration can appear where they illuminate a point, but the reader should understand why each component exists.

---

# 23. Tone

Write in first person.

Tone:

- technical
- curious
- practical
- slightly philosophical
- honest
- experimental
- builder-oriented
- understated
- confident without hype

Use phrases like:

> "This is how I currently work."

> "I'm still figuring this out."

> "The interesting part isn't the tool itself. It's the system around it."

> "I don't want an autonomous agent. I want a dependable one."

> "The model is only one component."

> "My laptop is increasingly becoming a window into the system rather than the system itself."

Avoid:

- "revolutionary"
- "game changer"
- "10x developer"
- "AI will replace everyone"
- excessive marketing language

---

# 24. Possible Opening

The article could open with the practical problem:

> My laptop used to be my development environment.
>
> Increasingly, I don't think it should be.
>
> These days I can start Claude Code on a project, give it a task, and have it work for twenty minutes — or much longer — while I make coffee, walk the dog, work on something else, or simply step away.
>
> The interesting question is no longer how quickly I can type code.
>
> It's how I build an environment in which an AI agent can work effectively without me sitting over its shoulder.

Then expand from there.

---

# 25. Possible Article Structure

## Title

Possible titles:

- **This Is How I Work Now**
- **My AI-Native Development Environment**
- **How I Build Software With AI Agents**
- **The Development Environment I'm Building for One Person + AI**
- **From Coding With AI to Engineering Agentic Systems**
- **My Agentic Coding Setup**
- **Building My Own AI-Native Development Environment**

Potential subtitle:

> How Claude Code, Omarchy, remote development, structured project context, tests and evals are changing the way I build software.

---

## Section 1 — The Laptop Is No Longer the Computer

Explain the shift from laptop-centric development to persistent development environments.

## Section 2 — AI Is a New Layer in the Engineering Stack

Explain why an LLM is powerful but insufficient by itself.

## Section 3 — My Agentic Coding Loop

Show the actual workflow.

## Section 4 — Giving Agents Context

AGENT.md, TASKS.md, CURRENT_TASK.md, ALIGNMENT.md, ADRs.

## Section 5 — Omarchy as My Engineering Cockpit

Explain the terminal-centric local environment.

## Section 6 — Remote, Persistent Work

Explain server + tmux + secure connectivity.

## Section 7 — Tests, Evals and Reliability

Explain the shift from code correctness to agent/system correctness.

## Section 8 — Jev and Structured Reasoning

Explain the idea of LLM reasoning feeding deterministic software.

## Section 9 — My Projects as the Laboratory

Pantler, Horizon Lite, Verity, 2ndBrain.

## Section 10 — Where This Is Going

Agentic AI reliability engineering and the solopreneur opportunity.

---

# 26. The Core Thesis

If the entire article had to be reduced to one paragraph, it would be:

> I am building a development environment in which I can operate as a one-person software company with increasingly capable AI agents. Claude Code handles a growing amount of implementation and investigation, Omarchy gives me a focused engineering workstation, remote machines and persistent sessions let work continue without my laptop, and project documentation, tests, evals and architectural constraints keep the agents aligned. The interesting engineering problem is no longer simply getting an LLM to write code. It is designing the system around the LLM so that probabilistic intelligence becomes useful, controllable and dependable.

---

# 27. Instructions for Claude Code When Turning This Into the Blog Post

When asked to turn this document into the final article:

1. Write in first person.
2. Preserve the practical, personal nature of the story.
3. Do not invent hardware specifications, services, costs, benchmarks, or claims not contained here.
4. Clearly distinguish current practice from experiments and future intentions.
5. Use code blocks only when they genuinely clarify the workflow.
6. Use diagrams where useful, preferably simple Mermaid diagrams if the portfolio site supports them.
7. Explain why tools exist rather than merely listing them.
8. Mention Omarchy naturally as part of the environment, not as the subject of the article.
9. Make Claude Code central but do not make the article an advertisement for Anthropic.
10. Treat reliability as the central engineering theme.
11. Make Jev interesting without pretending it is a finished commercial product.
12. Explain agentic AI reliability engineering as an emerging direction rather than claiming an established job title or industry standard.
13. Keep the article useful to experienced developers while remaining readable to someone discovering agentic development.
14. Include honest limitations and failure modes.
15. Avoid hype about autonomous AI.
16. End with a forward-looking section about building software as a solo founder with AI systems as collaborators.
17. The final article should feel like an engineer opening the door to his workshop and showing how it is actually organised.

---

# 28. The One-Sentence Identity

A useful final line / positioning statement:

> **I am building the engineering system that lets one person build software with machines that can reason, act, test, remember and keep working — while keeping the human firmly responsible for what gets built.**

