import React, { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex p-4 max-w-calc(screen-<2rem>) border-t border-gray-700">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-l-lg bg-gray-700 text-white outline-none"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
}
