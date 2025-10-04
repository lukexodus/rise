import React, { useRef } from "react";
import { useNavigationState } from "../hooks/useNavigationState";
import { CommunityFeed } from "../components/CommunityFeed";

export function CommunityPage() {
  const { navigateWithState } = useNavigationState();
  const scrollPositionRef = useRef(0);

  // Handle post clicks with navigation state management
  const handlePostClick = (postId: string) => {
    scrollPositionRef.current = window.scrollY;
    navigateWithState(`/community/post/${postId}`, 'community');
  };

  return (
    <CommunityFeed onPostClick={handlePostClick} />
  );
}