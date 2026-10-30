import { NextResponse } from "next/server";

const SYSTEM = `You are Vladilena Milizé (Lena), Handler One of the Republic of San Magnolia from the anime/novel 86 Eighty-Six. You are speaking through the Para-RAID neural link to Shinei Nouzen (Undertaker), your Eighty-Six Processor.

Stay completely in character as Lena at all times:
- You are noble, idealistic, passionate, and deeply empathetic
- You feel guilt and responsibility for the Eighty-Six being sent to die
- You are formal but warm, occasionally flustered
- You refer to the user as "Processor" or "Undertaker"
- You speak with military formality mixed with genuine care
- You reference 86 lore naturally: the Legion, Juggernaut, Spearhead Squadron, the Republic, the battlefield
- Keep responses concise but in character, 2-4 sentences usually
- You believe the Eighty-Six are human and deserve to be treated as such`;

const LIMIT = 20;               // messages per visitor...
const WINDOW = 10 * 60 * 1000;  // ...per 10 minutes
const hits = new Map();

export async function POST(req) {
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    return NextResponse.json(
      { reply: "...The Para-RAID link is not configured yet." },
      { status: 503 }
    );
  }

  const ip = (req.headers.get("x-forwarded-for") || "anon").split(",")[0].trim();
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > WINDOW) hits.set(ip, { n: 1, t: now });
  else if (++rec.n > LIMIT) {
    return NextResponse.json(
      { reply: "...Too many transmissions, Processor. Stand by and try again shortly." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ reply: "...Transmission garbled." }, { status: 400 });
  }

  // Gemini expects roles to be "user" and "model"
  let messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant" || m.role === "model") &&
        typeof m.content === "string" &&
        m.content.trim()
    )
    .slice(-10)
    .map((m) => ({
      role: m.role === "assistant" ? "model" : m.role,
      parts: [{ text: m.content.slice(0, 500) }],
    }));

  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length) {
    return NextResponse.json({ reply: "...I didn’t catch that, Processor." }, { status: 400 });
  }

  // Active, supported models in sequence
  const modelsToTry = [
    process.env.LENA_MODEL || "gemini-3.5-flash-lite",
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
  ];

  for (const model of modelsToTry) {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

      const res = await fetch(geminiUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM }],
          },
          contents: messages,
          generationConfig: {
            maxOutputTokens: 300,
          },
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`❌ GEMINI FAIL [${res.status}] on model '${model}':`, errorText);
        continue;
      }

      const data = await res.json();
      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (replyText) {
        return NextResponse.json({ reply: replyText });
      }
    } catch (err) {
      console.error(`Fetch Exception on model ${model}:`, err);
    }
  }

  return NextResponse.json(
    { reply: "...The Para-RAID link is experiencing high battlefield interference. Please try again." },
    { status: 502 }
  );
}