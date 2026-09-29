---
publishDate: 2026-09-29T00:00:00Z
title: I Stopped Writing Every Line of Code. Here's What I Do Instead.
excerpt: My laptop used to be my development environment. Now I'm building a small system of me, AI agents, tests, evals and persistent machines, and the hard part isn't getting an LLM to write code.
image: ~/assets/images/post-how-i-work.png
imageAlt: A terminal running Claude Code with failing evals beside a loop of define, agent, evals and review around a person
category: How I work
tags:
  - claude code
  - agentic reliability
  - evals
  - workflow
  - solopreneur
author: Dev guy
---

My laptop used to be my development environment.

Increasingly, I don't think it should be.

These days I can start Claude Code on a project, give it a task, and have it work for twenty minutes or longer while I make coffee, walk the dog, work on something else, or just step away.

So the interesting question is no longer how quickly I can type code. It's how much of the build, test, fix and ship cycle I can automate, and how I make that automation trustworthy enough to leave running while I'm not watching.

I'm still figuring a lot of it out, and some of what follows is settled practice while some of it is where I'm heading. I'll try to be clear about which is which.

## The shift

The short version: I have moved from being the person who writes every line of code to being the person who designs, directs, tests, constrains and improves a small software system. That system is made up of me, AI coding agents, tools, memory, automation and infrastructure.

<img src="/images/blog/north-star.png" alt="A north star above three agent runs: two passing checks and one failing run that gets caught and corrected" width="240" height="180" style="float:right;width:min(240px,45%);height:auto;margin:0.25rem 0 1rem 1.5rem;border-radius:12px" />

The question I care about isn't "how can AI write code faster?" It's a technical one, and it's about drift:

> How do I make sure every change an agent ships is checked against a regression suite and a set of evals, so the whole agentic system keeps steering at the same north star instead of wandering a little further off course with every run?

That difference shapes everything from this point on.

## The LLM is only one component

An LLM is a very capable reasoning engine. It can read code, infer intent, generate implementations, inspect failures, propose changes, call tools and iterate.

<img src="/images/blog/garbage.png" alt="Garbage in and garbage out through an LLM, compared with clean input producing usable output" width="200" height="150" style="float:left;width:min(200px,40%);height:auto;margin:0.25rem 1.5rem 1rem 0;border-radius:12px" />

But the oldest rule in programming still applies: garbage in, garbage out. An LLM doesn't repeal it, it amplifies it. A vague task, stale context or a missing constraint comes back as confident, well-formatted, plausible garbage, and because it reads so well it's harder to spot than a stack trace ever was. So I treat the model like a very fast, very literal function. What comes out is bounded by what goes in, and most of the rest of the system exists to control the input and check the output.

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

## My reliability loop: two clocks

There are really two loops running at different speeds.

The fast one lives inside a single task, and it's measured in minutes:

```text
Spec → Agent writes the tests first → Agent implements → Run tests
   → Agent reads the failure → Fix → Re-test → Review the diff → Commit
```

The slow one lives across the whole project, and it's measured in weeks:

```text
specification → tests → implementation → regression suite + evals
   → ship → production observation → back into the specification
```

The best practice I'm holding myself to on the slow loop is simple: expect regressions, don't hope to avoid them. Every change runs against the full regression suite and the eval cases, not just the tests for the code it touched. Every bug that escapes becomes a permanent test or eval, so that class of failure can't come back quietly.

That's what makes the loop compound. If an agent keeps making the same mistake, the fix belongs in the instructions, the constraints or the suite, not in yet another prompt. Regressions are a certainty. The only real question is whether my suite finds them before a user does.

## Tests aren't enough, so evals

An agent can write code that passes a narrow unit test while completely misunderstanding what the product was meant to do. That's why I'm increasingly interested in evals alongside ordinary tests:

- Given this request, does the agent produce the expected structured result?
- Does it call the right tool?
- Does it respect a boundary, and avoid an unsafe action?
- Does it recover from a failed tool call?
- Does it keep the architectural constraints intact?
- Does it interpret ambiguous input correctly?

