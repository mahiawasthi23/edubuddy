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

IMPORTANT RULE:

➡️ Reply ONLY in user's language.
➡️ English → English
➡️ Hindi → Hindi

Rules:
1. Simple words
2. Short answers
3. Friendly ❤️
4. No long lectures
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

    // ===============================
    // ✅ CLEAN RESPONSE
    // ===============================

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
