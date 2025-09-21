import React from "react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  PhilippinePeso, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Play, 
  CheckCircle, 
  AlertTriangle 
} from "lucide-react";
import { getSectorIcon } from "../utils/iconUtils";

interface ProjectCardProps {
  id: string;
  title: string;
  budget: number;
  progress: number;
  status: "ongoing" | "completed" | "delayed" | "suspended";
  location: string;
  endDate: string;
  sector?: string;
  onProjectClick?: (projectId: string) => void;
}

export function ProjectCard({ id, title, budget, progress, status, location, endDate, sector, onProjectClick }: ProjectCardProps) {
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

  const getStatusIcon = () => {
    switch (status) {
      case "ongoing":
        return <Play className="w-3 h-3" />;
      case "completed":
        return <CheckCircle className="w-3 h-3" />;
      case "delayed":
        return <AlertTriangle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const handleClick = () => {
    if (onProjectClick) {
      // Map home page project IDs to the correct project detail IDs
      let projectId = id.toString();
      // // Special mapping for Bataan Nuclear Plant (ID 6 on home page -> PROJ-2024-009)
      // if (id === 6) {
      //   projectId = 'PROJ-2024-009';
      // }
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
        <Badge className={`text-xs px-2 py-1 flex items-center gap-1 ${getStatusColor()}`}>
          {getStatusIcon()}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <PhilippinePeso className="w-3 h-3" />
            <span>Budget: {formatCurrency(budget)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </div>
        </div>
{/* 
        {sector && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {getSectorIcon(sector, "w-3 h-3")}
            <span>Sector: {sector}</span>
          </div>
        )} */}

        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <TrendingUp className="w-3 h-3" />
              <span>Progress</span>
            </div>
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

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>Target completion: {endDate}</span>
        </div>
      </div>
    </Card>
  );
}