import React from "react";
import { UsersRound } from "lucide-react";
import CommunityCard from "./CommunityCard";
import { getCurrentUser } from "../lib/auth";

export default function CommunityList({ communitys }) {
  const currentUser = getCurrentUser();
  const currentUserId = currentUser.id;
  if (!communitys.length) {
    return (
      <div className="text-center py-12">
        <UsersRound className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">No Communitys found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {communitys.map((Community) => (
        <CommunityCard key={Community.id} Community={Community} />
      ))}
    </div>
  );
}