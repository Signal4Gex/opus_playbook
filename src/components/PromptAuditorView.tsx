import React, { useState } from "react";
import { PromptAuditResult } from "../types";
import { Sparkles, Check, Copy, AlertCircle, ShieldCheck, Flame, RefreshCw, Code2, ArrowRight } from "lucide-react";

export const PromptAuditorView: React.FC = () => {
  const samplePrompts = [
    {
      label: "❌ Overconstrained Legacy Prompt",
      text: "Step 1: Open src/App.tsx and look at line 12. Add a state called search query using useState(''). Step 2: Create a function called handleSearch. Make sure you check if e.target.value is empty. Step 3: Filter items array using items.filter(x => x.name.toLowerCase().includes(search.toLowerCase())). Step 4: Map over the filtered array.",
    },
    {
      label: "⚠️ Vague Feature Request",
      text: "Make me a dashboard with stats and a button that exports data.",
    },
    {
      label: "⚡ Power User XML Spec",
      text: `<spec>
  <goal>Add real-time user activity search filter</goal>
  <requirements>
    - Case-insensitive search across name and email
    - Debounced filter update (150ms)
    - Zero console warnings and strict TypeScript definitions
  </requirements>
  <never_do>
    - Do NOT write placeholder mock handlers
  </never_do>
  <verification>
    - Run \`npm test\` and \`npm run lint\`
  </verification>
</spec>`,
    },
  ];

  const [promptText, setPromptText] = useState(samplePrompts[0].text);
  const [targetModel, setTargetModel] = useState("Cloud Code Opus 5");
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<PromptAuditResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAudit = async () => {
    if (!promptText.trim()) return;
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/audit-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promptText,
          targetModel,
          projectScope: "Full-Stack Web App",
        }),
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setAuditResult(data.analysis);
      } else {
        setErrorMessage(data.error || "Failed to analyze prompt.");
      }
    } catch (err: any) {
      setErrorMessage("Network or server error during prompt audit.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRefined = () => {
    if (!auditResult?.powerUserRefinedPrompt) return;
    navigator.clipboard.writeText(auditResult.powerUserRefinedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-[#16171D] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Real-time Prompt Quality & Bloat Inspector</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Opus 5 Prompt Auditor & Refiner
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Paste your prompt or spec draft below. The inspector evaluates boundary strength, testability, and overconstraining score — then generates a refined power-user version tailored for Cloud Code Opus 5.
        </p>
      </div>

      {/* Main Grid: Input Form + Result Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Form & Sample Selector */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#16171D] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Prompt or Spec Draft
              </label>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-mono">Target:</span>
                <select
                  value={targetModel}
                  onChange={(e) => setTargetModel(e.target.value)}
                  className="bg-[#0A0A0D] border border-slate-800 text-xs font-mono text-indigo-400 rounded px-2 py-1 focus:outline-none"
                >
                  <option value="Cloud Code Opus 5">Cloud Code Opus 5</option>
                  <option value="Claude 3.7 Sonnet">Claude 3.7 Sonnet</option>
                  <option value="Claude Max Agent">Claude Max Agent</option>
                </select>
              </div>
            </div>

            {/* Quick Sample Selector */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Try Sample Templates:</span>
              <div className="flex flex-wrap gap-1.5">
                {samplePrompts.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPromptText(sample.text);
                      setAuditResult(null);
                    }}
                    className="px-2.5 py-1 rounded bg-[#0A0A0D] border border-slate-800 hover:border-slate-700 text-[11px] text-slate-300 transition cursor-pointer font-sans"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Textarea */}
            <textarea
              rows={8}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Paste your prompt, feature spec, or task instructions here..."
              className="w-full bg-[#0A0A0D] border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition leading-relaxed"
            />

            {/* Action Button */}
            <button
              onClick={handleAudit}
              disabled={loading || !promptText.trim()}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-white" />
                  <span>Auditing Prompt Boundaries & Bloat...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Audit & Refine Prompt for Opus 5</span>
                </>
              )}
            </button>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-xs text-red-300">
                {errorMessage}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Audit Scorecard & Refined Output */}
        <div className="lg:col-span-6 space-y-6">
          {!auditResult && !loading ? (
            <div className="bg-[#16171D] border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <Code2 className="h-10 w-10 text-indigo-500/40 mx-auto" />
              <h3 className="text-sm font-semibold text-slate-300">Ready for Prompt Inspection</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click "Audit & Refine Prompt" above to calculate clarity score, bloat factor, and generate a power-user Opus 5 spec.
              </p>
            </div>
          ) : auditResult ? (
            <div className="space-y-6">
              {/* Scorecard Gauge Bar */}
              <div className="bg-[#16171D] border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Quality Score */}
                  <div className="p-4 rounded-xl bg-[#0A0A0D] border border-slate-800 space-y-1 text-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Agentic Quality Score</span>
                    <div className="text-3xl font-extrabold font-mono text-indigo-400">
                      {auditResult.score}<span className="text-sm text-slate-500">/100</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                      <div
                        className="bg-indigo-500 h-full transition-all duration-500"
                        style={{ width: `${auditResult.score}%` }}
                      />
                    </div>
                  </div>

                  {/* Overconstrained Danger Meter */}
                  <div className="p-4 rounded-xl bg-[#0A0A0D] border border-slate-800 space-y-1 text-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Micromanagement Bloat</span>
                    <div
                      className={`text-3xl font-extrabold font-mono ${
                        auditResult.overconstrainedScore > 60 ? "text-amber-400" : "text-emerald-400"
                      }`}
                    >
                      {auditResult.overconstrainedScore}%
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                      <div
                        className={`h-full transition-all duration-500 ${
                          auditResult.overconstrainedScore > 60 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${auditResult.overconstrainedScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5" /> Strengths
                    </span>
                    <ul className="space-y-1">
                      {auditResult.strengths.map((s, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5 font-sans">
                          <span className="text-emerald-400 text-xs">✓</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" /> Improvement Opportunities
                    </span>
                    <ul className="space-y-1">
                      {auditResult.weaknesses.map((w, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5 font-sans">
                          <span className="text-amber-400 text-xs">!</span> {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Power-User Refined Version */}
              <div className="bg-[#16171D] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-400" /> Refined Power-User Opus 5 Version
                  </span>

                  <button
                    onClick={handleCopyRefined}
                    className="flex items-center gap-1 px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono transition cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? "Copied!" : "Copy Spec"}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#0A0A0D] border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed max-h-80">
                  <pre>{auditResult.powerUserRefinedPrompt}</pre>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

