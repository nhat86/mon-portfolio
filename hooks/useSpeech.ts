// hooks/useSpeech.ts
import { useCallback, useRef } from "react";

export function useSpeech(onTalkingChange?: (talking: boolean) => void) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speak = useCallback(async (text: string) => {
    if (typeof window === "undefined") return;

    try {
      // stop ancien audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      onTalkingChange?.(true);

      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("BACKEND ERROR:", errText);
        throw new Error(errText);
    }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        onTalkingChange?.(false);
        URL.revokeObjectURL(url);
      };

      audio.onerror = () => {
        onTalkingChange?.(false);
        URL.revokeObjectURL(url);
      };

      await audio.play();
    } catch (err) {
      console.error("Speech error:", err);
      onTalkingChange?.(false);
    }
  }, [onTalkingChange]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    onTalkingChange?.(false);
  }, [onTalkingChange]);

  return { speak, stop };
}