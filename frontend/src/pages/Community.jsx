import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import CommunityList from "../components/CommunityList";
import { getCurrentUser } from "../lib/auth";
import Messages from "./MessagePage";
import { MessageCircleDashed } from "lucide-react";

export default function Community() {
  const [Community, setCommunity] = useState([]);
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

  return (
    <Layout>
      <div className="flex justify-between items-center mb-2 rounded-lg p-4 pb-0">
        <h2 className="text-3xl font-bold text-gray-200">STEM Bridge Community</h2>
      </div>
      <h5 className="text-l font-medium p-4 pt-0 text-gray-400 mb-8">Click on the mail icon to start a conversation</h5>

      <CommunityList communitys={Community} />
    </Layout>
  );
}
