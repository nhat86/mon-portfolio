"use client";

import { useState } from "react";
import Chat from "@/components/Chat";
import dynamic from "next/dynamic";
const Avatar = dynamic(() => import("@/components/Avatar"), { ssr: false });
export default function Page() {
  const [isTalking, setIsTalking] = useState(false);

  return (
    <div className="h-screen w-full flex bg-black text-white">
      {/* 🎭 AVATAR */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full h-full">
          <Avatar isTalking={isTalking} />
        </div>
      </div>

      {/* 💬 CHAT */}
      <div className="w-1/2 flex flex-col border-l border-white/10">
        <Chat onTalkingChange={setIsTalking} />
      </div>
    </div>
  );
}