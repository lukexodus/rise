import React from "react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface ProjectCardProps {
  id: number;
  title: string;
  budget: number;
  progress: number;
  status: "ongoing" | "completed" | "delayed";
  location: string;
  endDate: string;
  onProjectClick?: (projectId: string) => void;
}

export function ProjectCard({ id, title, budget, progress, status, location, endDate, onProjectClick }: ProjectCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  const getStatusColor = () => {
    switch (status) {
      case "ongoing":
        return "bg-[#1A3E73] text-white";
      case "completed":
        return "bg-[#F2C063] text-[#1A3E73]";
      case "delayed":
        return "bg-[#BF4226] text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getProgressColor = () => {
    switch (status) {
      case "ongoing":
        return "bg-[#1A3E73]";
      case "completed":
        return "bg-[#F2C063]";
      case "delayed":
        return "bg-[#BF4226]";
      default:
        return "bg-gray-500";
    }
  };

  const handleClick = () => {
    if (onProjectClick) {
      // Map home page project IDs to the correct project detail IDs
      let projectId = `PROJ-2024-${id.toString().padStart(3, '0')}`;
      // Special mapping for Bataan Nuclear Plant (ID 6 on home page -> PROJ-2024-009)
      if (id === 6) {
        projectId = 'PROJ-2024-009';
      }
      onProjectClick(projectId);
    }
  };

  return (
    <Card 
      className="p-4 border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" 
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-[#1A3E73] leading-tight flex-1 mr-2">
          {title}
        </h3>
        <Badge className={`text-xs px-2 py-1 ${getStatusColor()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Budget: {formatCurrency(budget)}</span>
          <span>{location}</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-[#1A3E73]">{progress}%</span>
          </div>
          <div className="relative">
            <Progress 
              value={progress} 
              className="h-2 bg-gray-100"
            />
            <div 
              className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getProgressColor()}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Target completion: {endDate}
        </div>
      </div>
    </Card>
  );
}