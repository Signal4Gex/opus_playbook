export type TabType = 
  | "core-concepts"
  | "best-practices"
  | "playbook" 
  | "architect" 
  | "auditor" 
  | "calculator" 
  | "slash-commands" 
  | "templates";

export interface GuideArticle {
  id: string;
  title: string;
  subtitle: string;
  category: "Core Philosophy" | "Context & Memory" | "Subagents" | "Spec Engineering" | "Slash Commands" | "Workflows";
  readTime: string;
  badge?: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
    codeSnippet?: {
      language: string;
      code: string;
      title?: string;
    };
    callout?: {
      type: "tip" | "warning" | "insight" | "rule";
      text: string;
    };
    beforeAfter?: {
      badTitle: string;
      badCode: string;
      badReason: string;
      goodTitle: string;
      goodCode: string;
      goodReason: string;
    };
  }[];
}

export interface SpecTemplate {
  id: string;
  name: string;
  filename: string;
  category: "Config" | "Subagent" | "Master Spec" | "Context Saver";
  description: string;
  content: string;
  tags: string[];
}

export interface SlashCommandItem {
  command: string;
  menuLabel: string;
  category: "System" | "Context" | "Subagents" | "Debugging" | "Workflow" | "Git & PRs" | "Configuration";
  description: string;
  usage: string;
  whenToUse: string;
  powerTip: string;
  example: string;
  shortcut?: string;
}

export interface CoreConceptItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  summary: string;
  details: string;
  keyComponents: {
    name: string;
    description: string;
    role: string;
  }[];
  powerUserWorkflow: string[];
  codeExample?: {
    filename: string;
    code: string;
  };
}

export interface BestPracticeItem {
  id: string;
  title: string;
  category: "Memory & Context" | "Prompt Spec Engineering" | "Subagent Delegation" | "Tooling & Verification" | "Workflow Speed";
  impact: "High Impact" | "Critical" | "Pro Tip";
  summary: string;
  problemStatement: string;
  recommendedSolution: string;
  codeOrPromptExample: string;
  stepByStepAction: string[];
}

export interface PromptAuditResult {
  score: number;
  overconstrainedScore: number;
  strengths: string[];
  weaknesses: string[];
  powerUserRefinedPrompt: string;
  keyRecommendations: string[];
}

export interface ArchitectState {
  projectType: "fullstack" | "frontend" | "backend" | "refactor" | "bugfix" | "library";
  primaryStack: string;
  testingFramework: string;
  lintCommand: string;
  enableSubagents: boolean;
  subagentRoles: string[];
  strictness: "lean" | "balanced" | "strict";
  includeXmlTags: boolean;
  maxContextBudget: number;
  customConstraints: string;
  projectName: string;
}
