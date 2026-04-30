declare function gtag(...args: unknown[]): void;

function track(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof gtag !== "undefined") {
    gtag("event", eventName, params);
  }
}

export const analytics = {
  chatOpened: () => track("chat_opened", { channel: "ai_chat" }),
  chatMessageSent: (service: string) => track("chat_message_sent", { service }),
  purchaseIntentDetected: (keyword: string) => track("purchase_intent_detected", { keyword }),
  leadFormShown: (source: string) => track("lead_form_shown", { source }),
  leadSubmitted: (source: string, service: string) => track("lead_submitted", { source, service }),
  messageFeedback: (rating: "positive" | "negative") => track("message_feedback", { rating }),
  voiceCallStarted: () => track("voice_call_started"),
  voiceCallEnded: () => track("voice_call_ended"),
  fabOpened: () => track("fab_opened"),
  channelSelected: (channel: string) => track("channel_selected", { channel }),
  abVariant: (testId: string, variant: string) => track("ab_variant", { test_id: testId, variant }),
};
