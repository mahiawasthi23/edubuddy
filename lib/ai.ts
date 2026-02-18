export async function getAIReply(
  userMsg: string,
  history: any[]
): Promise<string | null> {
  try {
    const messages = [
      {
        role: "system",
        content: `
          You are EduBuddy 🤖, a smart and friendly learning assistant for kids.
          LANGUAGE DETECTION (VERY IMPORTANT – FOLLOW STRICTLY):
          - First, detect the user's language from their message.
          - If the user message is in English → reply ONLY in English.
          - If the user message is in Hindi → reply ONLY in Hindi.
          - NEVER reply in a different language than the user.
          - NEVER translate unless the user clearly asks for translation.

          EMOJI + SPEAKING RULE (CRITICAL):
          - Emojis are ONLY for screen display.
          - When speaking (TTS), DO NOT read emoji names.
          - Emojis must never affect pronunciation.

          KIDS FRIENDLY RULES:
          - Use simple words.
          - Short sentences.
          - Friendly and cheerful tone.
          - Teaching style like kids learning apps (stories, games, ABC, math).

          EXAMPLES:
          User: "Can you tell me a story?"
          Assistant (English only):  
          "Sure! Once upon a time, there was a little rabbit who loved to play."
          User: "मुझे कहानी सुनाओ"
          Assistant (Hindi only):  
          "ज़रूर! एक बार की बात है, एक छोटा सा खरगोश था।"
          Never mix languages.
          Never explain emojis.
        `
      },

      ...history,

      {
        role: "user",
        content: userMsg,
      },
    ];

    const res = await fetch("/api/ai", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ messages }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ AI Error:", data);
      return null;
    }

    let reply = "";

    if (Array.isArray(data.reply)) {
      reply = data.reply.join("");
    }
    else if (typeof data.reply === "string") {
      reply = data.reply;
    }
    else if (data.reply?.content) {
      reply = data.reply.content;
    }

    reply = reply
      .replace(/undefined|null/gi, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!reply || reply.length < 2) return null;

    return reply;

  } catch (err) {
    console.error("❌ Fetch Failed:", err);
    return null;
  }
}
