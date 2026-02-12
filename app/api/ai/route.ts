import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const API_KEY = process.env.NVIDIA_API_KEY;
    if (!API_KEY) {
      console.error("❌ Missing NVIDIA_API_KEY");
      return NextResponse.json({ error: "API key missing" }, { status: 500 });
    }

    console.log("📤 Sending to NVIDIA:", messages);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    let res;
    try {
      res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          Connection: "keep-alive",
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: "meta/llama3-8b-instruct",
          messages,
          temperature: 0.25,
          max_tokens: 100,
          top_p: 0.8,
        }),
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!res) return NextResponse.json({ error: "No response from AI" }, { status: 500 });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("❌ Invalid JSON:", text);
      return NextResponse.json({ error: "Bad AI response" }, { status: 500 });
    }

    if (!res.ok) {
      console.error("❌ NVIDIA ERROR:", data);
      return NextResponse.json({ error: "AI failed", details: data }, { status: 500 });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim() || "";
    console.log("✅ AI Reply:", reply);

    return NextResponse.json({ reply });

  } catch (err: any) {
    if (err?.name === "AbortError") {
      console.error("⏱️ AI Timeout");
      return NextResponse.json({ error: "⚠️ Your internet is slow. Please try again." }, { status: 504 });
    }
    console.error("❌ Server Error:", err);
    return NextResponse.json({ error: "Server crashed" }, { status: 500 });
  }
}
