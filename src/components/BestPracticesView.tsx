import React, { useState } from "react";
import { BEST_PRACTICES_DATA } from "../data/bestPracticesData";
import {
  Sparkles,
  Search,
  Check,
  Copy,
  AlertTriangle,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Flame,
  ArrowRight
} from "lucide-react";

export const BestPracticesView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = [
    "All",
    "Memory & Context",
    "Prompt Spec Engineering",
    "Subagent Delegation",
    "Tooling & Verification",
    "Workflow Speed"
  ];

  const filteredPractices = BEST_PRACTICES_DATA.filter((item) => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recommendedSolution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "Critical":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <Flame className="h-3 w-3" /> Critical Rule
          </span>
        );
      case "High Impact":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Zap className="h-3 w-3" /> High Impact
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Sparkles className="h-3 w-3" /> Pro Tip
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#16171D] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-3 relative overflow-hidden shadow-xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Power User Engineering Guidelines</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Best Practices Showcase
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Researched strategies and production patterns for using Cloud Code Opus 5 effectively. Master context pruning, subagent offloading, surgical editing, and spec-first engineering.
          </p>
        </div>
      </div>

      {/* Category Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#16171D] p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                activeCategory === cat
                  ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                  : "bg-[#0A0A0D] text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search best practices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A0A0D] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
          />
        </div>
      </div>

      {/* Best Practices Showcase Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPractices.map((practice, idx) => (
          <div
            key={practice.id}
            className="bg-[#16171D] border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between hover:border-slate-700 transition shadow-lg"
          >
            <div className="space-y-4">
              {/* Header Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono text-slate-400 bg-[#0A0A0D] px-2.5 py-1 rounded border border-slate-800">
                  {practice.category}
                </span>
                {getImpactBadge(practice.impact)}
              </div>

              {/* Title & Summary */}
              <div>
                <h3 className="text-lg font-bold text-white font-sans tracking-tight">
                  {practice.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {practice.summary}
                </p>
              </div>

              {/* Problem vs Solution Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Common Pitfall / Problem */}
                <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-rose-400 uppercase">
                    <AlertTriangle className="h-3 w-3" /> Anti-Pattern
                  </div>
                  <p className="text-[11px] text-rose-200/90 leading-relaxed">
                    {practice.problemStatement}
                  </p>
                </div>

                {/* Recommended Power User Solution */}
                <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 uppercase">
                    <CheckCircle2 className="h-3 w-3" /> Recommended
                  </div>
                  <p className="text-[11px] text-emerald-200/90 leading-relaxed">
                    {practice.recommendedSolution}
                  </p>
                </div>
              </div>

              {/* Code or Prompt Copy-Paste Example */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Ready-to-Use Snippet
                  </span>
                  <button
                    onClick={() => handleCopy(practice.codeOrPromptExample, idx)}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-[#0A0A0D] hover:bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-800 transition cursor-pointer"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Example</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[#0A0A0D] border border-slate-800 overflow-x-auto max-h-48 font-mono text-xs text-emerald-300 leading-relaxed">
                  <pre>{practice.codeOrPromptExample}</pre>
                </div>
              </div>

              {/* Step-by-step Execution Checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Action Checklist
                </span>
                <ul className="space-y-1.5">
                  {practice.stepByStepAction.map((step, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-amber-400 font-mono text-[10px] pt-0.5">•</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
