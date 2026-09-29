---
publishDate: 2026-09-29T00:00:00Z
title: I Stopped Writing Every Line of Code. Here's What I Do Instead.
excerpt: My laptop used to be my development environment. Now I'm building a small system of me, AI agents, tests, evals and persistent machines, and the hard part isn't getting an LLM to write code.
image: ~/assets/images/nature.jpg
imageAlt: A quiet natural landscape
category: How I work
tags:
  - claude code
  - agentic reliability
  - evals
  - workflow
  - solopreneur
author: Ross O'Reilly
---

My laptop used to be my development environment.

Increasingly, I don't think it should be.

These days I can start Claude Code on a project, give it a task, and have it work for twenty minutes or much longer while I make coffee, walk the dog, work on something else, or just step away.

So the interesting question is no longer how quickly I can type code. It's how I build an environment where an AI agent can work well without me sitting over its shoulder.

This is how I currently work. I'm still figuring a lot of it out, and some of what follows is practice while some of it is where I'm heading. I'll try to be clear about which is which.

## The shift

The short version is this: I'm moving from being the person who writes every line of code to being the person who designs, directs, tests, constrains and improves a small software system. That system is made up of me, AI coding agents, tools, memory, automation and infrastructure.

I'm not mainly asking "how can AI write code faster?" I'm asking something closer to this:

> How do I build a development environment in which AI can do substantial amounts of work while staying aligned with what I actually want?

That difference shapes everything else in this post.

## The model is only one component

I think of an LLM as a very capable reasoning engine. It can read code, infer intent, generate implementations, inspect failures, propose changes, call tools and iterate.

What it isn't is an autonomous software engineer that can be trusted indefinitely.

An agentic system needs a lot more than the model. It needs context, memory, constraints, tools, state, tests, feedback loops, observability, checkpoints, recovery paths and human judgement. So more and more of my attention goes to the system around the model.

I don't want an autonomous agent. I want a dependable one.

## Claude Code is the main coding partner

Claude Code has become the main interface through which I work on projects. I use it to explore unfamiliar codebases, implement features, refactor, debug, write tests, inspect dependencies, run commands, analyse failures and keep documentation current.

The bigger change is psychological. I used to think "I need to write this feature." Now I tend to think "I need to define the outcome and set up the conditions under which the agent can implement it safely."

That second framing makes the surrounding workflow the thing that matters.

## Small tasks beat huge prompts

One of the biggest improvements to agentic coding is plain boring ambiguity reduction.

"Build the whole feature" is a bad task. What works much better looks like this:

```text
Goal
Constraints
Relevant files
Acceptance criteria
Tests
Definition of done
```

The agent gets enough room to solve the problem, and the problem itself stays bounded. It's much like good engineering management: nobody needs every keystroke dictated to them, but everyone needs a clear problem definition.

## Giving agents context

Every new agent session starts with no memory of the last one. If I don't write down what matters, it gets rediscovered, or worse, quietly reversed. So I keep a project instruction layer in the repo. The file names vary between projects, and they matter less than the principle:

- **AGENT.md** says how the repository works: technology choices, commands, conventions, architecture, testing expectations, and the things the agent must not change casually.
- **TASKS.md** holds the larger backlog and the order of work.
- **CURRENT_TASK.md** is the one piece of work being attempted right now. It keeps the agent focused.
- **ALIGNMENT.md** is the one I care most about, because its job is to reduce LLM drift. It says what we're building, why it exists, the important product decisions, the architectural boundaries, what's explicitly out of scope, and the assumptions that must stay true.
- **ADRs** (Architectural Decision Records) capture decisions so that future sessions don't keep relitigating them.

The goal isn't to micromanage the agent. It's to make the environment good enough that the agent doesn't keep needing me to rescue it.

## My reliability loop

For everyday work, the loop I'm aiming for looks roughly like this:

```text
Define → Plan → Agent implements → Run tests → Inspect result
   → Agent evaluates failure → Fix → Re-test → Review diff
   → Commit → Update project state
```

For bigger pieces of work it stretches out:

```text
specification → implementation → automated tests → eval cases
   → human review → production observation → back into the specification
```

The last arrow is the important one. I want the system to learn from failures at the process level, not just patch the individual bug. If an agent keeps making the same mistake, the fix usually belongs in the instructions, the constraints or the tests, not in yet another prompt.

## Tests aren't enough, so evals

An agent can write code that passes a narrow unit test while completely misunderstanding what the product was meant to do. That's why I'm increasingly interested in evals alongside ordinary tests:

- Given this request, does the agent produce the expected structured result?
- Does it call the right tool?
- Does it respect a boundary, and avoid an unsafe action?
- Does it recover from a failed tool call?
- Does it keep the architectural constraints intact?
- Does it interpret ambiguous input correctly?

What I want to test is the behaviour of the agent, its tools, its instructions and the application together, not just individual functions. This is the part of the work I find most interesting, and it's where I'm spending more of my time.

## Jev: from reasoning to structured decisions

One idea I've been developing is something I call **Jev**. It isn't a finished product. It's a pattern I keep coming back to.

The idea is to use the LLM as a reasoning layer that turns messy, natural-language situations into structured output that ordinary deterministic software can act on:

