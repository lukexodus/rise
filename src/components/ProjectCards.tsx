import React from "react";
import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui/button";

const mockProjects = [
  {
    id: 1,
    title: "Metro Manila Subway Project Phase 2",
    budget: 75000000000,
    progress: 68,
    status: "ongoing" as const,
    location: "Metro Manila",
    endDate: "Dec 2025"
  },
  {
    id: 5,
    title: "Mindanao Rural Electrification Program",
    budget: 12500000000,
    progress: 100,
    status: "completed" as const,
    location: "Mindanao",
    endDate: "Mar 2024"
  },
  {
    id: 3,
    title: "National Broadband Infrastructure Program",
    budget: 45000000000,
    progress: 42,
    status: "delayed" as const,
    location: "Nationwide",
    endDate: "Jun 2026"
  },
  {
    id: 2,
    title: "CALABARZON Water Supply System Expansion",
    budget: 8200000000,
    progress: 85,
    status: "ongoing" as const,
    location: "CALABARZON",
    endDate: "Sep 2024"
  },
  {
    id: 4,
    title: "Cebu BRT System Implementation",
    budget: 16800000000,
    progress: 100,
    status: "completed" as const,
    location: "Central Visayas",
    endDate: "Jan 2024"
  },
  {
    id: 7,
    title: "Palawan Airport Modernization",
    budget: 5600000000,
    progress: 25,
    status: "delayed" as const,
    location: "MIMAROPA",
    endDate: "Nov 2024"
  }
];

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