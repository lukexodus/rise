import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNavigationState } from "../hooks/useNavigationState";
import { ReportPost } from "../components/ReportPost";
import { NotFound } from "../components/NotFound";

// Import post data to validate post existence
import mockDetailedPostsData from "../data/mockDetailedPosts.json";

export function ReportPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { restoreNavigationState } = useNavigationState();
  const [postExists, setPostExists] = useState<boolean | null>(null);

  // Check if post exists in the data
  useEffect(() => {
    if (postId) {
      const exists = postId in mockDetailedPostsData;
      setPostExists(exists);
    } else {
      setPostExists(false);
    }
  }, [postId]);

  // Handle back navigation with proper state restoration
  const handleBack = () => {
    const restored = restoreNavigationState('post');
    if (!restored) {
      navigate('/community');
    }
  };

  // Show loading state while checking post existence
  if (postExists === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#1A3E73] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  // Show NotFound if post doesn't exist
  if (!postId || !postExists) {
    return (
      <NotFound 
        title="Post Not Found"
        message="The community post you're looking for doesn't exist or may have been removed."
        showBackButton={true}
        showHomeButton={true}
      />
    );
  }

  return (
    <ReportPost
      postId={postId}
      onBack={handleBack}
    />
  );
}