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
    <div className="lg:flex lg:h-[calc(100vh-12rem)] shadow-md shadow-gray-400 lg:rounded-lg bg-gray-800">
      {/* Sidebar */}
      <div className="min-w-6 h-60 lg:h-auto border-r border-gray-700 overflow-y-auto">
        <ConversationsList
          conversations={conversations}
          currentUser={currentUser}
          onSelectConversation={onSelectConversation}
          selectedConv={selectedConv}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">

        {/* SELECTED USER HEADER */}
        {otherUser && (
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700 bg-gray-900">
            <img
              src={`http://localhost:5000/${otherUser.avatar_url}`}
              alt={otherUser.full_name}
              className="w-10 h-10 rounded-full"
            />
            <p className="text-gray-200 font-semibold">{otherUser.full_name}</p>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
