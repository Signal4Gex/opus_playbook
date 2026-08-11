import React, { useState } from "react";
import { ArchitectState } from "../types";
import { Hammer, Copy, Download, Check, Sparkles, FileText, CheckCircle2, Shield, Settings2 } from "lucide-react";

export const SpecArchitectView: React.FC = () => {
  const [architect, setArchitect] = useState<ArchitectState>({
    projectName: "My Cloud App",
    projectType: "fullstack",
    primaryStack: "React 19 + TypeScript + Express + Tailwind CSS",
    testingFramework: "Vitest / npm test",
    lintCommand: "npm run lint",
    enableSubagents: true,
    subagentRoles: ["code-reviewer", "test-runner"],
    strictness: "lean",
    includeXmlTags: true,
    maxContextBudget: 150,
    customConstraints: "NEVER modify package.json scripts without permission.\nNEVER use 'any' TypeScript type.",
  });

  const [activeOutputTab, setActiveOutputTab] = useState<"claude" | "agents" | "spec">("claude");
  const [copied, setCopied] = useState(false);

  // Dynamic Generator Logic
  const generatedClaudeMd = `# CLAUDE.md - ${architect.projectName}

## 1. Core Commands
- Dev Server: \`npm run dev\`
- Build: \`npm run build\`
- Test Execution: \`${architect.testingFramework}\`
- Linting: \`${architect.lintCommand}\`

## 2. Tech Stack & Architecture
- ${architect.primaryStack}
- Project Scope: ${architect.projectType.toUpperCase()}
- Architecture: Modular, single-responsibility files (<150 lines per component).
- State Strategy: Explicit state management with typed interfaces in \`/src/types.ts\`.

## 3. Negative Constraints (NEVER DO)
- NEVER create unrendered placeholder UI cards, fake mock functions, or silent click handlers.
- NEVER put secret keys in browser code. Always proxy external APIs server-side.
${architect.customConstraints.split("\n").map(line => `- ${line}`).join("\n")}

## 4. Autonomous Verification
- Always execute \`${architect.lintCommand}\` and verify build success before completing tasks.
`;

  const generatedAgentsMd = `# AGENTS.md - ${architect.projectName} Multi-Agent Delegation

## Lead Coordinator
- Model: Cloud Code Opus 5
- Role: High-level architectural reasoning, file editing, and feature implementation.

${architect.enableSubagents ? `## Subagents Configured
${architect.subagentRoles.map(role => `### @${role}
- File: \`.claude/agents/${role}.md\`
- Scope: Runs isolated in background window. Returns summary report (<15 lines).`).join("\n\n")}

## Delegation Rules
- Spawn @code-reviewer for security and re-render checks on major pull requests.
- Spawn @test-runner to run tests and analyze stack traces without polluting primary window.` : "Subagents disabled — single lead agent mode."}
`;

  const generatedSpecMaster = `<feature_spec>
  <metadata>
    <project_name>${architect.projectName}</project_name>
    <target_model>Cloud Code Opus 5</target_model>
    <strictness>${architect.strictness}</strictness>
  </metadata>

  <executive_purpose>
    Implement high-yield functional enhancements for ${architect.projectName} adhering strictly to declarative intent and test-driven loops.
  </executive_purpose>

  <technical_stack>
    ${architect.primaryStack}
  </technical_stack>

  <requirements>
    - Maintain zero console errors and 100% strict TypeScript types.
    - Provide complete, accessible, responsive user interfaces across breakpoints.
    - Ensure all API endpoints handle error conditions gracefully.
  </requirements>

  <never_do>
    - Do NOT write procedural micromanaged code snippets in prompts.
    - Do NOT introduce unrequested third-party NPM packages.
    ${architect.customConstraints.split("\n").map(c => `- ${c}`).join("\n    ")}
  </never_do>

  <verification>
    - Run \`${architect.testingFramework}\`
    - Run \`${architect.lintCommand}\`
  </verification>
</feature_spec>`;

  const currentContent =
    activeOutputTab === "claude"
      ? generatedClaudeMd
      : activeOutputTab === "agents"
      ? generatedAgentsMd
      : generatedSpecMaster;

  const currentFilename =
    activeOutputTab === "claude"
      ? "CLAUDE.md"
      : activeOutputTab === "agents"
      ? "AGENTS.md"
      : "SPEC_MASTER.md";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = currentFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-[#16171D] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
          <Hammer className="h-3.5 w-3.5" />
          <span>Interactive Configuration Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Opus 5 Spec & Memory Architect
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Configure your workspace parameters to generate lean, production-ready <code className="text-indigo-300 font-mono">CLAUDE.md</code>, <code className="text-indigo-300 font-mono">AGENTS.md</code>, or XML master specs engineered specifically for Cloud Code Opus 5.
        </p>
      </div>

      {/* Main Split View: Config Controls + Live Output Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Controls */}
        <div className="lg:col-span-5 bg-[#16171D] border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Settings2 className="h-4 w-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Project Parameters
            </h3>
          </div>

          <div className="space-y-4">
            {/* Project Name */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Project Name</label>
              <input
                type="text"
                value={architect.projectName}
                onChange={(e) => setArchitect({ ...architect, projectName: e.target.value })}
                className="w-full bg-[#0A0A0D] border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Scope / Type */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Project Archetype</label>
              <select
                value={architect.projectType}
                onChange={(e) => setArchitect({ ...architect, projectType: e.target.value as any })}
                className="w-full bg-[#0A0A0D] border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="fullstack">Full-Stack Application (Express + Vite)</option>
                <option value="frontend">Client-Side Single Page App (React / SPA)</option>
                <option value="backend">Backend Service / Microservice (Node / API)</option>
                <option value="refactor">Codebase Refactor & Architecture Shift</option>
                <option value="bugfix">Bug Investigation & Hotfix Task</option>
                <option value="library">TypeScript / NPM Library</option>
              </select>
            </div>

            {/* Primary Stack */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Primary Tech Stack</label>
              <input
                type="text"
                value={architect.primaryStack}
                onChange={(e) => setArchitect({ ...architect, primaryStack: e.target.value })}
                className="w-full bg-[#0A0A0D] border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Testing Command */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Testing Runner</label>
                <input
                  type="text"
                  value={architect.testingFramework}
                  onChange={(e) => setArchitect({ ...architect, testingFramework: e.target.value })}
                  className="w-full bg-[#0A0A0D] border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Lint Command</label>
                <input
                  type="text"
                  value={architect.lintCommand}
                  onChange={(e) => setArchitect({ ...architect, lintCommand: e.target.value })}
                  className="w-full bg-[#0A0A0D] border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {/* Prompt Strictness */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Prompt Philosophy (System Strictness)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "lean", label: "Lean & Flexible", desc: "Highest Opus 5 benchmark score" },
                  { id: "balanced", label: "Balanced", desc: "Standard project guardrails" },
                  { id: "strict", label: "Strict Rules", desc: "High security compliance" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setArchitect({ ...architect, strictness: s.id as any })}
                    className={`p-2 rounded-lg border text-left text-xs transition cursor-pointer ${
                      architect.strictness === s.id
                        ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold"
                        : "bg-[#0A0A0D] border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div>{s.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Subagent Toggle */}
            <div className="p-3 rounded-xl bg-[#0A0A0D] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">Enable Subagents (.claude/agents/)</span>
                <input
                  type="checkbox"
                  checked={architect.enableSubagents}
                  onChange={(e) => setArchitect({ ...architect, enableSubagents: e.target.checked })}
                  className="h-4 w-4 accent-indigo-600 rounded cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Spawns specialized background workers for code audits and testing to preserve primary context budget.
              </p>
            </div>

            {/* Custom Negative Guardrails */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Custom Negative Constraints (One per line)
              </label>
              <textarea
                rows={3}
                value={architect.customConstraints}
                onChange={(e) => setArchitect({ ...architect, customConstraints: e.target.value })}
                className="w-full bg-[#0A0A0D] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Live Output Panel */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between bg-[#16171D] p-2 rounded-xl border border-slate-800">
            {/* Output File Switcher Tabs */}
            <div className="flex items-center gap-1">
              {[
                { id: "claude", label: "CLAUDE.md" },
                { id: "agents", label: "AGENTS.md" },
                { id: "spec", label: "SPEC_MASTER.md" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveOutputTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                    activeOutputTab === tab.id
                      ? "bg-indigo-600 text-white font-semibold shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-[#0A0A0D]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Copy / Download Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A0A0D] hover:bg-slate-800 text-slate-200 text-xs font-mono transition cursor-pointer border border-slate-800"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono transition cursor-pointer shadow-md"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download {currentFilename}</span>
              </button>
            </div>
          </div>

          {/* Code Viewer Box */}
          <div className="bg-[#0A0A0D] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-4 py-2.5 bg-[#121318] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-mono text-slate-300 font-semibold">{currentFilename}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Opus 5 Optimized
              </span>
            </div>

            <pre className="p-6 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-[520px]">
              <code>{currentContent}</code>
            </pre>
          </div>

          {/* Quick Integration Guidance */}
          <div className="p-4 rounded-xl bg-[#16171D] border border-slate-800 text-xs text-slate-400 space-y-1 font-sans">
            <span className="font-semibold text-white font-mono">How to use in Cloud Code:</span>
            <p>
              Save <code className="text-indigo-400 font-mono">{currentFilename}</code> in the root directory of your project repository. Cloud Code Opus 5 will automatically detect and load these guidelines at the start of every session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

