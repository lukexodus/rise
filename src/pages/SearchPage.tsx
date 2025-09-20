import React from "react";
import { useNavigationState } from "../hooks/useNavigationState";
import { SearchProjects } from "../components/SearchProjects";

export function SearchPage() {
  const { navigateWithState } = useNavigationState();

  // Handle project clicks with navigation state management
  const handleProjectClick = (projectId: string) => {
    navigateWithState(`/project/${projectId}`, 'search');
  };

  return (
    <SearchProjects onProjectClick={handleProjectClick} />
  );
}