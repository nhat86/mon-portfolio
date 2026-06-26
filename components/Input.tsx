"use client";

import { useState, useRef } from "react";

type InputProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export default function Input({ onSend, disabled = false }: InputProps) {
  const [value, setValue] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;

    onSend(trimmed);
    setValue("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);

    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
    }
  };

  return (
    <div className="flex items-end gap-2 p-3 bg-white/5 backdrop-blur border border-white/10 rounded-2xl">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
        placeholder="Pose une question sur mon portfolio…"
        className="flex-1 bg-transparent text-white placeholder-white/30 text-sm resize-none outline-none leading-relaxed max-h-[120px] overflow-y-auto py-1"
        style={{ scrollbarWidth: "none" }}
      />

      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className={`
          flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
          ${
            disabled || !value.trim()
              ? "bg-white/10 text-white/30 cursor-not-allowed"
              : "bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-900/40 hover:scale-105 active:scale-95"
          }
        `}
      >
        {disabled ? (
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        )}
      </button>
    </div>
  );
}