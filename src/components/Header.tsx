import React from "react";
import { Cpu, Zap, Sparkles, Code2, BookOpen } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: any) => void;
  onOpenQuickArchitect: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenQuickArchitect,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-[#090D16]/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Logo and Brand Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-amber-500 p-[1px] shadow-lg shadow-indigo-500/10">
            <div className="h-full w-full bg-[#0B0F17] rounded-[11px] flex items-center justify-center">
              <Cpu className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-100 font-mono">
                OPUS FIVE <span className="text-indigo-400">POWER PLAYBOOK</span>
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Cloud Code Opus 5 Ready
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Interactive Power Workbench, Context Engineering & Agentic Workflow Architect
            </p>
          </div>
        </div>

        {/* Status Indicators & Fast Actions */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-slate-400">Context Threshold:</span>
            <span className="font-semibold text-emerald-400">80% System Prompt Lean</span>
          </div>

          <button
            onClick={() => onSelectTab("auditor")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Audit Prompt</span>
          </button>

          <button
            onClick={onOpenQuickArchitect}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Build CLAUDE.md</span>
          </button>
        </div>
      </div>
    </header>
  );
};
