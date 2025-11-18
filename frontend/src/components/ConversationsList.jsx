import React, { useEffect, useState } from "react";

export default function ConversationsList({
  conversations,
  currentUser,
  onSelectConversation,
  selectedConv
}) {
  const [usersCache, setUsersCache] = useState({});


  // Get the other user's ID (backend gives this now)
  const getOtherUserId = (conv) => conv.other_user_id || null;

  // Fetch profiles for all conversations ONCE
  useEffect(() => {
    conversations.forEach(conv => {
      const otherId = getOtherUserId(conv);

      if (otherId && !usersCache[otherId]) {
        fetch(`http://localhost:5000/api/profiles/${otherId}`)
          .then(res => res.json())
          .then(data => {
            setUsersCache(prev => ({ ...prev, [otherId]: data[0] }));
          })
          .catch(console.error);
      }
    });
  }, [conversations]);

  return (
    <div className="p-4 shadow-md rounded-lg bg-gray-700">
      {conversations.map(conv => {
        const otherId = getOtherUserId(conv);
        const otherUser = usersCache[otherId];

        return (
          <div
            key={conv.conversation_id}
            onClick={() => onSelectConversation(conv)}
            className={`flex items-center justify-between border-b rounded-t-lg transition-all duration-300 p-3 hover:bg-gray-800 cursor-pointer ${
              selectedConv?.conversation_id === conv.conversation_id
                ? "bg-gray-700"
                : ""
            }`}
          >
            <div className="flex items-center space-x-3">
              {otherUser && (
                <img
                  src={`http://localhost:5000${otherUser.avatar_url}`}
                  alt={otherUser.full_name}
                  className="w-10 h-10 rounded-full"
                />
              )}

              <div>
                <p className="text-white font-semibold">
                  {conv.type === "group"
                    ? conv.group_name
                    : otherUser?.full_name || "Chat"}
                </p>

                <p className="text-gray-400 text-sm truncate">
                  {conv.last_message_snippet}
                </p>
              </div>
            </div>

            {conv.unread_count > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 rounded-full">
                {conv.unread_count}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
