import React from "react";
import { ArrowLeft, Filter, Search, Calendar, MapPin, FileText, DollarSign, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ProjectCard } from "./ProjectCard";
import projectsData from "../data/projects.json";
import locationsData from "../data/locations.json";

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

interface ProjectListProps {
  category: "ongoing" | "completed" | "delayed";
  onBack: () => void;
  onProjectClick?: (projectId: string) => void;
}

export function ProjectList({ category, onBack, onProjectClick }: ProjectListProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("title");
  const [filterLocation, setFilterLocation] = React.useState("all");

  const handleBack = () => {
    onBack();
  };

  // Filter projects by category
  const categoryProjects = mockProjects.filter(p => p.status === category);

  // Get unique locations for filter dropdown from actual project data
  const projectLocations = Array.from(new Set(categoryProjects.map(p => p.location))).sort();

  // Apply filters and search
  const filteredProjects = categoryProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = filterLocation === "all" || project.location === filterLocation;
    
    return matchesSearch && matchesLocation;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "budget":
        return b.budget - a.budget;
      case "progress":
        return b.progress - a.progress;
      case "location":
        return a.location.localeCompare(b.location);
      default:
        return 0;
    }
  });

  const getCategoryTitle = () => {
    switch (category) {
      case "ongoing": return "Ongoing Projects";
      case "completed": return "Completed Projects";
      case "delayed": return "Delayed Projects";
      default: return "Projects";
    }
  };

  const getCategoryColor = () => {
    switch (category) {
      case "ongoing": return "text-blue-600";
      case "completed": return "text-green-600";
      case "delayed": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  const getCategoryBgColor = () => {
    switch (category) {
      case "ongoing": return "bg-blue-50";
      case "completed": return "bg-green-50";
      case "delayed": return "bg-orange-50";
      default: return "bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1A3E73] text-white p-4">
        <div className="lg:max-w-6xl lg:mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-white hover:bg-white/10 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex flex-col space-y-0">
              <h1 className="text-xl lg:text-2xl font-heading font-semibold text-white">
                {getCategoryTitle()}
              </h1>
              <p className="text-sm font-body text-white/80 mt-1">
                {sortedProjects.length} project{sortedProjects.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-3 lg:flex lg:items-center lg:gap-4 lg:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-body bg-white text-gray-900"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] xl:w-48 font-body bg-white text-gray-900">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="title" className="text-gray-900">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Title</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="budget" className="text-gray-900">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>Budget</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="progress" className="text-gray-900">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      <span>Progress</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="location" className="text-gray-900">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Location</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="w-[140px] xl:w-48 font-body bg-white text-gray-900">
                  <MapPin className="w-4 h-4 mr-1" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all" className="text-gray-900">All Locations</SelectItem>
                  {projectLocations.map(location => (
                    <SelectItem key={location} value={location} className="text-gray-900">{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="px-4 lg:px-8 py-6 lg:py-8">
        <div className="lg:max-w-6xl lg:mx-auto">
          {sortedProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-heading font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 font-body">
                Try adjusting your search criteria or filters
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedProjects.map(project => (
                <ProjectCard key={project.id} {...project} onProjectClick={onProjectClick} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}