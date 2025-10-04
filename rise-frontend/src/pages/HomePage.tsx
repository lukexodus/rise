import React from "react";
import { useNavigationState } from "../hooks/useNavigationState";
import { BudgetOverview } from "../components/BudgetOverview";
import { ProjectCards } from "../components/ProjectCards";

export function HomePage() {
  const { navigateWithState } = useNavigationState();

  // Handle project clicks with navigation state and scroll position storage
  const handleProjectClick = (projectId: string) => {
    navigateWithState(`/project/${projectId}`, 'home');
  };

// Mock budget data
const budgetData = {
  totalBudget: 6326000000000, // 6.326 Trillion PHP
  allocated: 4640000000000, // 4.64 Trillion PHP (Supportable by revenues)
  spent: 3480000000000, // 3.48 Trillion PHP (Estimated 55% spent)
  remaining: 2846000000000, // 2.846 Trillion PHP (Estimated 45% remaining)
};

  return (
    <>
      {/* Budget Overview */}
      <div className="bg-gradient-to-br from-[#1A3E73] to-[#2A4E83]">
        <BudgetOverview {...budgetData} />
      </div>
      
      {/* Project Cards */}
      <ProjectCards onProjectClick={handleProjectClick} />
    </>
  );
}