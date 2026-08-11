import React, { useState } from "react";
import { TEMPLATES_DATA } from "../data/templatesData";
import { SpecTemplate } from "../types";
import { FileCode, Search, Copy, Download, Check, Eye, Tag, Sparkles } from "lucide-react";

export const TemplateLibraryView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<SpecTemplate | null>(TEMPLATES_DATA[0]);
  const [copied, setCopied] = useState(false);

  const categories = ["All", "Config", "Subagent", "Master Spec", "Context Saver"];

  const filteredTemplates = TEMPLATES_DATA.filter((tpl) => {
    const matchesCat = activeCategory === "All" || tpl.category === activeCategory;
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (tpl: SpecTemplate) => {
    const blob = new Blob([tpl.content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = tpl.filename.replace(/\//g, "_");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-[#16171D] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
          <FileCode className="h-3.5 w-3.5" />
          <span>Production Blueprint Repository</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Opus 5 Config & Spec Blueprint Library
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Pre-built, benchmark-verified configuration blueprints for <code className="text-purple-300 font-mono">CLAUDE.md</code>, <code className="text-purple-300 font-mono">AGENTS.md</code>, subagent definitions, and <code className="text-purple-300 font-mono">.claudeignore</code> token savers.
        </p>
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
                  ? "bg-purple-600 text-white shadow-sm"
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
            placeholder="Search templates & files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A0A0D] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
      </div>

      {/* Master Grid: Template Cards + Live Preview Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Template List Cards */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider px-1">
            Blueprints ({filteredTemplates.length})
          </h3>

          <div className="space-y-3">
            {filteredTemplates.map((tpl) => {
              const isSelected = selectedTemplate?.id === tpl.id;
              return (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl)}
                  className={`p-4 rounded-xl border transition cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-[#1A1B23] border-purple-500/50 shadow-lg"
                      : "bg-[#16171D] border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-100 flex items-center gap-1.5">
                      <FileCode className="h-3.5 w-3.5 text-purple-400" />
                      {tpl.filename}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A0A0D] text-purple-300 border border-slate-800">
                      {tpl.category}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-200">{tpl.name}</h4>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 font-sans">
                    {tpl.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {tpl.tags.map((tag, idx) => (
                      <span key={idx} className="text-[9px] font-mono text-slate-500 bg-[#0A0A0D] px-1.5 py-0.5 rounded border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="lg:col-span-7 space-y-4">
          {selectedTemplate ? (
            <div className="bg-[#16171D] border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-mono font-bold text-slate-100">{selectedTemplate.filename}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {selectedTemplate.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{selectedTemplate.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(selectedTemplate.content)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0A0A0D] hover:bg-slate-800 text-slate-200 text-xs font-mono transition cursor-pointer border border-slate-800"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>

                  <button
                    onClick={() => handleDownload(selectedTemplate)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono transition cursor-pointer shadow-md"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Code Box */}
              <div className="bg-[#0A0A0D] rounded-xl p-4 border border-slate-800 overflow-x-auto max-h-[500px]">
                <pre className="text-xs font-mono text-slate-200 leading-relaxed">
                  <code>{selectedTemplate.content}</code>
                </pre>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

