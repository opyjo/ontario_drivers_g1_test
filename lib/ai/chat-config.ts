export const CHAT_ROLES = ["user", "assistant"] as const;

export type ChatRole = (typeof CHAT_ROLES)[number];

export const AI_CHAT_MODEL = "kimi-k2.6" as const;

interface ConversationMessage {
  role: ChatRole;
  content: string;
  type?: string;
  isLoading?: boolean;
  isSynthetic?: boolean;
}

export function toConversationHistory(
  messages: ConversationMessage[],
  limit = 4
) {
  return messages
    .filter(
      (message) =>
        !message.isLoading &&
        !message.isSynthetic &&
        message.type !== "error"
    )
    .slice(-limit)
    .map(({ role, content }) => ({ role, content }));
}
