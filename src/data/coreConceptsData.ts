import { CoreConceptItem } from "../types";

export const CORE_CONCEPTS_DATA: CoreConceptItem[] = [
  {
    id: "architecture-purpose",
    title: "System Purpose & Agentic Architecture",
    subtitle: "Engineered specifically for high-autonomy, full-stack software development",
    iconName: "Cpu",
    summary: "Cloud Code Opus 5 is a state-of-the-art agentic AI framework powered by Anthropic's flagship model. It operates directly within Cloud Run containerized developer environments, executing commands, editing code, and verifying builds with human-level accuracy.",
    details: "Unlike traditional conversational code assistants that simply emit static code blocks, Cloud Code Opus 5 executes a full closed-loop development cycle. It parses workspace state, formulates execution plans, calls granular editing tools, and validates results using real terminal compilers and linter engines before presenting outcomes to the developer.",
    keyComponents: [
      {
        name: "Primary Agentic Orchestrator",
        description: "The core decision engine responsible for user intent detection, multi-step task breakdown, file inspection, and tool dispatching.",
        role: "Orchestration & Code Synthesis"
      },
      {
        name: "Deterministic Tool Execution Layer",
        description: "Provides granular API tools for read-modify-write file editing, shell command execution, directory traversal, and app compilation.",
        role: "Environment Interaction"
      },
      {
        name: "Autonomous Verification Engine",
        description: "Executes linting and compilation checks post-edit to catch syntax and import errors early before finalizing turns.",
        role: "Quality Assurance"
      }
    ],
    powerUserWorkflow: [
      "User states high-level technical requirement or bug report.",
      "Orchestrator parses repository state and inspects project files via view_file.",
      "Orchestrator formulates a precise, step-by-step implementation plan.",
      "Tool layer executes targeted file edits using read-modify-write patterns.",
      "Verification engine runs linter/compiler and automatically fixes any errors.",
      "Orchestrator delivers a concise, design-focused summary to the user."
    ],
    codeExample: {
      filename: "architecture-loop.ts",
      code: `// Conceptual representation of the Opus 5 Agentic Loop
async function agenticExecutionLoop(userTask: string) {
  // 1. Read context & CLAUDE.md guidelines
  const context = await loadWorkspaceContext();
  
  // 2. Formulate step-by-step implementation plan
  const plan = await orchestrator.plan(userTask, context);
  
  // 3. Execute surgical code changes
  for (const step of plan.steps) {
    await tools.editFile(step.targetFile, step.edits);
  }
  
  // 4. Closed-loop compilation verification
  const buildResult = await tools.compileApplet();
  if (!buildResult.success) {
    // 5. Automated self-correction (max 3 attempts)
    await orchestrator.fixBuildError(buildResult.errors);
  }
  
  return orchestrator.summarize();
}`
    }
  },
  {
    id: "dual-layer-memory",
    title: "Dual-Layer Memory System (CLAUDE.md)",
    subtitle: "Separating persistent workspace rules from transient conversation history",
    iconName: "Database",
    summary: "Cloud Code Opus 5 utilizes a dual-layer memory architecture: persistent instructions defined in CLAUDE.md or AGENTS.md, combined with dynamic session context.",
    details: "CLAUDE.md acts as the repository's immutable 'long-term memory'. It is automatically injected at the start of every session, instructing Opus 5 on architecture rules, stack conventions, forbidden patterns, and shell commands. Transient conversation context holds short-term chat turns and recent tool outputs, which can be compacted as needed.",
    keyComponents: [
      {
        name: "Long-Term Workspace Memory (CLAUDE.md)",
        description: "Root-level markdown file containing project rules, build commands, and coding conventions.",
        role: "Immutable Guidance"
      },
      {
        name: "Short-Term Session Context",
        description: "Active conversation history, recent file diffs, and terminal outputs.",
        role: "Transient State"
      },
      {
        name: "Memory Injection Pipeline",
        description: "Automatically loads CLAUDE.md instructions into the system prompt upon CLI initialization and after /clear.",
        role: "Context Initialization"
      }
    ],
    powerUserWorkflow: [
      "Define project stack and rules in CLAUDE.md using concise, imperative statements.",
      "Keep CLAUDE.md under 150-200 lines to ensure 100% rule adherence and avoid token bloat.",
      "Update CLAUDE.md when adding new framework conventions or environment variables.",
      "Use /memory reload in CLI to sync updated memory rules immediately."
    ],
    codeExample: {
      filename: "CLAUDE.md",
      code: `# CLAUDE.md - Project Guidelines
## Stack & Commands
- Framework: React 18 + Vite + Tailwind CSS
- Dev Server: npm run dev (Port 3000)
- Build Verification: npm run build
- Linting: npm run lint

## Architecture Rules
- Use TypeScript with strict interface declarations in src/types.ts.
- All icons MUST be imported from lucide-react.
- Never write inline styles or custom CSS files outside src/index.css.
- Always perform surgical edits using view_file before edit_file.`
    }
  },
  {
    id: "subagent-architecture",
    title: "Subagent Task Isolation (.claude/agents/)",
    subtitle: "Distributing specialized workloads to preserve primary context capacity",
    iconName: "Network",
    summary: "Subagents are isolated background worker instances defined in `.claude/agents/*.md`. They execute complex, token-heavy tasks in a separate context window and return only distilled final results.",
    details: "When performing deep security audits, running extensive test suites, or generating documentation, passing all raw files into the main chat window quickly consumes token capacity. Subagents solve this by running in a dedicated sandbox, protecting the main orchestrator's reasoning quality.",
    keyComponents: [
      {
        name: "Subagent Prompt Definition",
        description: "Markdown files in .claude/agents/ specifying custom roles, permissions, and tool access.",
        role: "Agent Persona Definition"
      },
      {
        name: "Isolated Execution Sandbox",
        description: "A separate context window spawned specifically for the subagent's task lifetime.",
        role: "Token Isolation"
      },
      {
        name: "Result Aggregation Layer",
        description: "Summarizes subagent outputs and passes clean, structured results back to the primary session.",
        role: "Output Distillation"
      }
    ],
    powerUserWorkflow: [
      "Create specialized subagents (e.g., @code-reviewer, @test-runner, @spec-writer).",
      "Invoke subagent using @subagent-name in CLI or slash menu.",
      "Subagent executes heavy analysis in background without cluttering main history.",
      "Main orchestrator receives distilled report and applies final code changes."
    ],
    codeExample: {
      filename: ".claude/agents/code-reviewer.md",
      code: `---
name: code-reviewer
description: Expert security and quality code audit subagent
tools: [view_file, run_command]
---
# Role: Code Review Specialist
You analyze uncommitted git changes and audit code for:
1. XSS and SQL injection vulnerabilities
2. Missing error handling in async functions
3. Unused variables and TypeScript type leaks

Return a concise report with severity level [CRITICAL | HIGH | MEDIUM | LOW].`
    }
  },
  {
    id: "context-compaction",
    title: "Proactive Context Management & Compaction",
    subtitle: "Maintaining maximum reasoning recall through dynamic token compaction",
    iconName: "Layers",
    summary: "Large context windows can suffer from reasoning degradation if filled with raw terminal outputs and stale file views. Opus 5 utilizes proactive token monitoring and checkpoint compaction.",
    details: "The /compact mechanism summarizes past conversation turns into a structured state checkpoint, releasing up to 70% of used tokens while preserving critical project state, active file modifications, and pending tasks.",
    keyComponents: [
      {
        name: "Token Saturation Gauge",
        description: "Monitors active token load and warns when approaching context limits.",
        role: "Telemetry"
      },
      {
        name: "Checkpoint Summarizer (/compact)",
        description: "Compresses verbose logs and tool outputs into high-density state representations.",
        role: "Context Pruning"
      },
      {
        name: "Selective Memory Retention",
        description: "Allows users to specify explicit variables, routes, or specs to preserve during compaction.",
        role: "State Pinning"
      }
    ],
    powerUserWorkflow: [
      "Monitor token usage using /cost or context estimators.",
      "At 40-50% context saturation, run /compact with target preservation instructions.",
      "Opus 5 generates a clean summary checkpoint and clears raw log noise.",
      "Continue development with fresh token capacity and zero loss of project state."
    ],
    codeExample: {
      filename: "compaction-example.sh",
      code: `# Example of executing target-focused compaction in Cloud Code CLI
/compact Preserve database schema in src/db/schema.ts, active Express routes in server.ts, and pending auth refactor.`
    }
  }
];
