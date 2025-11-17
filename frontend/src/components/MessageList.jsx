import React from "react";
import { MessageCircleDashed } from "lucide-react";
import MessageCard from "./MessageCard";

export default function MessageList({ messages }) {
  if (!messages.length) {
    return (
      <div className="text-center py-12">
        <MessageCircleDashed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-1">
      {messages.map((message) => (
        <MessageCard key={message.id} Message={message} />
      ))}
    </div>
  );
}