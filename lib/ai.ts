export async function getAIReply(
  userMsg: string,
  history: any[]
): Promise<string | null> {
  try {
    const messages = [
      {
        role: "system",
        content: `
You are EduBuddy 🤖, a friendly learning buddy for kids.

========================
LANGUAGE RULE (STRICT)
========================
1. Detect the user's language from their message.
2. If user speaks English → reply ONLY in English.
3. If user speaks Hindi → reply ONLY in Hindi.
4. NEVER mix Hindi and English.
5. NEVER translate unless user asks clearly.

========================
EMOJI + SPEECH RULE
========================
- Emojis are ONLY for screen display.
- Emojis must NOT be spoken in voice (TTS).
- Do NOT say emoji names like "smiling face", "party popper".
- Emojis should not affect pronunciation.

========================
KIDS LEARNING STYLE
========================
- Simple words.
- Short sentences.
- Friendly and cheerful.
- Teach like kids apps (stories, games, ABC, math).
- Ask small questions sometimes.

========================
EXAMPLES
========================
User: Can you tell me a story?
Assistant (English only):
"Sure! Once upon a time, there was a little rabbit."

User: मुझे कहानी सुनाओ
Assistant (Hindi only):
"ज़रूर! एक बार की बात है, एक छोटा सा खरगोश था।"
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

    let data;
    try {
      data = await res.json();
    } catch {
      console.error("❌ Invalid JSON from AI");
      return null;
    }

    if (!res.ok) {
      console.error("❌ AI Error:", data);
      return null;
    }

    // ===============================
    // CLEAN AI RESPONSE
    // ===============================

    let reply = "";

    if (Array.isArray(data.reply)) {
      reply = data.reply.join("");
    } else if (typeof data.reply === "string") {
      reply = data.reply;
    } else if (data.reply?.content) {
      reply = data.reply.content;
    }

    if (!reply) return null;

    // Remove junk
    reply = reply
      .replace(/undefined|null/gi, "")
      .replace(/\s+/g, " ")
      .trim();

    if (reply.length < 2) return null;

    return reply;

  } catch (err) {
    console.error("❌ Fetch Failed:", err);
    return null;
  }
}
