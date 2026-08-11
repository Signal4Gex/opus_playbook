import { SpecTemplate } from "../types";

export const TEMPLATES_DATA: SpecTemplate[] = [
  {
    id: "claude-md-lean",
    name: "Lean Power-User CLAUDE.md",
    filename: "CLAUDE.md",
    category: "Config",
    description: "Ultra-concise, high-yield persistent memory file optimized for Opus 5 (<120 lines). Zero bloat.",
    tags: ["CLAUDE.md", "Config", "Opus 5", "Best Practice"],
    content: `# Project Conventions & Guardrails

## Core Commands
- Build: \`npm run build\`
- Dev: \`npm run dev\`
- Test: \`npm test\`
- Lint: \`npm run lint\`

## Technology Stack
- React 19 / TypeScript / Vite / Tailwind CSS
- Express v4 / Node.js backend
- Framer Motion / Lucide Icons

## Code Architecture Rules
- Prefer functional components with explicit return types.
- Store shared interfaces in \`/src/types.ts\`.
- Keep components modular (<150 lines per file). Extract subcomponents early.
- Always handle loading, error, and empty state UI explicitly.

## Negative Constraints (NEVER DO)
- NEVER write mock function stubs, unrendered placeholder boxes, or silent onClick handlers.
- NEVER put secret keys in client-side code (use \`process.env\` in server routes).
- NEVER alter \`package.json\` dependencies without verification.

## Autonomous Verification
- Always execute \`npm run lint\` and verify build success before finalizing changes.
`
  },
  {
    id: "agents-md-multi",
    name: "AGENTS.md Multi-Agent Coordinator",
    filename: "AGENTS.md",
    category: "Config",
    description: "Defines subagent roles, delegation rules, and inter-agent communication channels for complex projects.",
    tags: ["AGENTS.md", "Subagents", "Orchestration"],
    content: `# Multi-Agent Delegation Guidelines

## Agent Hierarchy
1. **Lead Coordinator (Opus 5)**: Manages architectural decisions, user communication, and task decomposition.
2. **Subagent @code-reviewer**: Inspects git diffs for security, performance, and type safety.
3. **Subagent @explorer**: Searches codebase, scans server logs, and reads docs without polluting main context.
4. **Subagent @tester**: Runs test suites, analyzes stack traces, and proposes regression fixes.

## Delegation Rules
- When a search or log scan exceeds 3 files, spawn @explorer.
- Before committing any major refactor, request a pass from @code-reviewer.
- Return only synthesized summary reports (<20 lines) to the Lead Coordinator.
`
  },
  {
    id: "subagent-reviewer",
    name: "Subagent: Senior Security & Perf Reviewer",
    filename: ".claude/agents/reviewer.md",
    category: "Subagent",
    description: "Dedicated subagent config for running isolated code quality, type, and security audits.",
    tags: ["Subagent", "Code Review", "Security"],
    content: `---
name: code-reviewer
description: Senior Security, Performance, and Type Safety Auditor
tools: [view_file, list_dir, run_command]
model: claude-3-7-sonnet
---

You are a Senior Security and Performance Auditor.
Your job is to inspect file modifications and report defects before code is merged.

## Audit Checklist
1. **Security**: XSS vulnerabilities, unsanitized HTML, exposed secrets, SQL injection.
2. **Performance**: Unnecessary re-renders, missing memoization on expensive ops, unclosed event listeners.
3. **Type Safety**: Usage of \`any\` or missing type definitions.
4. **UX/UI**: Unhandled loading or error states.

Output Format: Return a markdown bulleted summary with file paths, line numbers, severity level (HIGH, MED, LOW), and suggested code fixes.
`
  },
  {
    id: "subagent-tester",
    name: "Subagent: Autonomous Test & Lint Runner",
    filename: ".claude/agents/tester.md",
    category: "Subagent",
    description: "Subagent specialized in executing tests, analyzing failure stack traces, and outputting clean fix diffs.",
    tags: ["Subagent", "Testing", "CI/CD"],
    content: `---
name: test-runner
description: Autonomous Test & Lint Runner
tools: [run_command, view_file, edit_file]
model: claude-3-5-sonnet
---

You are an Autonomous Test Runner and Fixer.
Execute the test suite (\`npm test\`) and linter (\`npm run lint\`).

If any tests fail:
1. Parse the error stack trace to locate the exact failing line.
2. View the source file and test file context.
3. Apply targeted minimal edits to fix the root cause.
4. Re-run tests until green.

Return a concise 3-line summary: Tests Executed, Tests Passed, Changes Applied.
`
  },
  {
    id: "spec-master-template",
    name: "Full Feature Spec Master Template",
    filename: "SPEC_FEATURE.md",
    category: "Master Spec",
    description: "Complete feature specification template with goal, schema, UI state, negative constraints, and test suite.",
    tags: ["Spec", "Feature Spec", "SDD"],
    content: `# SPEC: [Feature Title]

<metadata>
  <author>Power User</author>
  <target_model>Cloud Code Opus 5</target_model>
  <date>2026-08-10</date>
</metadata>

## 1. Executive Purpose
Brief 2-3 sentence overview of what this feature achieves and why.

## 2. Technical Architecture & Data Contract
- Data Interfaces / Types required:
- API Routes / Persistence layer:
- State Management flow:

## 3. UI/UX & Interactive Requirements
- Screen layout & responsive breakpoints:
- Interactive states: Loading, Error, Empty, Success.
- Animation & visual feedback details:

## 4. Negative Guardrails (Never Do)
- DO NOT introduce unrequested dependencies.
- DO NOT break existing CSS styling or global theme tokens.
- DO NOT write placeholder handlers or silent click callbacks.

## 5. Verification Commands
- \`npm run lint\`
- \`npm test\`
`
  },
  {
    id: "claude-ignore-saver",
    name: "Token-Saver .claudeignore",
    filename: ".claudeignore",
    category: "Context Saver",
    description: "Prevents Opus 5 from accidentally reading build artifacts, node_modules, or heavy lockfiles into context.",
    tags: ["Context", "Token Saver", "Config"],
    content: `# .claudeignore - Prevent Context Window Bloat
node_modules/
dist/
build/
.git/
package-lock.json
pnpm-lock.yaml
yarn.lock
*.log
*.svg
coverage/
.next/
tmp/
`
  }
];