```text
real-world input → LLM → interpretation → structured output
   → rules / application logic → action → feedback
```

The interesting part is the boundary between probabilistic reasoning and deterministic software. Instead of pretending the LLM should control everything, I let it produce classifications, decisions, probabilities, structured state, proposed actions and tool calls. Then conventional code enforces the rules.

That boundary is a large part of what I mean by reliable agentic systems.

## Where I sit versus where the work happens

The other big idea is separating where I'm sitting from where the work is happening.

A long-running agent shouldn't die because I close a laptop lid. Where I want to get to is a remote machine that holds the repositories, databases, services, tmux sessions and Claude Code itself. My desktop, laptop or phone connect to it over a secure link.

In that setup the client is just a window into the development environment. I can start an agent, disconnect, do something else, reconnect, check progress and carry on. The work persists independently of whatever device I happen to be holding.

My laptop is increasingly becoming a window into the system rather than the system itself.

### tmux as the floor

I like tmux for its simplicity. One session per project, one for agent testing, one for the database, one for logs. If some nicer GUI layer falls over, the work is still there: SSH in, attach, continue.

That's a reliability principle I try to apply everywhere: the simplest recovery path should stay available underneath the abstractions.

## Omarchy as the cockpit

On the local side I'm moving to **Omarchy**. Not because it's magically better than every other operating system, but because I want my machine to be a focused engineering cockpit: terminal, tmux, editor, browser, git, Claude Code, project docs, logs and remote machines, all a keystroke away.

It's keyboard-driven and terminal-centric, which suits working with agents and dev tools. I want the computer to disappear. The interface should support the workflow, not become it.

## Security is part of the workflow

Agents raise the stakes on security. An agent might have access to source code, environment variables, terminals, package managers, git, deployment tools, APIs, MCP servers and databases.

So the question isn't "can the agent do this?" It's "what should this agent be allowed to do?"

I care about least privilege, scoped credentials, proper secrets management, isolated environments, explicit tool boundaries, auditable actions, private networking, and understanding what MCP and agent tooling actually expose. The agent should have enough access to be useful, and no more by default.

## My projects are the laboratory

None of this is meant to stay theoretical, so I test it on my own projects:

- **[Pantler](/blog/how-i-built-pantler)** is a pantry and food-management app covering inventory, photos, expiry tracking, recipes and less food waste. It's a real product rather than a toy, which makes it a good testbed for agentic coding, structured AI features, database design, PWA behaviour, deployment and reliability.
- **Horizon Lite** is an analyst-oriented project built around themes, scenarios, indicators and geopolitical information. It's another place to explore agentic reasoning and structured output.
- **Verity** explores encrypted interaction logging, which keeps me thinking about security, traceability and trustworthy AI interactions.
- **2ndBrain** is my Zettelkasten work, about using software to improve how I think and organise information.

## The honest limitations

This is far from solved, and I'd distrust anyone who tells you otherwise.

- Agents drift. Without written constraints they'll happily undo last week's decision with total confidence.
- Passing tests aren't the same as correct behaviour. If the tests don't represent reality, a green run just gives you false confidence.
- More autonomy means a bigger blast radius, which is why security and least privilege are part of the workflow and not an afterthought.
- Long-running agents are easy to over-engineer. I'm still working out where that abstraction starts earning its keep and where it just adds complexity.
- The whole thing only works if I do the unglamorous parts: keeping task files current, writing the ADR, reviewing the diff.

## The human still matters

I'm not trying to take myself out of the loop. I still bring the taste, judgement, product sense, priorities, values, architecture and context, and I'm the one accountable for the result.

The agent can generate ten implementations. I decide which problem is worth solving. The agent can write the code, and I decide whether it's actually good. The agent can run the tests, and I decide whether those tests represent reality.

The most important human skill may turn out to be knowing what should exist in the first place.

## What a good session feels like

When it works, a session goes something like this:

1. I know what I'm trying to achieve.
2. The agent has enough context to understand it.
3. The task is bounded.
4. The agent can inspect the repo and make changes.
5. Tests and checks give objective feedback, and failures are visible.
6. The agent iterates.
7. I review the diff.
8. The project state stays understandable to the next session.
9. I can stop at any point without losing work, and pick it up again tomorrow.

The system should reduce cognitive overhead, not add to it.

## Where this is going

A traditional small software company might have a founder, a designer, frontend and backend developers, QA, DevOps, a researcher and a project manager. What interests me is what happens when one capable person can orchestrate AI systems that cover part of each of those roles. Not perfectly, and not autonomously, but well enough to change the economics of building software.

My job then looks more like this:

```text
vision → product decisions → architecture → specification
   → agent orchestration → evaluation → quality control → shipping
```

I've started calling the space I want to work in **agentic AI reliability engineering**. It isn't an established job title or an industry standard, just a name for the boundary I keep ending up at. On one side are LLM behaviour, structured outputs, tool use, memory and evaluation. On the other are architecture, testing, security, infrastructure, observability and failure modes. The question sitting between them is the one I want to spend my time on:

> How do you turn probabilistic intelligence into dependable software?

That's the workshop. I'm building the engineering system that lets one person build software with machines that can reason, act, test, remember and keep working, while keeping the human firmly responsible for what gets built.
