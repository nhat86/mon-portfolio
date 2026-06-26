// app/api/tts/route.js

export async function POST(req) {
  try {
    const { text } = await req.json();

    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/XcxMocZnMB3vEEkpoBRk",
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ELEVENLABS ERROR:", errorText);
      return new Response(errorText, { status: 500 });
    }

    const audio = await response.arrayBuffer();

    return new Response(audio, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return new Response("Server error", { status: 500 });
  }
}