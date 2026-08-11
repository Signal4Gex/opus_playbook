import { SlashCommandItem } from "../types";

export const SLASH_COMMANDS_DATA: SlashCommandItem[] = [
  {
    command: "/compact",
    menuLabel: "Compact Context Window",
    category: "Context",
    description: "Summarizes the active conversation history and compresses raw tool outputs into a lightweight checkpoint summary to free up context tokens.",
    usage: "/compact [optional target instructions]",
    whenToUse: "When token usage reaches 40-50% or after completing a major task milestone (e.g. finishing a complex database refactor).",
    powerTip: "Always append target instructions so Opus 5 knows exactly what state and data structures to retain in memory.",
    example: "/compact Preserve the database schema in src/db/schema.ts, active API routes, and the current task list."
  },
  {
    command: "/clear",
    menuLabel: "Clear Session State",
    category: "Context",
    description: "Completely resets the active context window, clearing past conversation history while reloading workspace CLAUDE.md instructions.",
    usage: "/clear",
    whenToUse: "When switching to an entirely different module or task (e.g., from fixing backend API routes to designing a frontend component).",
    powerTip: "Prevents context contamination and ensures Opus 5 starts fresh without lingering code snippets from prior unrelated tasks.",
    example: "/clear"
  },
  {
    command: "/doctor",
    menuLabel: "Run Health Doctor",
    category: "System",
    description: "Runs an instant health diagnostic on CLAUDE.md guidelines, subagent configuration files, token budget, and workspace environment.",
    usage: "/doctor",
    whenToUse: "Whenever Opus 5 appears sluggish, skips project guidelines, or when starting a new major feature session.",
    powerTip: "Checks if CLAUDE.md exceeds the recommended 150-200 line threshold and alerts you to conflicting rule definitions.",
    example: "/doctor"
  },
  {
    command: "/context",
    menuLabel: "Context Window Inspector",
    category: "Context",
    description: "Generates a detailed breakdown of all files, directory listings, subagent logs, and system prompts currently loaded in the active context window.",
    usage: "/context",
    whenToUse: "When you want to see why the token count is high or check if large generated files are bloating the session.",
    powerTip: "Use this to identify large test outputs or lock files that should be excluded via .claudeignore.",
    example: "/context"
  },
  {
    command: "/review",
    menuLabel: "Review Git Diffs",
    category: "Debugging",
    description: "Spawns an isolated subagent session to audit uncommitted git changes or specific commits against security, type safety, and linting rules.",
    usage: "/review [optional path or commit]",
    whenToUse: "Before committing code or submitting a pull request to catch edge cases and security vulnerabilities.",
    powerTip: "Does not contaminate your main chat context window because the review logic executes inside a temporary subagent sandbox.",
    example: "/review src/components/SpecArchitectView.tsx"
  },
  {
    command: "/bug",
    menuLabel: "File Bug / Diagnosis Session",
    category: "Debugging",
    description: "Captures recent terminal outputs, system configuration, modified files, and stack traces into a structured bug diagnostic report.",
    usage: "/bug [issue description]",
    whenToUse: "When an unexpected error occurs during dev server startup or build execution.",
    powerTip: "Automatically packages relevant stack traces so you don't have to manually copy-paste long terminal logs.",
    example: "/bug React component re-rendering endlessly when switching tabs in mobile view"
  },
  {
    command: "/init",
    menuLabel: "Initialize Workspace Memory (CLAUDE.md)",
    category: "System",
    description: "Scans project build files, package.json, and directory structure to generate a lean, project-tailored CLAUDE.md memory file.",
    usage: "/init",
    whenToUse: "When opening a new project repository that lacks a CLAUDE.md file.",
    powerTip: "Run /init on fresh repos, then edit the generated file to enforce your team's exact coding conventions.",
    example: "/init"
  },
  {
    command: "/cost",
    menuLabel: "Show Token Usage & Cost",
    category: "System",
    description: "Displays live statistics on input tokens, output tokens, total cost for the current session, and remaining context capacity.",
    usage: "/cost",
    whenToUse: "To track model resource consumption during long agentic coding sessions.",
    powerTip: "Use in combination with /compact to monitor how much token capacity is reclaimed after context compression.",
    example: "/cost"
  },
  {
    command: "/config",
    menuLabel: "CLI Configuration Settings",
    category: "Configuration",
    description: "Views or updates Cloud Code CLI configuration parameters such as default model selection, permission auto-approval, and theme.",
    usage: "/config [setting_name] [value]",
    whenToUse: "To adjust global CLI preferences or toggle tool execution permission prompts.",
    powerTip: "Set auto-approval for safe, non-destructive commands like linting and reading files to speed up workflow execution.",
    example: "/config theme dark"
  },
  {
    command: "/pr",
    menuLabel: "Draft Pull Request",
    category: "Git & PRs",
    description: "Analyzes git commits and branch diffs to generate a polished, structured Pull Request title, summary, and changelog.",
    usage: "/pr [optional base_branch]",
    whenToUse: "When feature implementation is complete and ready for code review submission.",
    powerTip: "Generates Markdown formatted PR descriptions including testing steps, breaking changes, and component summaries.",
    example: "/pr main"
  },
  {
    command: "/test",
    menuLabel: "Run Test Suite & Auto-Fix",
    category: "Workflow",
    description: "Executes project test scripts and automatically parses failure outputs to apply targeted code fixes.",
    usage: "/test [optional test_path_or_pattern]",
    whenToUse: "To verify feature implementations or fix failing unit and integration tests.",
    powerTip: "Pass a specific test file path to narrow down execution and conserve context tokens.",
    example: "/test src/__tests__/auth.test.ts"
  },
  {
    command: "@subagent",
    menuLabel: "Spawn Specialized Subagent",
    category: "Subagents",
    description: "Directly invokes a custom subagent defined in `.claude/agents/*.md` to run isolated tasks in a dedicated context window.",
    usage: "@[subagent_name] [task prompt]",
    whenToUse: "For heavy background operations like generating test suites, performing deep security audits, or drafting documentation.",
    powerTip: "Subagents return only their final output to the main conversation, keeping your primary context window clean.",
    example: "@code-reviewer audit all Express route handlers in server.ts for parameter injection vulnerabilities"
  },
  {
    command: "/memory",
    menuLabel: "Inspect Memory Banks",
    category: "System",
    description: "Lists all actively loaded memory files (CLAUDE.md, AGENTS.md, subagent rules) and displays rule precedence.",
    usage: "/memory [list|view|reload]",
    whenToUse: "To verify which memory guidelines are currently active in the model's instructions.",
    powerTip: "Use `/memory reload` after modifying CLAUDE.md manually to force an instant memory refresh without clearing history.",
    example: "/memory reload"
  },
  {
    command: "/terminal-setup",
    menuLabel: "Configure Terminal Integration",
    category: "Configuration",
    description: "Installs shell autocomplete scripts, keybindings, and quick CLI launch aliases for Zsh, Bash, or Fish shells.",
    usage: "/terminal-setup",
    whenToUse: "On initial setup to enable tab-autocompletion for slash commands in your OS terminal.",
    powerTip: "Enables instant command completion when pressing Tab after typing `/` in the terminal.",
    example: "/terminal-setup"
  },
  {
    command: "/help",
    menuLabel: "Show CLI Help & Shortcuts",
    category: "System",
    description: "Displays the interactive help menu listing available commands, hotkeys, keyboard shortcuts, and CLI usage tips.",
    usage: "/help",
    whenToUse: "Whenever you need a quick reference for CLI features and slash menu commands.",
    powerTip: "Press Up/Down arrow keys in the interactive slash popup to quickly cycle through available actions.",
    example: "/help"
  }
];
