"use client";

import { useEffect, useRef } from "react";

type MessageType = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  message: MessageType;
};

export default function Message({ message }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const isUser = message.role === "user";

  return (
    <div
      ref={ref}
      className={`flex items-end gap-2 mb-3 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
      )}

      <div
        className={`
          max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
          ${
            isUser
              ? "bg-gradient-to-br from-violet-600 to-indigo-700 text-white rounded-br-sm shadow-lg shadow-violet-900/30"
              : "bg-white/8 backdrop-blur-sm border border-white/10 text-gray-100 rounded-bl-sm"
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );
}