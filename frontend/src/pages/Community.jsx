import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import CommunityList from "../components/CommunityList";
import MessageList from "../components/MessageList";
import { getCurrentUser } from "../lib/auth";
import { Plus } from "lucide-react";

export default function Community() {
  const [Community, setCommunity] = useState([]);
  const [Message, setMessage] = useState([]);
  const user = getCurrentUser();
  const role = user?.role || "student";
  const p_Id = user?.id || "";

  const fetchCommunitys = async () => {
  try {
    let url = "http://localhost:5000/api/auth/Community";

    const res = await fetch(url);
    const data = await res.json();

    setCommunity(data);
  } catch (err) {
    console.error("Error fetching Communitys:", err);
  }
};

  useEffect(() => {
  fetchCommunitys();
}, [role, p_Id]);

const fetchMessages = async () => {
  try {
    let url = "http://localhost:5000/api/auth/messages/${p_Id}";

    const res = await fetch(url);
    const data = await res.json();

    setCommunity(data);
  } catch (err) {
    console.error("Error fetching Messages:", err);
  }
};

  useEffect(() => {
  fetchMessages();
}, p_Id);


  return (
    <Layout>
      <div className="flex justify-between items-center mb-8 rounded-lg p-4">
        <h2 className="text-3xl font-bold text-gray-200">Messages</h2>
      </div>

      <MessageList messages={Message} />

      <div className="flex justify-between items-center mb-8 rounded-lg p-4">
        <h2 className="text-3xl font-bold text-gray-200">STEM Bridge Community</h2>
      </div>

      <CommunityList communitys={Community} />
    </Layout>
  );
}
