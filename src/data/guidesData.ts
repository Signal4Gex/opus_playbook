import { GuideArticle } from "../types";

export const GUIDES_DATA: GuideArticle[] = [
  {
    id: "opus5-paradigm",
    title: "The Opus Five Paradigm Shift: Less Prompting, More Reasoning",
    subtitle: "Why 80% prompt reduction unlocks state-of-the-art coding autonomy in Opus 5",
    category: "Core Philosophy",
    readTime: "5 min read",
    badge: "Essential Concept",
    summary: "Unlike earlier models that required 100-page step-by-step procedural system prompts, Opus 5 is highly autonomous. Overconstraining it degrades its reasoning. Learn how declarative intent beats procedural micromanagement.",
    sections: [
      {
        heading: "1. The Overconstraining Trap in Next-Gen Models",
        content: "Anthropic's internal engineering benchmarks revealed a surprising discovery during the development of Opus 5: removing over 80% of system prompt instructions from legacy Claude Code templates actually INCREASED coding benchmark accuracy and code quality! When given rigid step-by-step instructions (e.g. 'First open file X, then check line 40, then write a function called Y'), Opus 5 is forced to follow a mechanical path rather than using its advanced intrinsic reasoning to discover optimal architectural solutions.",
        callout: {
          type: "insight",
          text: "Opus 5 thinks in architectural graphs. Give it the target outcome, boundary guardrails, and verification tools — then get out of its way."
        }
      },
      {
        heading: "2. Declarative vs. Procedural Spec Engineering",
        content: "Compare procedural prompts (how to write code) against declarative specs (what the result must satisfy). Declarative specs define inputs, outputs, invariant constraints, and test suites.",
        beforeAfter: {
          badTitle: "❌ Legacy Micromanaging Prompt (Procedural)",
          badCode: `Step 1: Open src/components/UserList.tsx
Step 2: Add a state called searchFilter using useState("")
Step 3: Add an input tag with onChange that updates searchFilter
Step 4: Filter the users array using users.filter(u => u.name.includes(searchFilter))
Step 5: Make sure to check if user.name is null first.`,
          badReason: "Restricts model autonomy, misses edge cases (e.g., case sensitivity, debouncing, accessible aria labels), and bloats token usage.",
          goodTitle: "⚡ Power-User Opus 5 Spec (Declarative)",
          goodCode: `<feature_spec>
  <goal>Add real-time client-side user filtering to UserList</goal>
  <requirements>
    - Case-insensitive search matching name and email fields
    - Instant responsive filtering with 150ms debounce
    - Accessible search input with clear button and zero-state placeholder
  </requirements>

  <verification>
    - Run \`npm test -- UserList.test.tsx\` to ensure all unit tests pass
  </verification>
</feature_spec>`,
          goodReason: "Gives Opus 5 clear goals and test criteria. Allows the model to implement clean hooks, debouncing, and aria attributes autonomously."
        }
      },
      {
        heading: "3. The 4-Step Agentic Loop in Cloud Code",
        content: "Opus 5 operates in a closed loop: Intent -> Read Context -> Plan & Tool Actions -> Self-Verification. If you give it execution verification commands (e.g. `npm test`, `tsc --noEmit`), Opus 5 will run the command, read the output logs, self-correct any errors, and re-run until all tests pass before completing.",
        callout: {
          type: "rule",
          text: "Rule of Thumb: Always include a <verification> block in your master prompts. If Opus 5 can run a linter or test suite, its success rate jumps from ~72% to >98%."
        }
      }
    ]
  },
  {
    id: "context-memory-architecture",
    title: "Context Engineering & Memory Architecture",
    subtitle: "Mastering CLAUDE.md, MEMORY.md, XML blocks, and token saturation limits",
    category: "Context & Memory",
    readTime: "7 min read",
    badge: "Memory Masterclass",
    summary: "Context window management is the single biggest factor determining model performance. Learn how to structure CLAUDE.md, leverage XML tagging, and execute clean token compaction.",
    sections: [
      {
        heading: "1. The Anatomy of CLAUDE.md",
        content: "CLAUDE.md is automatically injected into the system prompt at the start of every Cloud Code session. It acts as persistent memory. Keep it under 150-200 lines to preserve attention head bandwidth for project code.",
        codeSnippet: {
          language: "markdown",
          title: "Production CLAUDE.md Template",
          code: `# Project Conventions & Guardrails

## Commands
- Build: \`npm run build\`
- Test: \`npm test\`
- Lint: \`npm run lint\`

## Code Style & Architecture
- React 19 + TypeScript + Tailwind CSS.
- Functional components, explicit return types.
- State management: React Context or Zustand for global; useState for local.

## Guardrails (Never Do)
- NEVER modify \`package.json\` scripts without explicit confirmation.
- NEVER leave unrendered placeholder cards or empty mock handlers.
- NEVER use \`any\` type — strictly type all API payloads.`
        }
      },
      {
        heading: "2. The XML Block Boundary Technique",
        content: "Claude 5 family models pay extreme attention to XML tags. Use tags like `<context>`, `<specs>`, `<constraints>`, `<existing_code>`, and `<verification>` to segment your prompts. This prevents context bleed where constraints get mixed up with task goals.",
        callout: {
          type: "tip",
          text: "XML tags create hard boundaries in the model's attention matrix, ensuring instructions aren't diluted by long code snippets."
        }
      },
      {
        heading: "3. Auto-Compaction & Memory Preservation (/compact)",
        content: "When a conversation exceeds 40-50% of the context window (~100k tokens), raw tool call responses (directory trees, large file outputs) accumulate bloat. Execute `/compact` to generate a compressed checkpoint summary while preserving active memory tags in `MEMORY.md`."
      }
    ]
  },
  {
    id: "subagent-orchestration",
    title: "Subagent Delegation: Isolated Multi-Agent Architecture",
    subtitle: "How to offload heavy searches, log audits, and code reviews into isolated context windows",
    category: "Subagents",
    readTime: "6 min read",
    badge: "Advanced Strategy",
    summary: "Subagents run in separate, isolated context windows with custom system prompts and tools. Learn how to construct subagents in `.claude/agents/*.md` to run parallel tasks without blowing your primary context budget.",
    sections: [
      {
        heading: "1. Why Subagents are Essential for Large Codebases",
        content: "If your main agent searches through 50 files or scans a 10,000-line server log, those raw tokens clog the main context window forever. By delegating the search to a subagent, the subagent performs the exploration in a throwaway context and returns ONLY a 5-line summary artifact to your main coordinator agent.",
        codeSnippet: {
          language: "markdown",
          title: ".claude/agents/reviewer.md",
          code: `---
name: code-reviewer
description: Specialized security and performance code reviewer
tools: [view_file, list_dir, run_command]
model: claude-3-7-sonnet
---

You are a ruthless Senior Code Reviewer.
Inspect candidate PR diffs or modified files for:
1. Security vulnerabilities (injection, hardcoded secrets).
2. React infinite re-render loops or stale closure dependencies.
3. Memory leaks and improper unmount cleanup.

Return a concise bulleted audit report with line numbers and proposed fixes.`
        }
      },
      {
        heading: "2. The Primary Coordinator & Worker Pattern",
        content: "Your main session acts as the Lead Architect. When a task requires deep investigation, the Lead spawns a subagent using slash command or natural language delegation: 'Spawn @code-reviewer to audit src/api/auth.ts before proceeding.'",
        callout: {
          type: "insight",
          text: "Subagents can use different model tiers! Use lighter, faster models for file searching and Opus 5 for high-level architectural decision making."
        }
      }
    ]
  },
  {
    id: "spec-driven-development",
    title: "Spec-Driven Development (SDD): Writing Spec Specs",
    subtitle: "Transforming vague requirements into bulletproof autonomous execution specifications",
    category: "Spec Engineering",
    readTime: "8 min read",
    badge: "Power Blueprint",
    summary: "The secret of 10x power users is never prompting in ad-hoc chat snippets. Instead, write structured SPEC.md specs with clear acceptance criteria, edge cases, and boundary guardrails.",
    sections: [
      {
        heading: "1. The 5 Elements of a Power-User Spec",
        content: "Every production spec should contain: 1) Executive Purpose, 2) Data Contract & Schema, 3) User Experience & Interaction States, 4) Explicit Negative Guardrails ('Never Do'), and 5) Test Suite Commands.",
        codeSnippet: {
          language: "markdown",
          title: "SPEC_FEATURE_AUTH.md",
          code: `# SPEC: OAuth2 PKCE Authentication Flow

## 1. Goal
Implement secure OAuth2 login using PKCE flow for mobile and desktop clients.

## 2. Technical Invariants
- Access tokens MUST be stored in httpOnly, Secure, SameSite=Strict cookies.
- Refresh token rotation MUST invalidate previous tokens upon reuse.

## 3. UI/UX Requirements
- Display a smooth loading spinner during token exchange.
- Show user avatar and dropdown menu when authenticated.

## 4. Negative Guardrails
- NEVER store access tokens in localStorage or sessionStorage.
- NEVER expose raw secret keys in client bundle.

## 5. Verification Commands
- \`npm run test:auth\`
- \`npm run lint\``
        }
      },
      {
        heading: "2. The Spec Refinement Loop",
        content: "Before asking Opus 5 to implement a complex feature, run a Spec Refinement step: 'Review SPEC_FEATURE_AUTH.md. Identify missing edge cases, security loopholes, or missing files before writing any code.' This 30-second review step prevents hours of refactoring."
      }
    ]
  },
  {
    id: "slash-commands-matrix",
    title: "Cloud Code Terminal Mastery & Slash Commands",
    subtitle: "Command-line switches, environment configurations, and keyboard shortcuts",
    category: "Slash Commands",
    readTime: "4 min read",
    badge: "Terminal Power",
    summary: "A complete walkthrough of builtin Cloud Code slash commands, environment flags, system diagnostics, and custom command aliases.",
    sections: [
      {
        heading: "1. Core Slash Commands Cheat Sheet",
        content: "Use these terminal commands during your active Cloud Code session to keep context crisp and debug issues rapidly:",
        codeSnippet: {
          language: "bash",
          title: "Terminal Slash Commands",
          code: `/doctor        # Diagnostics check for CLAUDE.md, subagents, and memory fit
/compact       # Compress message history into checkpoint summary
/clear         # Reset context completely (ideal when starting a fresh task)
/review        # Trigger automated subagent review of active git changes
/bug           # Generate bug report with environment context and recent logs`
        }
      },
      {
        heading: "2. Environment Flags & Custom Command Aliases",
        content: "Configure `.claude/config.json` or system env vars to tune model parameters, disable unneeded tool watching, or enable local model routing.",
        callout: {
          type: "tip",
          text: "Run `claude doctor` inside any workspace to get instant AI recommendations on rightsizing your CLAUDE.md file!"
        }
      }
    ]
  }
];
