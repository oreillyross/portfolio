---
publishDate: 2026-10-05T00:00:00Z
title: The IDE Is Becoming a Control Room
excerpt: The new IDEs aren't editors with smarter autocomplete. They're agent workbenches, and the centre of gravity is moving from the editor canvas to the repository, the shell and the evidence an agent leaves behind.
image: ~/assets/images/post-agentic-ides.png
imageAlt: A lime moon over layered mountains and pine trees, with a thin ground line marking the one place a human still steps in
category: Moonshot briefing
tags:
  - agentic ides
  - claude code
  - codex
  - workflow
  - verification
author: Ross O'Reilly
---

_Moonshot briefing · October 2026_

The "new IDEs" are not really editors with smarter autocomplete. They are agent workbenches: a place to specify intent, launch coding workers, inspect diffs, run verification, and merge trustworthy results.

The themes: CLI-native, multi-agent, cloud delegation, human verification, and MCP, skills and hooks.

## The short thesis

> **CLIs are not making IDEs obsolete.** They are pulling the centre of gravity away from the editor canvas and toward the repository, shell, Git, CI, and agent runtime. The future is a layered workflow: a lightweight visual cockpit plus terminal-native agents plus cloud workers for asynchronous tasks.
>
> For my spec-driven, Linux/WSL-oriented workflow, the most durable mental model is: **write the contract, delegate execution, inspect evidence, own the decision.**

## Landscape map

<img src="/images/blog/sprig.svg" alt="A sprig of lime and blue leaves beside a small sun" width="240" height="180" style="float:right;width:min(240px,45%);height:auto;margin:0.25rem 0 1rem 1.5rem;border-radius:12px" />

### Terminal-native agents

Claude Code, Codex CLI, Amp, Gemini CLI, Aider, OpenCode. Best when the repository, shell, tests and Git are the primary interface. A strong fit for multi-file changes, debugging and automation.

### Agentic editors

Cursor, Windsurf, VS Code agent mode, JetBrains Junie. Best when you want visual navigation, inline diffs, diagnostics and an agent in the same workspace.

### Control planes

T3 Code and similar multi-harness surfaces. Not necessarily an agent or model. The value is switching agents, isolating threads, reviewing diffs and managing delivery.

### Cloud engineering agents

Codex Cloud, Cursor Cloud Agents, Devin-style delegation and platform-native agents. Best for handing off an issue, migration or review while you work elsewhere, and returning to a branch, PR and evidence.

## What makes these tools different?

| Tool / family                    | Primary surface                    | Agent shape                                                                            | Where it shines                                                         | Watch-outs                                                                    |
| -------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Claude Code**                  | Terminal, IDE, desktop, web        | Repository agent with tools, skills, hooks, MCP and subagents                          | Deep repo work, refactors, tests, long-running terminal workflows       | Power requires disciplined permissions, context files and review              |
| **Codex**                        | CLI, IDE, web/cloud, ChatGPT       | Local agent plus isolated cloud tasks and parallel workers                             | Delegating work, review, cloud execution and cross-device continuity    | Local and cloud modes have different trust, access and cost characteristics   |
| **Amp**                          | Terminal, IDE, CI/CD               | CLI-first agent with Sourcegraph code intelligence and specialised agents              | Large codebases, code search, command-line workflows and model routing  | Commercial service and vendor-managed orchestration; evaluate data boundaries |
| **T3 Code**                      | Web / desktop control plane        | Orchestrates other installed CLIs such as Claude Code, Codex, Antigravity and OpenCode | One cockpit for multiple harnesses, branches, diffs and PR delivery     | A coordination layer, not a magic new model; complexity can move upward       |
| **Cursor**                       | AI-native editor plus cloud agents | Foreground editor agent and isolated asynchronous cloud workers                        | Fast visual iteration, parallel agents, screenshots, demos and PRs      | Editor/cloud coupling; inspect repository and privacy settings carefully      |
| **Windsurf**                     | Agentic editor                     | Cascade with planning, terminal, MCP, checkpoints and real-time context                | Integrated "stay in the editor" agent loop and recoverable edits        | More opinionated workspace; portability depends on your underlying workflow   |
| **VS Code / JetBrains + agents** | Conventional IDE with agent mode   | Editor-resident agent using files, terminal, diagnostics and extensions                | Debugging, language tooling, visual inspection and team standardisation | Can become a thin chat sidebar unless the agent has real execution authority  |
| **Open / BYOK tools**            | Terminal or editor                 | Aider, OpenCode, Cline, Roo and similar configurable harnesses                         | Model choice, local control, experimentation and lower vendor lock-in   | You own more setup, security policy, model selection and reliability work     |

