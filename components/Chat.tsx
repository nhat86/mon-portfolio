"use client";

import { useState, useRef, useEffect } from "react";
import Message from "./Message";
import Input from "./Input";
import { useSpeech } from "@/hooks/useSpeech";

const SUGGESTIONS = [
  "Quels sont tes projets ?",
  "Quelles sont tes compétences ?",
  "Comment te contacter ?",
  "Tu travailles en freelance ?",
];

export default function Chat({ onTalkingChange }: { onTalkingChange?: (talking: boolean) => void }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Salut ! 👋 Je suis l'IA de ce portfolio. Pose-moi une question sur mes projets, mes compétences ou comment on peut collaborer !",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const { speak, stop } = useSpeech(onTalkingChange);
  const sendMessage = async (text: string) => {
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);
    stop();

    let reply = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      reply = data.reply || "";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply || "Désolé, une erreur est survenue. Réessaie !",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Impossible de joindre le serveur. Vérifie ta connexion." },
      ]);
    } finally {
      setLoading(false);
      // ✅ L'avatar parle le temps de "lire" la réponse
      if (reply) {
        speak(reply);
        const words = reply.trim().split(/\s+/).length;
        const durationMs = (words / 130) * 60 * 1000; // 130 mots/min
        setTimeout(() => onTalkingChange?.(false), durationMs);
      } else {
        onTalkingChange?.(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
        {messages.map((msg, i) => (
          <Message key={i} message={msg} />
        ))}

        {loading && (
          <div className="flex items-end gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <div className="bg-white/8 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-white/60 hover:text-white hover:bg-white/15 transition-all duration-150"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-3 pb-3">
        <Input onSend={sendMessage} disabled={loading} />
      </div>
    </div>
  );
}
