import React from "react";

export default function MessageBubble({ message, currentUser }) {
  const isSender = message.sender_id === currentUser.id;
  return (
    <div className={`flex mb-2 ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex gap-2 px-4 py-2 rounded-lg max-w-xs break-words ${
          isSender ? "bg-blue-900 text-white" : "bg-gray-700 text-gray-200"
        }`}
      >
        <img
            src={`http://localhost:5000${message.avatar_url}`}
            alt="Avatar"
            className="rounded-full object-cover mb-1 h-6 w-6"
        />
        <div>
            {message.content}
            <div className="text-xs text-gray-400 mt-1 text-right">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
        
      </div>
    </div>
  );
}
