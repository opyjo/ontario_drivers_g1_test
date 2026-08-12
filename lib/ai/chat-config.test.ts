import { describe, expect, it } from "vitest";
import {
  AI_CHAT_MODEL,
  CHAT_ROLES,
  toConversationHistory,
} from "./chat-config";

describe("AI chat configuration", () => {
  it("uses the configured Moonshot general-purpose model", () => {
    expect(AI_CHAT_MODEL).toBe("kimi-k2.6");
  });

  it("shares the API-compatible conversation roles", () => {
    expect(CHAT_ROLES).toEqual(["user", "assistant"]);
  });

  it("serializes recent completed messages with assistant roles intact", () => {
    const history = toConversationHistory([
      { role: "assistant", content: "Welcome", isSynthetic: true },
      { role: "user", content: "First question" },
      { role: "assistant", content: "First answer" },
      { role: "assistant", content: "Loading", isLoading: true },
      { role: "assistant", content: "Previous failure", type: "error" },
      { role: "user", content: "Second question" },
    ]);

    expect(history).toEqual([
      { role: "user", content: "First question" },
      { role: "assistant", content: "First answer" },
      { role: "user", content: "Second question" },
    ]);
  });
});
