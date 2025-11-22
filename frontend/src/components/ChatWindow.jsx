import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { User } from "lucide-react";

export default function ChatWindow({ messages, currentUser }) {
  const scrollRef = useRef();
  const [avatar, setAvatar] = useState(null);
  const [name, setName]= useState(null);

  // Auto-scroll when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Extract avatar of the OTHER user
  useEffect(() => {
    if (!messages || messages.length === 0) return;

    const otherMsg = messages.find(
      (m) => m.sender_id != currentUser.id
    );

    if (otherMsg) {
      setAvatar(otherMsg.avatar_url);
      setName(otherMsg.sender_name)
    }
  }, [messages, currentUser]);
  
  return (
    <div className="flex flex-col sm:max-h-[calc(100vh-27rem)] md:max-h-[calc(100vh-26rem)] lg:max-h-[calc(100vh-21rem)]">
      <div className="inline-flex w-full space-x-4 h-14 py-2 px-4 bg-slate-900">
        {/* Avatar */}
        {avatar ? (
          <img
            className="w-10 h-10 rounded-full"
            src={`http://localhost:5000${avatar}`}
            alt="pfp"
          />
        ) : (
          <User className="w-10 h-10 rounded-full text-gray-400" />
        )}
        <h2 className="text-gray-300 font-semibold py-2">{name}</h2>
      </div>
      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto bg-slate-800 flex flex-col"
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.message_id}
            message={msg}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}
