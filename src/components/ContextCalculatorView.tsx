import React, { useState } from "react";
import { Calculator, AlertTriangle, CheckCircle2, Zap, RotateCcw, Cpu, Layers } from "lucide-react";

export const ContextCalculatorView: React.FC = () => {
  const [fileCount, setFileCount] = useState<number>(18);
  const [claudeMdLines, setClaudeMdLines] = useState<number>(120);
  const [conversationTurns, setConversationTurns] = useState<number>(14);
  const [avgToolOutputLines, setAvgToolOutputLines] = useState<number>(250);
  const [subagentsCount, setSubagentsCount] = useState<number>(2);

  // Token math approximation:
  // 1 line of code ~ 10-12 tokens
  // CLAUDE.md lines * 10
  // File inspection tokens ~ fileCount * 150 lines avg * 10 tokens
  // Conversation history ~ conversationTurns * (500 user prompt tokens + avgToolOutputLines * 10)
  // Subagent isolation savings: subagents reduce tool output bloat in main window by 75%
  
  const systemPromptTokens = Math.round(claudeMdLines * 10);
  const repoTreeTokens = Math.round(fileCount * 120);
  const baseToolBloatPerTurn = Math.round(avgToolOutputLines * 8);
  const effectiveToolBloat = subagentsCount > 0 
    ? Math.round(baseToolBloatPerTurn * (1 - subagentsCount * 0.25)) 
    : baseToolBloatPerTurn;

  const turnsTokens = Math.round(conversationTurns * (400 + effectiveToolBloat));
  
  const totalTokens = systemPromptTokens + repoTreeTokens + turnsTokens;
  const maxContextWindow = 200000; // 200k token window for Opus 5
  const percentageUsed = Math.min(100, Math.round((totalTokens / maxContextWindow) * 100));

  // Post-Compaction Tokens
  const compactedTokens = Math.round(systemPromptTokens + repoTreeTokens + (turnsTokens * 0.15));

  let statusColor = "emerald";
  let statusText = "Optimal Performance Window";
  let statusDesc = "Opus 5 attention heads are operating at peak recall accuracy (~99%). No action needed.";

  if (percentageUsed > 70) {
    statusColor = "red";
    statusText = "High Attention Head Degradation Risk";
    statusDesc = "Tool logs and conversation history are crowding out system constraints. Execute `/compact` immediately!";
  } else if (percentageUsed > 40) {
    statusColor = "amber";
    statusText = "Moderate Context Saturation";
    statusDesc = "Context window is 40%+ full. Run `/compact` soon or delegate exploration tasks to subagents.";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-[#16171D] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <Calculator className="h-3.5 w-3.5" />
          <span>Interactive Token Budget & Compaction Calculator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Opus 5 Context Window Estimator
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Estimate token consumption, calculate context window saturation, and evaluate the token savings from subagents and <code className="text-emerald-300 font-mono">/compact</code> checkpoints.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Control Panel */}
        <div className="lg:col-span-6 bg-[#16171D] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Layers className="h-4 w-4 text-emerald-400" /> Session Workload Inputs
          </h3>

          <div className="space-y-5">
            {/* Source Files in Workspace */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">Files Inspected / In Repository</span>
                <span className="text-emerald-400 font-mono font-bold">{fileCount} files</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={fileCount}
                onChange={(e) => setFileCount(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-[#0A0A0D] h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* CLAUDE.md Lines */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">CLAUDE.md Instruction Length</span>
                <span className="text-emerald-400 font-mono font-bold">{claudeMdLines} lines (~{systemPromptTokens} tokens)</span>
              </div>
              <input
                type="range"
                min="20"
                max="600"
                step="10"
                value={claudeMdLines}
                onChange={(e) => setClaudeMdLines(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-[#0A0A0D] h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 italic">
                Anthropic recommends keeping CLAUDE.md under 150-200 lines for maximum recall.
              </p>
            </div>

            {/* Active Conversation Turns */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">Active Conversation Turns (Message Loops)</span>
                <span className="text-emerald-400 font-mono font-bold">{conversationTurns} turns</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={conversationTurns}
                onChange={(e) => setConversationTurns(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-[#0A0A0D] h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Tool Output Size */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">Avg Raw Tool Output per Turn</span>
                <span className="text-emerald-400 font-mono font-bold">{avgToolOutputLines} lines</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={avgToolOutputLines}
                onChange={(e) => setAvgToolOutputLines(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-[#0A0A0D] h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Subagents Count */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">Active Subagents Configured</span>
                <span className="text-emerald-400 font-mono font-bold">{subagentsCount} subagent(s)</span>
              </div>
              <input
                type="range"
                min="0"
                max="3"
                value={subagentsCount}
                onChange={(e) => setSubagentsCount(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-[#0A0A0D] h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-emerald-400/80 italic font-mono">
                Subagents isolate raw tool output into separate windows, reducing primary token bloat by ~25% per subagent.
              </p>
            </div>
          </div>
        </div>

        {/* Live Token Gauge & Compaction Simulation */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Visual Progress Meter */}
          <div className="bg-[#16171D] border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Context Window Saturation Gauge
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                Opus 5 (200k Max)
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-baseline font-mono">
                <span className="text-3xl font-extrabold text-[#0A0A0D] font-mono dark:text-white">
                  {totalTokens.toLocaleString()}{" "}
                  <span className="text-xs text-slate-400 font-sans">tokens consumed</span>
                </span>
                <span
                  className={`text-xl font-bold ${
                    percentageUsed > 70
                      ? "text-red-400"
                      : percentageUsed > 40
                      ? "text-amber-400"
                      : "text-emerald-400"
                  }`}
                >
                  {percentageUsed}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#0A0A0D] h-4 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    percentageUsed > 70
                      ? "bg-red-500"
                      : percentageUsed > 40
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${percentageUsed}%` }}
                />
              </div>
            </div>

            {/* Status Alert Banner */}
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                statusColor === "red"
                  ? "bg-red-950/40 border-red-500/30 text-red-200"
                  : statusColor === "amber"
                  ? "bg-amber-950/40 border-amber-500/30 text-amber-200"
                  : "bg-emerald-950/40 border-emerald-500/30 text-emerald-200"
              }`}
            >
              {statusColor === "red" ? (
                <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono">{statusText}</h4>
                <p className="text-xs font-sans text-slate-300 leading-relaxed">{statusDesc}</p>
              </div>
            </div>

            {/* Token Breakdown Stack */}
            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <div className="p-3 rounded-lg bg-[#0A0A0D] border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">System & CLAUDE.md</span>
                <span className="text-sm font-bold font-mono text-indigo-400">{systemPromptTokens}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0A0A0D] border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Repo Structure</span>
                <span className="text-sm font-bold font-mono text-indigo-400">{repoTreeTokens}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0A0A0D] border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Turn History</span>
                <span className="text-sm font-bold font-mono text-indigo-400">{turnsTokens}</span>
              </div>
            </div>
          </div>

          {/* Compaction Simulation Box */}
          <div className="bg-[#16171D] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-emerald-400" />
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Simulated /compact Checkpoint Savings
              </h4>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Executing <code className="text-emerald-400 font-mono">/compact</code> compresses raw tool outputs into a streamlined checkpoint summary.
            </p>

            <div className="p-4 rounded-xl bg-[#0A0A0D] border border-slate-800 flex items-center justify-between font-mono text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">After Compaction</span>
                <span className="text-lg font-bold text-emerald-400">{compactedTokens.toLocaleString()} tokens</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] uppercase">Token Reduction</span>
                <span className="text-lg font-bold text-indigo-400">
                  -{Math.round(((totalTokens - compactedTokens) / totalTokens) * 100)}% Saved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

