/**
 * inspect-verify — Block 3 Pi extension
 *
 * Implements ARCH-A (sequential pipeline) on top of `project-inspector` and
 * `project-verifier` skills. Two invocation paths, each with a different
 * pedagogical purpose:
 *
 *   1. `/audit <path>` — explicit slash command. Injects a single coordinated
 *      prompt that asks the agent to run inspector then verifier in one turn.
 *      Works in BOTH interactive and non-interactive (-p / --print) modes.
 *      This is the primary, reliable path attendees install and use.
 *
 *   2. `agent_end` listener — when a turn ends and the output looks like a
 *      project-inspector structural briefing (JSON with `"architecture"` and
 *      `"entry_points"`), the extension calls `sendUserMessage` to queue a
 *      verifier follow-up. Works in INTERACTIVE mode only — `-p` mode exits
 *      after the first `agent_end` and ignores queued messages. The ambient
 *      lesson: once the pattern is wired, the system catches itself without
 *      the user remembering to invoke the verifier by name.
 *
 * Pedagogical thesis: a working engineer composes skills into self-checking
 * systems instead of running each skill by hand. Inspector finds architecture;
 * Verifier flags supply-chain risk; the extension wires them together. No
 * single skill catches everything — that's why we compose.
 */

import type {
  AgentMessage,
  ExtensionAPI,
} from "@earendil-works/pi-coding-agent";

const VERIFIER_FOLLOWUP_PROMPT =
  "The previous response looks like a project-inspector structural briefing. " +
  "Now run the project-verifier skill on the same target. Read the " +
  "dependency manifest (package.json, pyproject.toml, go.mod, etc.) of the " +
  "repository you just inspected, identify pinned exact versions, and use web " +
  "search to look up known CVE / GHSA advisories per pinned version. Emit the " +
  "verifier's JSON report — do not produce another structural briefing.";

const AUDIT_COMMAND_PROMPT = (target: string) =>
  `Audit the repository at \`${target}\`. ` +
  `Step 1 — run the project-inspector skill: produce a structural briefing in the inspector's JSON shape. ` +
  `Step 2 — run the project-verifier skill on the same target: read the dependency manifest, identify pinned versions, look up CVE / GHSA advisories per pinned version, emit the verifier's JSON shape. ` +
  `Return both JSON outputs in order, separated by a "---" line.`;

/**
 * Extract plain text from an assistant message's content blocks.
 * AssistantMessage.content is (TextContent | ThinkingContent | ToolCall)[].
 */
function assistantText(message: AgentMessage): string {
  if (message.role !== "assistant") return "";
  const content = message.content;
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .filter((block: any) => block && block.type === "text")
    .map((block: any) => (typeof block.text === "string" ? block.text : ""))
    .join("\n");
}

/**
 * Heuristic: does the text look like a project-inspector output?
 * Matches the inspector's documented JSON schema.
 */
function looksLikeInspectorBriefing(text: string): boolean {
  return (
    text.includes('"architecture"') &&
    text.includes('"entry_points"') &&
    // Quick exclusion: don't re-fire on verifier output
    !text.includes('"lens"') &&
    !text.includes('"findings"') &&
    !text.includes('"missed_by_structural_briefing"')
  );
}

export default function (pi: ExtensionAPI) {
  // De-dupe: only fire the verifier once per distinct inspector output within
  // a single session. The fingerprint is the first ~200 chars of the output;
  // good enough for one session's worth of turns.
  const firedFingerprints = new Set<string>();

  pi.on("agent_end", async (event) => {
    const lastAssistant = [...event.messages]
      .reverse()
      .find((m: AgentMessage) => m.role === "assistant");
    if (!lastAssistant) return;

    const text = assistantText(lastAssistant);
    if (!looksLikeInspectorBriefing(text)) return;

    const fingerprint = text.slice(0, 200);
    if (firedFingerprints.has(fingerprint)) return;
    firedFingerprints.add(fingerprint);

    // Inject the verifier follow-up. `deliverAs: "followUp"` queues this for
    // the next turn so it doesn't fight an in-flight stream.
    pi.sendUserMessage(VERIFIER_FOLLOWUP_PROMPT, { deliverAs: "followUp" });
  });

  // Explicit, loop-safe path: `/audit <target>` triggers inspector + verifier
  // in a single coordinated prompt. Useful when the auto-detect heuristic
  // misses or when the user wants the pipeline by name.
  pi.registerCommand("audit", {
    description:
      "Run project-inspector then project-verifier on the given repository path.",
    handler: async (args, _ctx) => {
      const target = args.trim() || ".";
      pi.sendUserMessage(AUDIT_COMMAND_PROMPT(target));
    },
  });
}
