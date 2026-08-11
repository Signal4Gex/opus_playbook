import { BestPracticeItem } from "../types";

export const BEST_PRACTICES_DATA: BestPracticeItem[] = [
  {
    id: "bp-lean-claude-md",
    title: "The 150-Line Rule for CLAUDE.md Memory",
    category: "Memory & Context",
    impact: "Critical",
    summary: "Keep workspace CLAUDE.md instructions under 150-200 lines to guarantee 100% rule adherence and prevent model attention fragmentation.",
    problemStatement: "When CLAUDE.md grows beyond 300 lines, AI models experience 'attention dilution'. They begin ignoring critical constraints like linting rules, naming conventions, and port bindings.",
    recommendedSolution: "Focus CLAUDE.md exclusively on global imperatives (build commands, architecture rules, forbidden patterns). Move domain-specific documentation (e.g., API schemas, component guidelines) into dedicated `.claude/agents/` subagent files.",
    codeOrPromptExample: `# Good: Concise, imperative CLAUDE.md (<150 lines)
## Build & Dev Commands
- Dev Server: npm run dev (Port 3000)
- Lint Check: npm run lint
- Build Verification: npm run build

## Non-Negotiable Rules
- Always run view_file on target lines before edit_file.
- Import all icons strictly from lucide-react.
- Keep components modular in src/components/*.tsx.
- Never write inline styles; use Tailwind utility classes.`,
    stepByStepAction: [
      "Audit your existing CLAUDE.md using /doctor command.",
      "Remove redundant wordy explanations and convert paragraphs into concise bullet points.",
      "Extract domain-specific guides into .claude/agents/*.md files.",
      "Verify line count stays below 150 lines."
    ]
  },
  {
    id: "bp-surgical-editing",
    title: "Surgical Read-Modify-Write Code Operations",
    category: "Tooling & Verification",
    impact: "High Impact",
    summary: "Never replace entire file contents. Always view exact target lines first, then apply contiguous surgical edits.",
    problemStatement: "Overwriting full 300+ line component files causes token exhaustion, mid-file code truncation, lost imports, and broken syntax.",
    recommendedSolution: "Enforce a strict 3-step surgical edit workflow: 1) view_file to locate target line range, 2) edit_file matching exact contiguous target content, 3) compile_applet to verify syntax.",
    codeOrPromptExample: `// Step 1: Read target lines first
view_file(AbsolutePath: "/src/components/Header.tsx", StartLine: 20, EndLine: 35)

// Step 2: Apply exact contiguous replacement
edit_file(
  TargetFile: "/src/components/Header.tsx",
  TargetContent: "const title = 'Old Title';",
  ReplacementContent: "const title = 'New Opus 5 Title';"
)`,
    stepByStepAction: [
      "Always inspect existing file contents with view_file before editing.",
      "Target small, contiguous blocks of 5-20 lines rather than entire functions.",
      "Verify line numbers immediately prior to issuing edit_file calls.",
      "Run lint_applet after each edit batch to catch typos instantly."
    ]
  },
  {
    id: "bp-subagent-delegation",
    title: "Subagent Task Isolation Pattern",
    category: "Subagent Delegation",
    impact: "High Impact",
    summary: "Offload token-heavy tasks (security audits, test suite generation, doc parsing) to isolated background subagents.",
    problemStatement: "Running comprehensive test suites or multi-file code reviews directly in the primary conversation floods the context window with raw log outputs, quickly degrading reasoning ability.",
    recommendedSolution: "Create specialized subagents in `.claude/agents/` (e.g., `@code-reviewer`, `@test-runner`). Invoke them via `@subagent-name` so raw logs remain isolated in a temporary subagent sandbox.",
    codeOrPromptExample: `# In terminal CLI:
@code-reviewer Audit src/server.ts for route injection and unhandled promises.

# Output returned to main window:
"Audit Complete: Found 1 HIGH vulnerability in /api/users route (missing input validation). Suggested fix applied."`,
    stepByStepAction: [
      "Identify repetitive or log-heavy tasks in your workflow.",
      "Create a markdown file in .claude/agents/ with role instructions and restricted tool permissions.",
      "Invoke the subagent using @subagent-name in your prompt or slash menu.",
      "Receive clean, actionable summaries without polluting your main context window."
    ]
  },
  {
    id: "bp-spec-first",
    title: "Spec-First Engineering & Scope Boundary Control",
    category: "Prompt Spec Engineering",
    impact: "Critical",
    summary: "Outline a 3-bullet design spec before writing code to prevent scope creep, unsolicited UI tabs, and unnecessary architectural complexity.",
    problemStatement: "Vague prompts like 'add user profile feature' cause AI agents to invent complex backend modules, unsolicited tabs, and unwanted external dependencies.",
    recommendedSolution: "Formulate concise, explicit implementation specs outlining exactly what to build, what visual layout to use, and what NOT to build.",
    codeOrPromptExample: `// High-Impact Spec Prompt
"Add user profile modal to Header.tsx following these boundaries:
1. Trigger: Clicking avatar button opens a clean Tailwind dialog.
2. Content: Show user name, email, and sign-out button.
3. Boundaries: Do NOT add new routing pages, backend APIs, or external auth SDKs."`,
    stepByStepAction: [
      "State the primary user functional goal clearly.",
      "List 2-3 explicit layout and visual constraints.",
      "Explicitly mention forbidden items (e.g. 'Do NOT add backend database or navigation sidebars').",
      "Execute implementation only after spec boundaries are clear."
    ]
  },
  {
    id: "bp-proactive-compaction",
    title: "Checkpoint Compaction at Milestone Transitions",
    category: "Workflow Speed",
    impact: "Pro Tip",
    summary: "Execute `/compact` with target state retention instructions immediately after completing major feature milestones.",
    problemStatement: "As conversation length increases, older turns dilute model attention, leading to repeated mistakes or regression of previously fixed code.",
    recommendedSolution: "Use `/compact` proactively at 40-50% context window saturation. Provide target instructions to explicitly pin active routes, schema types, and pending tasks in memory.",
    codeOrPromptExample: `/compact Preserve database schema in src/db/schema.ts, active auth routes in server.ts, and current bug fix status.`,
    stepByStepAction: [
      "Monitor token usage with /cost or context estimators.",
      "Upon reaching a major task milestone, trigger /compact in the CLI slash menu.",
      "Include key file paths and data structures in the compaction prompt.",
      "Verify fresh token capacity before embarking on the next feature."
    ]
  },
  {
    id: "bp-closed-loop-verification",
    title: "Closed-Loop Compilation & Linting Verification",
    category: "Tooling & Verification",
    impact: "Critical",
    summary: "Validate every code modification using automated compilation and linting tools before presenting completion summaries.",
    problemStatement: "Unverified code modifications often contain missing imports, syntax typos, or invalid types that break the user's live preview.",
    recommendedSolution: "Always end editing sequences with compile_applet or lint_applet checks. If build errors occur, apply targeted fixes iteratively up to 3 times.",
    codeOrPromptExample: `// Verification sequence
1. edit_file(...)
2. lint_applet() -> Detects missing import 'LucideIcon'
3. edit_file(...) -> Adds missing import
4. compile_applet() -> Build succeeded!
5. Present completion summary to user.`,
    stepByStepAction: [
      "Never complete a coding turn without running lint_applet or compile_applet.",
      "If build errors occur, read error output carefully to locate the exact file and line number.",
      "Apply surgical fix using edit_file and re-verify.",
      "Only present summary once compilation builds cleanly."
    ]
  }
];
