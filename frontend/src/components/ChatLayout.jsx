import React, { useEffect, useState, useCallback } from "react";
import ConversationsList from "./ConversationsList";

export default function ChatLayout({
  children,
  conversations,
  currentUser,
  selectedConv,
  onSelectConversation
}) {
  const [otherUser, setOtherUser] = useState(null);

  // Fetch the opposite participant for the selected conversation
  const getOtherUser = useCallback(async () => {
    if (!selectedConv || !selectedConv.other_user_id) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/profiles/${selectedConv.other_user_id}`
      );
      const data = await res.json();
      setOtherUser(data);
    } catch (error) {
      console.error("Error fetching other user:", error);
    }
  }, [selectedConv]);

  // Fetch when selectedConv changes
  useEffect(() => {
    getOtherUser();
  }, [getOtherUser]);

  return (
    <div className="lg:flex lg:h-[calc(100vh-16rem)] shadow-md shadow-gray-400 lg:rounded-lg bg-gray-800">
      {/* Sidebar */}
      <div className="min-w-6 h-56 lg:h-auto border-r border-gray-700 overflow-y-auto">
        <ConversationsList
          conversations={conversations}
          currentUser={currentUser}
          onSelectConversation={onSelectConversation}
          selectedConv={selectedConv}
        />
      </div>
      <div className="flex-1 flex flex-col min-h-96 lg:h-full">
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