This is a workflow comparison, not a ranking. Feature availability and pricing change quickly, so verify current terms before adopting a tool.

## The emerging stack

Three layers, left to right.

**1. Intent layer.** Specs, issues, acceptance criteria, architecture decisions, security constraints and project instructions. Think `AGENTS.md`, `CLAUDE.md`, issue templates and evals.

**2. Execution layer.** CLI agents and local IDE agents read, edit, run commands, call tools, create worktrees and iterate against tests. Claude Code, Codex CLI, Amp, Cursor, OpenCode.

**3. Delivery layer.** Cloud agents, CI, PR review, deployment checks, observability and audit trails determine whether output is trusted. Branches, evidence, evals, approvals, rollback.

### The unit of work is changing

- **Old unit:** "a file or function I am editing."
- **New unit:** "a bounded change with a contract, an isolated workspace, an agent run, verification evidence and a reviewable patch."

## Where the industry is headed

- **From completion to delegation.** Autocomplete remains useful, but differentiation moves to agents that can plan, execute, test and recover across a repository.
- **From one agent to fleets.** Parallel workers will handle tests, documentation, code search, implementation and review in isolated worktrees. The bottleneck becomes coordination and verification.
- **From prompt skill to context engineering.** Persistent instructions, repository maps, MCP tools, skills and event hooks become the operating system around the model.
- **From local session to agent surface.** The same run will be steerable from terminal, editor, browser, mobile, Slack, GitHub or CI. Surface matters less than state, permissions and evidence.
- **From code generation to software operations.** Agents will increasingly touch issue trackers, cloud consoles, deployment pipelines, logs and customer-support signals, not just source files.
- **Verification becomes the moat.** Tests, type checks, security scans, evals, visual evidence, review agents and provenance will separate useful autonomy from expensive chaos.

## What "IDE" may mean next

The editor does not disappear; its role changes. It becomes a visual inspection and intervention surface rather than the only place where programming happens.

| Activity                     | Likely best surface                      | Why                                                                         |
| ---------------------------- | ---------------------------------------- | --------------------------------------------------------------------------- |
| Understand a new repository  | CLI agent + code intelligence            | Fast search, broad context and scripted exploration                         |
| Shape a feature contract     | Editor, docs, issue tracker or chat      | Humans need clarity before execution                                        |
| Delegate a bounded refactor  | CLI or cloud agent                       | Multi-file work can run independently and produce a patch                   |
| Inspect a risky diff         | IDE, code review UI and security tooling | Visual navigation and precise intervention still matter                     |
| Run repetitive maintenance   | CI, scheduled agent or API               | Repeatability beats an interactive session                                  |
| Make architectural decisions | Human-led discussion with agent analysis | Trade-offs, product intent and risk ownership remain human responsibilities |

## A practical moonshot workflow

1. **Specify:** write a short contract with non-goals, interfaces, acceptance tests and security constraints.
2. **Prepare:** give the repository durable instructions, commands, architecture notes and a safe tool policy.
3. **Delegate:** send bounded tasks to one or more agents in isolated worktrees.
4. **Verify:** require tests, lint, type checks, security checks and a concise evidence report.
5. **Review:** inspect the design and risk-bearing lines, not every generated line equally.
6. **Integrate:** merge through normal Git and CI gates; retain rollback and provenance.

> **For my own setup:** keep Claude Code as the primary terminal workflow in Ubuntu/WSL, trial Codex as a second harness, and use T3 Code only if multi-agent switching and remote control solve a real friction point. Keep VS Code or another editor as the visual review and debugging cockpit rather than treating it as the centre of all development.

## The strategic risk

The danger is not that agents write imperfect code. It is that teams accept a higher throughput of changes than their ability to understand, test, secure and operate those changes. Agentic development therefore rewards engineers who become better at boundaries, evaluation, system design and review, not engineers who abandon code literacy.

---

_Sources consulted: [T3 Code](https://t3.codes/) · [Claude Code documentation](https://code.claude.com/docs/en/) · [Codex CLI documentation](https://developers.openai.com/codex/cli.md/) · [Amp CLI guide](https://github.com/sourcegraph/amp-examples-and-guides/blob/main/guides/cli/README.md) · [Cursor Cloud Agents](https://cursor.com/help/ai-features/background-agents) · [Windsurf Cascade](https://docs.windsurf.com/pt-BR/windsurf/cascade/cascade)._

_Prepared as a forward-looking synthesis. Product capabilities, names and availability are moving targets._
