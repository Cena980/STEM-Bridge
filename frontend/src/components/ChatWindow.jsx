import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, currentUser }) {
  const scrollRef = useRef();

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 bg-slate-800 flex flex-col"
    >
      {messages.map((msg) => (
        <MessageBubble key={msg.message_id} message={msg} currentUser={currentUser} />
      ))}
    </div>
  );
}
