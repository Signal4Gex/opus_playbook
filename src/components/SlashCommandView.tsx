import React, { useState } from "react";
import { SLASH_COMMANDS_DATA } from "../data/slashCommandsData";
import { Terminal, Search, Copy, Check, Zap, Sparkles, HelpCircle, CheckCircle, ArrowRight } from "lucide-react";

export const SlashCommandView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<{ id: number; type: "command" | "example" } | null>(null);

  const categories = ["All", "System", "Context", "Subagents", "Debugging", "Workflow", "Git & PRs", "Configuration"];

  const filteredCommands = SLASH_COMMANDS_DATA.filter((cmd) => {
    const matchesCat = activeCategory === "All" || cmd.category === activeCategory;
    const matchesSearch =
      cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.menuLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.whenToUse.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.example.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.powerTip.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (text: string, id: number, type: "command" | "example") => {
    navigator.clipboard.writeText(text);
    setCopiedIndex({ id, type });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#16171D] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden shadow-xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <Terminal className="h-3.5 w-3.5" />
            <span>Claude Code CLI & Cloud Code CLI Interactive Slash Menu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Slash Command Menu Reference & Copy-Paste Hub
          </h2>
          <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
            Every interactive item in the CloudCode CLI slash (<code className="text-indigo-300 font-mono">/</code>) menu explained. Learn when to use each command, how to avoid context contamination, and copy ready-to-run examples directly into your terminal session.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#16171D] p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-[#0A0A0D] text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search slash menu, examples, or tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A0A0D] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
      </div>

      {/* Command Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommands.map((cmd, idx) => (
          <div
            key={idx}
            className="bg-[#16171D] border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition flex flex-col justify-between shadow-md"
          >
            <div className="space-y-3.5">
              {/* Command Badge & Category */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20">
                    {cmd.command}
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {cmd.menuLabel}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-[#0A0A0D] border border-slate-800 shrink-0">
                  {cmd.category}
                </span>
              </div>

              {/* What It Does */}
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {cmd.description}
              </p>

              {/* Right Way To Use It */}
              <div className="p-3 rounded-xl bg-[#0A0A0D] border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Right Way to Use
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {cmd.whenToUse}
                </p>
              </div>

              {/* Copy-Paste Example ready for CloudCode CLI */}
              <div className="p-3 rounded-xl bg-[#0A0A0D] border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Copy-Paste Example
                  </span>
                  <button
                    onClick={() => handleCopy(cmd.example, idx, "example")}
                    className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
                  >
                    {copiedIndex?.id === idx && copiedIndex?.type === "example" ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
                <code className="text-xs font-mono text-emerald-300 block overflow-x-auto leading-relaxed">
                  {cmd.example}
                </code>
              </div>

              {/* Power Tip */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400 uppercase">
                  <Zap className="h-3 w-3" /> Pro Tip
                </div>
                <p className="text-[11px] leading-relaxed">{cmd.powerTip}</p>
              </div>
            </div>

            {/* Copy Command Button */}
            <button
              onClick={() => handleCopy(cmd.command, idx, "command")}
              className="w-full mt-3 py-2 px-3 rounded-xl bg-[#0A0A0D] hover:bg-slate-800 text-slate-200 text-xs font-mono transition cursor-pointer flex items-center justify-center gap-1.5 border border-slate-800"
            >
              {copiedIndex?.id === idx && copiedIndex?.type === "command" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Slash Command!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Command ({cmd.command})</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
