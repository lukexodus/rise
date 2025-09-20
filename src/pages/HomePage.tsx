import React from "react";
import { useNavigationState } from "../hooks/useNavigationState";
import { BudgetOverview } from "../components/BudgetOverview";
import { ProjectCards } from "../components/ProjectCards";

export function HomePage() {
  const { navigateWithState } = useNavigationState();

  // Handle project clicks with navigation state
  const handleProjectClick = (projectId: string) => {
    navigateWithState(`/project/${projectId}`, 'home');
  };

  // Handle project list navigation with navigation state
  const handleSeeMore = (category: "ongoing" | "completed" | "delayed") => {
    navigateWithState(`/list/${category}`, 'home');
  };

  // Mock budget data
  const budgetData = {
    totalBudget: 5400000000000, // 5.4 Trillion PHP
    allocated: 4300000000000, // 4.3 Trillion PHP
    spent: 2800000000000, // 2.8 Trillion PHP
    remaining: 2600000000000, // 2.6 Trillion PHP
  };

  return (
    <>
      {/* Budget Overview */}
      <div className="bg-gradient-to-br from-[#1A3E73] to-[#2A4E83]">
        <BudgetOverview {...budgetData} />
      </div>
      
      {/* Project Cards */}
      <ProjectCards 
        onProjectClick={handleProjectClick}
        onSeeMore={handleSeeMore}
      />
    </>
  );
}