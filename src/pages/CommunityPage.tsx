import React from "react";
import { useNavigationState } from "../hooks/useNavigationState";
import { CommunityFeed } from "../components/CommunityFeed";

export function CommunityPage() {
  const { navigateWithState } = useNavigationState();

  // Handle post clicks with navigation state management
  const handlePostClick = (postId: string) => {
    navigateWithState(`/community/post/${postId}`, 'community');
  };

  return (
    <CommunityFeed onPostClick={handlePostClick} />
  );
}