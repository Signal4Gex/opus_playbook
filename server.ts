import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "2mb" }));

// Initialize Gemini lazily/safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Prompt / Spec Auditor API
app.post("/api/audit-prompt", async (req, res) => {
  try {
    const { promptText, targetModel, projectScope } = req.body;
    if (!promptText || typeof promptText !== "string") {
      res.status(400).json({ error: "promptText is required" });
      return;
    }

    const ai = getGeminiClient();
    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `You are an expert Anthropic Claude Opus 5 & Cloud Code agent prompt architect.
Analyze the following prompt/spec for an agentic coding task.
Target Model: ${targetModel || "Cloud Code Opus 5"}
Project Scope: ${projectScope || "General Full-Stack"}

Prompt to analyze:
"""
${promptText}
"""

Provide a structured JSON output with the following EXACT fields:
- "score": number from 0 to 100 assessing clarity, boundaries, and agentic suitability.
- "overconstrainedScore": number from 0 to 100 (0 = lean & flexible, 100 = overconstrained with micromanaging procedural instructions).
- "strengths": array of strings (what is well written).
- "weaknesses": array of strings (ambiguities, missing acceptance criteria, or bloat).
- "powerUserRefinedPrompt": a redesigned, production-ready version optimized specifically for Cloud Code Opus 5 (using XML tags, clear acceptance criteria, boundary rules, and non-micromanaged autonomy).
- "keyRecommendations": array of strings (actionable rules for improving this prompt).

Return ONLY valid JSON without markdown wrapping.`,
        });

        const text = response.text || "";
        const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleanJson);
        res.json({ success: true, analysis: parsed, source: "gemini" });
        return;
      } catch (geminiErr) {
        console.warn("Gemini call failed, falling back to rule-based auditor:", geminiErr);
      }
    }

    // Heuristic Rule-Based Fallback
    const length = promptText.length;
    const wordCount = promptText.trim().split(/\s+/).length;
    const hasXmlTags = /<[a-z_]+>/i.test(promptText);
    const hasAcceptanceCriteria = /acceptance|criteria|expected|verify|test/i.test(promptText);
    const hasBoundaries = /do not|never|avoid|forbidden|must not|constraint/i.test(promptText);
    const isMicroManaged = /step 1|step 2|first do|then write|line by line|function by function/i.test(promptText);

    let score = 65;
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const keyRecommendations: string[] = [];

    if (hasXmlTags) {
      score += 10;
      strengths.push("Uses structured tags (<context>, <requirements>, etc.) for crisp boundary separation.");
    } else {
      weaknesses.push("Lacks structured XML block framing (<spec>, <constraints>, <context>).");
      keyRecommendations.push("Wrap task context and rules in semantic XML blocks to maximize Claude's attention mask.");
    }

    if (hasAcceptanceCriteria) {
      score += 15;
      strengths.push("Defines explicit verification or acceptance criteria.");
    } else {
      weaknesses.push("Missing clear completion conditions or unit test verification commands.");
      keyRecommendations.push("Add a <verification> block specifying exact commands (e.g. `npm test`) for Opus 5 to check its own work.");
    }

    if (hasBoundaries) {
      score += 10;
      strengths.push("Includes clear boundary constraints and negative rules.");
    } else {
      weaknesses.push("No explicit 'Do Not' constraints or scope boundaries.");
      keyRecommendations.push("Add a <never_do> section to prevent unwanted refactors or bloat.");
    }

    if (isMicroManaged) {
      score -= 15;
      weaknesses.push("Contains procedural step-by-step micromanagement that restricts Opus 5's intrinsic reasoning.");
      keyRecommendations.push("Opus 5 performs best with declarative intent! Remove procedural step-by-step instructions and specify desired outcomes instead.");
    } else {
      strengths.push("Declarative structure allows Opus 5 to auto-plan tools efficiently.");
    }

    const overconstrainedScore = isMicroManaged ? 78 : wordCount > 400 ? 55 : 20;

    const powerUserRefinedPrompt = `<spec>
<title>Refined Power-User Spec</title>
<context>
${promptText}
</context>

<requirements>
- Deliver full functional implementation meeting all stated goals.
- Maintain strict type safety and zero console warnings.
- Keep system prompts & instructions modular and concise.
</requirements>

<never_do>
- Do NOT rewrite unrelated modules or introduce unrequested third-party dependencies.
- Do NOT output placeholder functions, mock handlers, or incomplete code blocks.
</never_do>

<verification>
- Run linting and build commands to verify build success before completing.
</verification>
</spec>`;

    res.json({
      success: true,
      analysis: {
        score: Math.min(100, Math.max(30, score)),
        overconstrainedScore,
        strengths,
        weaknesses,
        powerUserRefinedPrompt,
        keyRecommendations,
      },
      source: "rule_engine",
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Server error auditing prompt" });
  }
});

async function startServer() {
  // Vite middleware for dev or static serving for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
