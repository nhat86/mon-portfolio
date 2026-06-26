import groq from "@/lib/groq";
import { SYSTEM_PROMPT } from "@/lib/prompt";

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Messages invalides" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      max_tokens: 512,
      temperature: 0.7,
      stream: false,
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply) {
      return Response.json({ error: "Pas de réponse" }, { status: 500 });
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("Groq API error:", error);
    return Response.json(
      { error: "Erreur serveur", details: error.message },
      { status: 500 }
    );
  }
}
