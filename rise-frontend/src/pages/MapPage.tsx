import React from "react";
import { useNavigationState } from "../hooks/useNavigationState";
import { ProjectMap } from "../components/ProjectMap";

export function MapPage() {
  const { navigateWithState } = useNavigationState();

  // Handle project clicks with navigation state
  const handleProjectClick = (projectId: string) => {
    navigateWithState(`/project/${projectId}?from=map`, 'map');
  };

  return (
    <div className="h-full">
      <ProjectMap onProjectClick={handleProjectClick} />
    </div>
  );
}