import React, { useState } from "react";
import { CORE_CONCEPTS_DATA } from "../data/coreConceptsData";
import {
  Cpu,
  Database,
  Network,
  Layers,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  ArrowRight,
  BookOpen,
  Terminal,
  ShieldCheck
} from "lucide-react";

export const CoreConceptsView: React.FC = () => {
  const [activeConceptId, setActiveConceptId] = useState<string>(CORE_CONCEPTS_DATA[0].id);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const selectedConcept =
    CORE_CONCEPTS_DATA.find((item) => item.id === activeConceptId) || CORE_CONCEPTS_DATA[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getConceptIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="h-5 w-5 text-indigo-400" />;
      case "Database":
        return <Database className="h-5 w-5 text-indigo-400" />;
      case "Network":
        return <Network className="h-5 w-5 text-indigo-400" />;
      case "Layers":
        return <Layers className="h-5 w-5 text-indigo-400" />;
      default:
        return <BookOpen className="h-5 w-5 text-indigo-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#16171D] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-3 relative overflow-hidden shadow-xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Foundational Architecture & Principles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Cloud Code Opus 5 Core Concepts
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Understand the inner mechanisms, dual-layer memory system, subagent isolation sandbox, and deterministic execution loops powering Cloud Code Opus Five.
          </p>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Concept Selection Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 px-1 mb-2">
            System Principles
          </div>
          <div className="space-y-2">
            {CORE_CONCEPTS_DATA.map((concept) => {
              const isActive = concept.id === selectedConcept.id;
              return (
                <button
                  key={concept.id}
                  onClick={() => setActiveConceptId(concept.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#1A1B23] border-indigo-500/50 shadow-md"
                      : "bg-[#16171D] border-slate-800 hover:border-slate-700 hover:bg-[#181920]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${isActive ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-300" : "bg-[#0A0A0D] border-slate-800 text-slate-400"}`}>
                      {getConceptIcon(concept.iconName)}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold font-mono ${isActive ? "text-white" : "text-slate-200"}`}>
                        {concept.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {concept.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Architecture Insight Box */}
          <div className="p-4 rounded-xl bg-[#0A0A0D] border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Power User Takeaway</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cloud Code Opus 5 separates immutable repository memory (<code className="text-indigo-300 font-mono">CLAUDE.md</code>) from transient conversation state. Use <code className="text-indigo-300 font-mono">/compact</code> and subagents to maintain peak recall.
            </p>
          </div>
        </div>

        {/* Right Detail Reader View */}
        <div className="lg:col-span-8 bg-[#16171D] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-8">
          {/* Concept Header */}
          <div className="border-b border-slate-800 pb-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                {getConceptIcon(selectedConcept.iconName)}
              </span>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
                Core Principle
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white font-sans tracking-tight">
              {selectedConcept.title}
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              {selectedConcept.summary}
            </p>
          </div>

          {/* Detailed Narrative */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Technical Deep Dive
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-[#0A0A0D] p-4 rounded-xl border border-slate-800 font-sans">
              {selectedConcept.details}
            </p>
          </div>

          {/* Key Components Grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Key Components
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedConcept.keyComponents.map((comp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#0A0A0D] border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 inline-block mb-2">
                      {comp.role}
                    </span>
                    <h4 className="text-xs font-bold text-white font-mono">{comp.name}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                      {comp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agentic Workflow Execution Steps */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="h-4 w-4 text-indigo-400" /> Agentic Execution Cycle
            </h3>
            <div className="space-y-2 bg-[#0A0A0D] p-4 rounded-xl border border-slate-800">
              {selectedConcept.powerUserWorkflow.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-slate-300 font-mono">
                  <span className="flex items-center justify-center w-5 h-5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed pt-0.5">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Reference Box */}
          {selectedConcept.codeExample && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Reference Implementation
                </h3>
                <button
                  onClick={() => handleCopyCode(selectedConcept.codeExample!.code)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#0A0A0D] hover:bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-800 transition cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-[#0A0A0D] border border-slate-800 rounded-xl overflow-hidden shadow-lg">
                <div className="px-4 py-2 bg-[#121318] border-b border-slate-800 text-xs font-mono text-slate-400">
                  {selectedConcept.codeExample.filename}
                </div>
                <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                  <code>{selectedConcept.codeExample.code}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
