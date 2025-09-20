import React from "react";
import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui/button";
import { useNavigationState } from "../hooks/useNavigationState";

// Import data from external JSON file
import projectsData from "../data/projects.json";

// Convert the projects data to the format expected by ProjectCard
const mockProjects = Object.values(projectsData).map(project => ({
  id: parseInt(project.id.split('-')[2]),
  title: project.title,
  budget: project.budget.total,
  progress: project.progress,
  status: project.status as "ongoing" | "completed" | "delayed",
  location: project.location,
  endDate: project.endDate,
  sector: project.sector
}));

interface ProjectCardsProps {
  onProjectClick?: (projectId: string) => void;
  onSeeMore?: (category: "ongoing" | "completed" | "delayed") => void;
}

export function ProjectCards({ onProjectClick, onSeeMore }: ProjectCardsProps) {
  const { navigateWithState } = useNavigationState();
  const ongoingProjects = mockProjects.filter(p => p.status === "ongoing");
  const completedProjects = mockProjects.filter(p => p.status === "completed");
  const delayedProjects = mockProjects.filter(p => p.status === "delayed");

  const handleSeeMore = (category: "ongoing" | "completed" | "delayed") => {
    navigateWithState(`/list/${category}`, 'home');
    // Remove the onSeeMore callback since we're handling navigation directly
  };

  return (
    <div className="px-4 lg:px-8 py-4 lg:py-6">
      <div className="lg:max-w-6xl lg:mx-auto space-y-6 lg:space-y-8">
        <div>
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h2 className="text-lg lg:text-xl font-heading font-medium text-[#1A3E73]">Ongoing Projects</h2>
            {ongoingProjects.length > 4 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSeeMore("ongoing")}
                className="text-[#1A3E73] hover:bg-transparent relative after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-0 after:bg-[#1A3E73] after:transition-all after:duration-300 after:ease-out hover:after:w-full hover:after:left-0"
              >
                See More
              </Button>
            )}
          </div>
          <div className="space-y-3 md:grid md:grid-cols-2 2xl:grid-cols-3 md:gap-4 md:space-y-0">
            {ongoingProjects.slice(0, 4).map(project => (
              <ProjectCard key={project.id} {...project} onProjectClick={onProjectClick} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h2 className="text-lg lg:text-xl font-heading font-medium text-[#1A3E73]">Completed Projects</h2>
            {completedProjects.length > 4 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSeeMore("completed")}
                className="text-[#1A3E73] hover:bg-transparent relative after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-0 after:bg-[#1A3E73] after:transition-all after:duration-300 after:ease-out hover:after:w-full hover:after:left-0"
              >
                See More
              </Button>
            )}
          </div>
          <div className="space-y-3 md:grid md:grid-cols-2 2xl:grid-cols-3 md:gap-4 md:space-y-0">
            {completedProjects.slice(0, 4).map(project => (
              <ProjectCard key={project.id} {...project} onProjectClick={onProjectClick} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h2 className="text-lg lg:text-xl font-heading font-medium text-[#1A3E73]">Delayed Projects</h2>
            {delayedProjects.length > 4 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSeeMore("delayed")}
                className="text-[#1A3E73] hover:bg-transparent relative after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-0 after:bg-[#1A3E73] after:transition-all after:duration-300 after:ease-out hover:after:w-full hover:after:left-0"
              >
                See More
              </Button>
            )}
          </div>
          <div className="space-y-3 md:grid md:grid-cols-2 2xl:grid-cols-3 md:gap-4 md:space-y-0">
            {delayedProjects.slice(0, 4).map(project => (
              <ProjectCard key={project.id} {...project} onProjectClick={onProjectClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}