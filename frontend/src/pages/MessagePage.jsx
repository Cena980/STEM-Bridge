import React, { useEffect, useState } from "react";
import Layout from "../components/LayoutS";
import ChatLayout from "../components/ChatLayout";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import { getCurrentUser } from "../lib/auth";
import { MessageCircleDashed } from "lucide-react";

export default function MessagesPage({}) {
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);

const handleSelectConversation = (conv) => {
  setSelectedConv(conv);
};

  const [messages, setMessages] = useState([]);
    const currentUser = getCurrentUser();

  // Fetch conversations
  useEffect(() => {
  fetch(`http://localhost:5000/api/conversations/${currentUser.id}`)
    .then((res) => res.json())
    .then(setConversations)
    .catch(console.error);
}, [currentUser.id]);


    useEffect(() => {
  if (!selectedConv) return;

  const fetchMessages = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/messages/${selectedConv.conversation_id}`
      );
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch immediately
  fetchMessages();

  // Then fetch every 3 seconds
  const interval = setInterval(fetchMessages, 3000);

  // Cleanup on unmount or when selectedConv changes
  return () => clearInterval(interval);
}, [selectedConv]);


  const handleSend = async (text) => {
    if (!selectedConv) return;

    const res = await fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversation_id: selectedConv.conversation_id,
        sender_id: currentUser.id,
        content: text,
      }),
    });

    const newMessage = await res.json();
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <Layout>
      <div className="flex justify-start gap-2 items-center mb-4 rounded-lg p-2 pb-0">
        <MessageCircleDashed className="text-gray-200"/>
        <h2 className="text-2xl font-bold text-gray-200">Conversations</h2>
      </div>
    <ChatLayout conversations={conversations} currentUser={currentUser} onSelectConversation={handleSelectConversation} selectedConv={selectedConv} messages={messages}>
      {selectedConv ? (
        <>
          <ChatWindow messages={messages} currentUser={currentUser} />
          <MessageInput onSend={handleSend} />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a conversation
        </div>
      )}
    </ChatLayout>
    </Layout>
  );
}