What I want to test is the behaviour of the agent, its tools, its instructions and the application together, not just individual functions. This is the part of the work I find most interesting, and it's where I'm spending more of my time.

## Jev: typed judgments for deterministic code

Jev isn't something I invented. It comes from TypeSafe's System One models ([their introduction is worth reading](https://typesafe.ai/blog/introducing-system-one-models-and-jev)), and I use it as part of my stack alongside agentic AI.

The way it works is what I like. You hand it a state, either plain text or a JSON object of app state, and ask typed questions about it. A question is a yes/no, a pick-one from a fixed set of options, or a score on an ordered rubric. What comes back is calibrated probabilities. It's built for fast judgments where the possible answers are known in advance, and explicitly not for explanations.

That shape fits the rest of my thinking, because it turns messy natural-language situations into something ordinary software can branch on:

```text
real-world input → typed question (yes/no, choice, score)
   → calibrated probabilities → thresholds / rules → action → feedback
```

The interesting part is the boundary between probabilistic judgment and deterministic software. Instead of pretending an LLM should control everything, I let it produce numbers with known shapes, and conventional code decides what those numbers are allowed to do.

That boundary is a large part of what I mean by reliable agentic systems.

## Omarchy as the cockpit

On the local side I'm moving to **Omarchy**. Not because it's magically better than every other operating system, but because I want my machine to be a focused engineering cockpit: terminal, editor, browser, git, Claude Code, project docs, logs and a shell into wherever the work actually runs, all a keystroke away.

It's keyboard-driven and terminal-centric, which suits working with agents and dev tools. I want the computer to disappear. The interface should support the workflow, not become it.

## The work lives on a VPS

The other big idea is separating where I'm sitting from where the work is happening.

<img src="/images/blog/vps.png" alt="A laptop running Omarchy connecting over ssh to a remote VPS" width="340" height="255" style="float:right;width:min(340px,55%);height:auto;margin:0.25rem 0 1rem 1.5rem;border-radius:12px" />

A long-running agent shouldn't die because I close a laptop lid. So I use Omarchy to ssh into a Hetzner VPS, and that's where Claude Code runs, with the repositories and the long-running agents. I can start an agent on a well-specified task, disconnect, do something else, reconnect, check progress and carry on. The work persists independently of whatever device I happen to be holding.

My laptop is increasingly becoming a window into the system rather than the system itself.

### Narrowing the road to production

Working like this keeps shrinking the distance between "done" and "live". The code generally just works, because it's built on clear specs and the agent writes the tests as part of the job. With the spec, tests and evals all in place, the risk of breaking production is low, which means pushing straight to main can be a real option instead of a reckless one.

<img src="/images/blog/main.png" alt="A short-lived branch merging into main, gated by spec, tests and evals" width="180" height="135" style="float:left;width:min(180px,35%);height:auto;margin:0.25rem 1.5rem 1rem 0;border-radius:12px" />

That only holds while those pieces are doing their job. The day I skip the spec, or let the suite go stale, is the day pushing to main stops being safe. The speed comes from the safety net, so the net is the thing I have to maintain.

## Security is part of the workflow

Agents raise the stakes on security. An agent might have access to source code, environment variables, terminals, package managers, git, deployment tools, APIs, MCP servers and databases. A VPS full of long-running agents makes that question more pressing, not less.

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
- Pushing to main is only as safe as the spec, tests and evals behind it. Thin specs mean thin safety.
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

I've started calling the space I want to work in **agentic AI reliability engineering**. It isn't an established job title or an industry standard, just a name for the boundary I keep ending up at. On one side are LLM behaviour, structured outputs, tool use, memory and evaluation. On the other are architecture, testing, security, infrastructure, observability and failure modes. The question sitting between them is the one I want to spend my time on:

> How do you turn probabilistic intelligence into dependable software?

That's the workshop. I'm building the engineering system that lets one person build software with machines that can reason, act, test, remember and keep working, while keeping the human firmly responsible for what gets built.
