import React from "react";
import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui/button";

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
  endDate: project.endDate
}));

interface ProjectCardsProps {
  onProjectClick?: (projectId: string) => void;
}

export function ProjectCards({ onProjectClick }: ProjectCardsProps) {
  const ongoingProjects = mockProjects.filter(p => p.status === "ongoing");
  const completedProjects = mockProjects.filter(p => p.status === "completed");
  const delayedProjects = mockProjects.filter(p => p.status === "delayed");

  return (
    <div className="px-4 lg:px-8 py-4 lg:py-6">
      <div className="lg:max-w-6xl lg:mx-auto space-y-6 lg:space-y-8">
        <div>
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h2 className="text-lg lg:text-xl font-medium text-[#1A3E73]">Ongoing Projects</h2>
            <Button variant="ghost" size="sm" className="text-[#1A3E73] hover:bg-transparent relative after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-0 after:bg-[#1A3E73] after:transition-all after:duration-300 after:ease-out hover:after:w-full hover:after:left-0">
              See More
            </Button>
          </div>
          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            {ongoingProjects.map(project => (
              <ProjectCard key={project.id} {...project} onProjectClick={onProjectClick} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h2 className="text-lg lg:text-xl font-medium text-[#1A3E73]">Completed Projects</h2>
            <Button variant="ghost" size="sm" className="text-[#1A3E73] hover:bg-transparent relative after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-0 after:bg-[#1A3E73] after:transition-all after:duration-300 after:ease-out hover:after:w-full hover:after:left-0">
              See More
            </Button>
          </div>
          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            {completedProjects.map(project => (
              <ProjectCard key={project.id} {...project} onProjectClick={onProjectClick} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h2 className="text-lg lg:text-xl font-medium text-[#1A3E73]">Delayed Projects</h2>
            <Button variant="ghost" size="sm" className="text-[#1A3E73] hover:bg-transparent relative after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-0 after:bg-[#1A3E73] after:transition-all after:duration-300 after:ease-out hover:after:w-full hover:after:left-0">
              See More
            </Button>
          </div>
          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            {delayedProjects.map(project => (
              <ProjectCard key={project.id} {...project} onProjectClick={onProjectClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}