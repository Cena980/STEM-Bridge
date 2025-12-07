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
      <div className="flex flex-col justify-start border-[0.5pt] border-sky-500 items-start my-4 rounded-lg p-4 bg-sky-800">
        <h2 className="text-3xl font-bold text-gray-200">STEM Bridge Community</h2>
        <h5 className="text-l font-medium text-gray-400">Click on the mail icon to start a conversation</h5>
      </div>

      <CommunityList communitys={Community} />
    </Layout>
  );
}
