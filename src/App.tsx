import React, { useState } from "react";
import { TabType } from "./types";
import { CoreConceptsView } from "./components/CoreConceptsView";
import { BestPracticesView } from "./components/BestPracticesView";
import { PlaybookGuideView } from "./components/PlaybookGuideView";
import { SpecArchitectView } from "./components/SpecArchitectView";
import { PromptAuditorView } from "./components/PromptAuditorView";
import { ContextCalculatorView } from "./components/ContextCalculatorView";
import { SlashCommandView } from "./components/SlashCommandView";
import { TemplateLibraryView } from "./components/TemplateLibraryView";
import {
  BookOpen,
  Hammer,
  Sparkles,
  Calculator,
  Terminal,
  FileCode,
  Zap,
  Cpu,
  ShieldCheck,
  Activity,
  Menu,
  X
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("core-concepts");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: "core-concepts",
      label: "Core Concepts",
      icon: <Cpu className="h-4 w-4" />,
      badge: "Architecture",
    },
    {
      id: "best-practices",
      label: "Best Practices Showcase",
      icon: <ShieldCheck className="h-4 w-4" />,
      badge: "Showcase",
    },
    {
      id: "playbook",
      label: "Core Principles & Playbook",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: "architect",
      label: "Spec Architect",
      icon: <Hammer className="h-4 w-4" />,
      badge: "Generator",
    },
    {
      id: "auditor",
      label: "Prompt Inspector",
      icon: <Sparkles className="h-4 w-4" />,
      badge: "AI Evaluator",
    },
    {
      id: "calculator",
      label: "Context Window Estimator",
      icon: <Calculator className="h-4 w-4" />,
    },
    {
      id: "slash-commands",
      label: "Slash Commands Matrix",
      icon: <Terminal className="h-4 w-4" />,
      badge: "Copy-Paste",
    },
    {
      id: "templates",
      label: "Blueprint Library",
      icon: <FileCode className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F1015] text-slate-300 font-sans antialiased flex flex-col md:flex-row selection:bg-indigo-600 selection:text-white">
      {/* Sidebar - Sleek Interface Theme */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-[#0A0A0D] flex flex-col shrink-0">
        <div className="p-5 flex items-center justify-between md:block">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <span className="text-white font-black text-xs italic tracking-wider">C5</span>
            </div>
            <div>
              <h1 className="text-white font-bold tracking-tight text-sm font-mono">OPUS FIVE GUIDE</h1>
              <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase block">
                Power Workbench 5.2
              </span>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className={`p-4 space-y-1.5 flex-1 ${mobileMenuOpen ? "block" : "hidden md:block"}`}>
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-3 mb-2">
            System Modules
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-indigo-400" : "bg-slate-600"}`} />
                    <span className="flex items-center gap-2">
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                        isActive
                          ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                          : "bg-slate-800 text-slate-500 border-slate-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Status Footer in Sidebar */}
        <div className="p-4 border-t border-slate-800 bg-[#0A0A0D] hidden md:block">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold font-mono">
              OP5
            </div>
            <div>
              <p className="text-xs text-white font-medium">Power User Mode</p>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 uppercase font-mono tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Status: Active</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0F1015]">
        {/* Top Header Bar - Sleek Theme */}
        <header className="h-16 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between bg-[#0F1015]/80 backdrop-blur sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">
              USER_SESSION_05X-BETA
            </span>
            <div className="h-4 w-px bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-indigo-400">
              <Activity className="h-3 w-3 text-indigo-400 animate-pulse" />
              <span>Opus 5 Latent Space: Clean</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("auditor")}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Inspect Prompt</span>
            </button>

            <button
              onClick={() => setActiveTab("architect")}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Sync Memory (CLAUDE.md)</span>
            </button>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === "core-concepts" && <CoreConceptsView />}
          {activeTab === "best-practices" && <BestPracticesView />}
          {activeTab === "playbook" && <PlaybookGuideView />}
          {activeTab === "architect" && <SpecArchitectView />}
          {activeTab === "auditor" && <PromptAuditorView />}
          {activeTab === "calculator" && <ContextCalculatorView />}
          {activeTab === "slash-commands" && <SlashCommandView />}
          {activeTab === "templates" && <TemplateLibraryView />}
        </main>

        {/* Footer Bar - Sleek Theme */}
        <footer className="h-12 bg-[#0A0A0D] border-t border-slate-800 px-4 sm:px-8 flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest font-mono">
          <span>© 2026 Cloud Code Opus Labs</span>
          <span className="hidden sm:inline">Network Status: Encrypted / Latency 24ms</span>
          <span>Build 1.0.5f-stable</span>
        </footer>
      </div>
    </div>
  );
}
