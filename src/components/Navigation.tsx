import React from "react";
import { TabType } from "../types";
import { BookOpen, ShieldCheck, Cpu, Hammer, Sparkles, Calculator, Terminal, FileCode } from "lucide-react";

interface NavigationProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: "core-concepts",
      label: "Core Concepts",
      icon: <Cpu className="h-4 w-4" />,
      badge: "Architecture",
    },
    {
      id: "best-practices",
      label: "Best Practices",
      icon: <ShieldCheck className="h-4 w-4" />,
      badge: "Showcase",
    },
    {
      id: "playbook",
      label: "Power Playbook",
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
      label: "Context Estimator",
      icon: <Calculator className="h-4 w-4" />,
    },
    {
      id: "slash-commands",
      label: "Slash Commands",
      icon: <Terminal className="h-4 w-4" />,
      badge: "Copy-Paste",
    },
    {
      id: "templates",
      label: "Template Library",
      icon: <FileCode className="h-4 w-4" />,
    },
  ];

  return (
    <div className="border-b border-slate-800 bg-[#0A0A0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? "bg-[#1A1B23] text-indigo-400 border border-slate-700 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#121318]"
                }`}
              >
                <span className={isActive ? "text-indigo-400" : "text-slate-400"}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded text-[9px] font-mono ${
                      isActive
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "bg-[#121318] text-slate-500 border border-slate-800"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
