import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNavigationState } from "../hooks/useNavigationState";
import { ProjectList } from "../components/ProjectList";

export function ProjectListPage() {
  const { category } = useParams<{ category: "ongoing" | "completed" | "delayed" }>();
  const navigate = useNavigate();
  const { restoreNavigationState, navigateWithState } = useNavigationState();

  // Handle back navigation with state restoration
  const handleBack = () => {
    const restored = restoreNavigationState('home', '/');
    if (!restored) {
      navigate('/');
    }
  };

  // Handle project clicks with proper navigation state
  const handleProjectClick = (projectId: string) => {
    navigateWithState(`/project/${projectId}?from=list&category=${category}`, 'list');
  };

  if (!category) {
    return (
      <div className="p-4">
        <div className="text-center text-muted-foreground">
          Invalid category.
        </div>
      </div>
    );
  }

  return (
    <ProjectList
      category={category}
      onBack={handleBack}
      onProjectClick={handleProjectClick}
    />
  );
}