import React, { useState } from "react";
import { GUIDES_DATA } from "../data/guidesData";
import { GuideArticle } from "../types";
import {
  BookOpen,
  Search,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Zap,
  ArrowRight,
  ShieldAlert,
  Code,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export const PlaybookGuideView: React.FC = () => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(GUIDES_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});

  const categories = ["All", "Core Philosophy", "Context & Memory", "Subagents", "Spec Engineering", "Slash Commands"];

  const filteredGuides = GUIDES_DATA.filter((guide) => {
    const matchesCategory = activeCategory === "All" || guide.category === activeCategory;
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentGuide = GUIDES_DATA.find((g) => g.id === selectedGuideId) || GUIDES_DATA[0];

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <div className="bg-[#16171D] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Anthropic & Cloud Code Verified Tactics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            The Power User's Guide to Cloud Code Opus 5
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Master the shift from amateur procedural prompting to declarative, test-driven agentic engineering.
            Explore context window optimization, subagent isolation, XML tag boundaries, and self-correcting loops.
          </p>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#16171D] p-3 rounded-xl border border-slate-800">
        {/* Category Pills */}
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

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search guides & tactics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A0A0D] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
      </div>

      {/* Main Grid: Article Drawer Sidebar + Main Deep Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Article List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider px-1">
            Mastery Modules ({filteredGuides.length})
          </h3>

          <div className="space-y-2.5">
            {filteredGuides.map((guide) => {
              const isSelected = guide.id === selectedGuideId;
              return (
                <div
                  key={guide.id}
                  onClick={() => setSelectedGuideId(guide.id)}
                  className={`p-4 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? "bg-[#1A1B23] border-indigo-500/50 shadow-md"
                      : "bg-[#16171D] border-slate-800 hover:bg-[#1A1B23] hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A0A0D] text-indigo-400 border border-slate-800">
                      {guide.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{guide.readTime}</span>
                  </div>

                  <h4
                    className={`text-sm font-semibold mb-1 ${
                      isSelected ? "text-white" : "text-slate-200"
                    }`}
                  >
                    {guide.title}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {guide.summary}
                  </p>

                  <div className="mt-3 flex items-center text-xs font-medium text-indigo-400 gap-1">
                    <span>Read Module</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Deep Reader Panel */}
        <div className="lg:col-span-8 bg-[#16171D] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-8">
          {/* Article Header */}
          <div className="space-y-3 border-b border-slate-800 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono">
                {currentGuide.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">• {currentGuide.readTime}</span>
              {currentGuide.badge && (
                <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-medium">
                  {currentGuide.badge}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight">
              {currentGuide.title}
            </h1>

            <p className="text-sm text-slate-300 italic">
              {currentGuide.subtitle}
            </p>

            <div className="p-4 rounded-xl bg-[#0A0A0D] border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
              <span className="text-indigo-400 font-semibold uppercase tracking-wider block mb-1">
                Executive Takeaway:
              </span>
              {currentGuide.summary}
            </div>
          </div>

          {/* Article Sections */}
          <div className="space-y-8">
            {currentGuide.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
                  <span className="h-2 w-2 rounded-full bg-indigo-400" />
                  {section.heading}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {section.content}
                </p>

                {/* Callout Box */}
                {section.callout && (
                  <div
                    className={`p-4 rounded-xl border flex items-start gap-3 ${
                      section.callout.type === "rule"
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                        : section.callout.type === "insight"
                        ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-200"
                        : "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                    }`}
                  >
                    {section.callout.type === "rule" ? (
                      <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    ) : (
                      <Zap className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs font-sans leading-relaxed">
                      <span className="font-bold uppercase tracking-wider block mb-0.5">
                        {section.callout.type === "rule" ? "Golden Rule" : "Power Insight"}:
                      </span>
                      {section.callout.text}
                    </div>
                  </div>
                )}

                {/* Code Snippet Box */}
                {section.codeSnippet && (
                  <div className="rounded-xl border border-slate-800 bg-[#0A0A0D] overflow-hidden shadow-lg">
                    <div className="px-4 py-2 bg-[#121318] border-b border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-300 font-medium">
                        {section.codeSnippet.title || "Code Reference"}
                      </span>
                      <button
                        onClick={() => handleCopyCode(section.codeSnippet!.code, idx)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#0A0A0D] hover:bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-800 transition cursor-pointer"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Interactive Before/After Comparison */}
                {section.beforeAfter && (
                  <div className="space-y-4 pt-2">
                    <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                      Interactive Comparison: Amateur vs Power User Spec
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Amateur / Bad */}
                      <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold text-red-400">
                          <span>{section.beforeAfter.badTitle}</span>
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                        </div>
                        <pre className="p-3 bg-[#0A0A0D] rounded-lg text-[11px] font-mono text-red-200 overflow-x-auto whitespace-pre-wrap border border-slate-800">
                          {section.beforeAfter.badCode}
                        </pre>
                        <p className="text-xs text-red-300/80 italic font-sans">
                          ⚠️ {section.beforeAfter.badReason}
                        </p>
                      </div>

                      {/* Power User / Good */}
                      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
                          <span>{section.beforeAfter.goodTitle}</span>
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        </div>
                        <pre className="p-3 bg-[#0A0A0D] rounded-lg text-[11px] font-mono text-emerald-200 overflow-x-auto whitespace-pre-wrap border border-slate-800">
                          {section.beforeAfter.goodCode}
                        </pre>
                        <p className="text-xs text-emerald-300/80 italic font-sans">
                          ⚡ {section.beforeAfter.goodReason}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Interactive Knowledge Verification Check */}
          <div className="p-6 rounded-2xl bg-[#0A0A0D] border border-indigo-500/30 space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-indigo-400" />
              <h4 className="text-sm font-bold text-white font-mono">
                Power User Knowledge Verification
              </h4>
            </div>

            <p className="text-xs text-slate-300">
              Quick test: Which approach maximizes Opus 5's reasoning performance according to Anthropic benchmarks?
            </p>

            <div className="space-y-2">
              {[
                "A) Writing a 15-page procedural step-by-step prompt detailing every single variable name.",
                "B) Keeping CLAUDE.md lean (<150 lines), using declarative requirements, XML block tags, and test verification scripts.",
                "C) Giving Opus 5 no context or commands at all and letting it guess.",
              ].map((option, idx) => {
                const isSelected = userAnswers[currentGuide.id] === idx;
                const isCorrect = idx === 1;

                return (
                  <button
                    key={idx}
                    onClick={() => setUserAnswers({ ...userAnswers, [currentGuide.id]: idx })}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? isCorrect
                          ? "bg-emerald-950/60 border-emerald-500 text-emerald-200"
                          : "bg-red-950/60 border-red-500 text-red-200"
                        : "bg-[#16171D] border-slate-800 text-slate-300 hover:bg-[#1A1B23]"
                    }`}
                  >
                    <span>{option}</span>
                    {isSelected && (
                      <span className="font-mono font-bold">
                        {isCorrect ? "✅ Correct!" : "❌ Try Again"}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

