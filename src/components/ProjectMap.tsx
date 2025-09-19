import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin, Search, Navigation, ZoomIn, ZoomOut, X, HelpCircle } from "lucide-react";

const mockMapProjects = [
  {
    id: 1,
    title: "Metro Manila Subway Project Phase 2",
    location: "Metro Manila",
    coordinates: { lat: 14.5995, lng: 121.0023 },
    budget: 75000000000,
    status: "ongoing" as const,
    progress: 68,
    category: "Transportation",
    position: { top: "35%", left: "48%" }
  },
  {
    id: 2,
    title: "CALABARZON Water Supply System Expansion",
    location: "CALABARZON",
    coordinates: { lat: 14.2162, lng: 121.1467 },
    budget: 8200000000,
    status: "ongoing" as const,
    progress: 85,
    category: "Utilities",
    position: { top: "40%", left: "50%" }
  },
  {
    id: 3,
    title: "National Broadband Infrastructure Program",
    location: "Nationwide",
    coordinates: { lat: 12.8797, lng: 121.7740 },
    budget: 45000000000,
    status: "delayed" as const,
    progress: 42,
    category: "Technology",
    position: { top: "50%", left: "55%" }
  },
  {
    id: 4,
    title: "Cebu BRT System Implementation",
    location: "Central Visayas",
    coordinates: { lat: 10.3157, lng: 123.8854 },
    budget: 16800000000,
    status: "completed" as const,
    progress: 100,
    category: "Transportation",
    position: { top: "55%", left: "62%" }
  },
  {
    id: 5,
    title: "Mindanao Rural Electrification Program",
    location: "Mindanao",
    coordinates: { lat: 8.9806, lng: 125.5444 },
    budget: 12500000000,
    status: "completed" as const,
    progress: 100,
    category: "Utilities",
    position: { top: "75%", left: "68%" }
  },
  {
    id: 6,
    title: "Ilocos Norte Solar Farm Project",
    location: "Ilocos Region",
    coordinates: { lat: 18.1967, lng: 120.5931 },
    budget: 8900000000,
    status: "ongoing" as const,
    progress: 36,
    category: "Utilities",
    position: { top: "15%", left: "40%" }
  },
  {
    id: 7,
    title: "Palawan Airport Modernization",
    location: "MIMAROPA",
    coordinates: { lat: 9.7417, lng: 118.7354 },
    budget: 5600000000,
    status: "delayed" as const,
    progress: 25,
    category: "Infrastructure",
    position: { top: "65%", left: "30%" }
  },
  {
    id: 8,
    title: "Bicol Regional Medical Center Upgrade",
    location: "Bicol Region",
    coordinates: { lat: 13.1391, lng: 123.7437 },
    budget: 3200000000,
    status: "ongoing" as const,
    progress: 84,
    category: "Healthcare",
    position: { top: "45%", left: "65%" }
  }
];

interface ProjectMapProps {
  onProjectClick?: (projectId: string) => void;
}

export function ProjectMap({ onProjectClick }: ProjectMapProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<typeof mockMapProjects[0] | null>(null);
  const [showLegend, setShowLegend] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Detect when scrolled past the search header (approximately 80px)
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  const getPinColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "ongoing":
        return "bg-yellow-500";
      case "delayed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-yellow-500 text-white";
      case "completed":
        return "bg-green-500 text-white";
      case "delayed":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const filteredProjects = mockMapProjects.filter(project =>
    searchQuery === "" ||
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePinClick = (project: typeof mockMapProjects[0]) => {
    setSelectedProject(selectedProject?.id === project.id ? null : project);
  };

  const handleProjectDetailClick = (project: typeof mockMapProjects[0]) => {
    if (onProjectClick) {
      onProjectClick(`PROJ-2024-${project.id.toString().padStart(3, '0')}`);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Search Header */}
      <div className="p-4 bg-white border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-0"
          />
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 overflow-hidden">
        {/* Philippines Map Outline */}
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 400 600"
            className="w-full h-full opacity-20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Luzon */}
            <path
              d="M160 30 C170 25, 185 28, 195 35 C205 42, 210 50, 215 65 C220 80, 225 95, 230 110 C235 125, 240 140, 245 155 C250 170, 255 185, 250 200 C245 215, 235 225, 225 235 C215 245, 200 250, 185 245 C170 240, 155 230, 145 220 C135 210, 130 195, 135 180 C140 165, 145 150, 150 135 C155 120, 160 105, 165 90 C170 75, 175 60, 180 45 C175 40, 170 35, 160 30 Z"
              stroke="#1A3E73"
              strokeWidth="1.5"
              fill="#E8F4FD"
            />
            
            {/* Palawan */}
            <path
              d="M90 180 C95 175, 100 180, 105 190 C110 200, 115 215, 120 230 C125 245, 130 260, 125 275 C120 290, 110 300, 100 285 C90 270, 85 255, 80 240 C75 225, 75 210, 80 195 C85 185, 87 180, 90 180 Z"
              stroke="#1A3E73"
              strokeWidth="1.5"
              fill="#E8F4FD"
            />

            {/* Visayas Group */}
            {/* Panay */}
            <path
              d="M180 280 C190 275, 200 280, 205 290 C210 300, 205 310, 195 315 C185 320, 175 315, 170 305 C165 295, 170 285, 180 280 Z"
              stroke="#1A3E73"
              strokeWidth="1.5"
              fill="#E8F4FD"
            />
            
            {/* Negros */}
            <path
              d="M210 285 C220 280, 230 285, 235 295 C240 305, 235 315, 225 320 C215 325, 205 320, 200 310 C195 300, 200 290, 210 285 Z"
              stroke="#1A3E73"
              strokeWidth="1.5"
              fill="#E8F4FD"
            />
            
            {/* Cebu */}
            <path
              d="M245 290 C250 285, 255 290, 258 300 C261 310, 258 320, 253 325 C248 330, 243 325, 240 315 C237 305, 240 295, 245 290 Z"
              stroke="#1A3E73"
              strokeWidth="1.5"
              fill="#E8F4FD"
            />
            
            {/* Bohol */}
            <path
              d="M250 315 C260 310, 270 315, 275 325 C280 335, 275 345, 265 350 C255 355, 245 350, 240 340 C235 330, 240 320, 250 315 Z"
              stroke="#1A3E73"
              strokeWidth="1.5"
              fill="#E8F4FD"
            />

            {/* Leyte */}
            <path
              d="M280 300 C290 295, 300 300, 305 310 C310 320, 305 330, 295 335 C285 340, 275 335, 270 325 C265 315, 270 305, 280 300 Z"
              stroke="#1A3E73"
              strokeWidth="1.5"
              fill="#E8F4FD"
            />

            {/* Samar */}
            <path
              d="M290 270 C300 265, 310 270, 315 280 C320 290, 315 300, 305 305 C295 310, 285 305, 280 295 C275 285, 280 275, 290 270 Z"
              stroke="#1A3E73"
              strokeWidth="1.5"
              fill="#E8F4FD"
            />

            {/* Mindanao */}
            <path
              d="M200 380 C220 375, 240 380, 260 390 C280 400, 300 415, 315 435 C330 455, 340 475, 345 495 C350 515, 345 535, 330 545 C315 555, 295 550, 275 540 C255 530, 235 515, 220 495 C205 475, 195 455, 190 435 C185 415, 185 395, 190 380 C195 375, 200 375, 200 380 Z"
              stroke="#1A3E73"
              strokeWidth="1.5"
              fill="#E8F4FD"
            />

            {/* Mindoro */}
            <path
              d="M155 250 C165 245, 175 250, 180 260 C185 270, 180 280, 170 285 C160 290, 150 285, 145 275 C140 265, 145 255, 155 250 Z"
              stroke="#1A3E73"
              strokeWidth="1.5"
              fill="#E8F4FD"
            />

            {/* Smaller islands */}
            <circle cx="130" cy="270" r="3" fill="#E8F4FD" stroke="#1A3E73" strokeWidth="1"/>
            <circle cx="140" cy="275" r="2" fill="#E8F4FD" stroke="#1A3E73" strokeWidth="1"/>
            <circle cx="165" cy="295" r="2" fill="#E8F4FD" stroke="#1A3E73" strokeWidth="1"/>
            <circle cx="320" cy="380" r="3" fill="#E8F4FD" stroke="#1A3E73" strokeWidth="1"/>
            <circle cx="180" cy="110" r="2" fill="#E8F4FD" stroke="#1A3E73" strokeWidth="1"/>
          </svg>
        </div>

        {/* Project Pins */}
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{
              top: project.position.top,
              left: project.position.left,
            }}
            onClick={() => handlePinClick(project)}
          >
            <div
              className={`w-4 h-4 rounded-full ${getPinColor(project.status)} shadow-lg border-2 border-white 
                         hover:scale-125 transition-transform duration-200 
                         ${selectedProject?.id === project.id ? 'scale-125 ring-2 ring-[#1A3E73]' : ''}`}
            >
              <div className="w-full h-full rounded-full animate-ping absolute opacity-30 bg-current"></div>
            </div>
          </div>
        ))}

        {/* Map Controls */}
        <div className={`${isScrolled ? 'fixed top-4 right-4 z-40' : 'absolute top-4 right-4'} flex flex-col gap-2 transition-all duration-200`}>
          <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm w-10 h-10 p-0 shadow-lg transition-all duration-200">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm w-10 h-10 p-0 shadow-lg transition-all duration-200">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm w-10 h-10 p-0 shadow-lg transition-all duration-200">
            <Navigation className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className={`bg-white/90 backdrop-blur-sm w-10 h-10 p-0 shadow-lg transition-all duration-200 ${showLegend ? 'bg-[#1A3E73] text-white' : ''}`}
            onClick={() => setShowLegend(!showLegend)}
          >
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>

        {/* Legend */}
        {/* Legend */}
        {showLegend && (
          <div className="fixed bottom-20 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-30">
            <div className="text-xs font-medium text-[#1A3E73] mb-2">Project Status</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-600">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs text-gray-600">Ongoing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs text-gray-600">Delayed</span>
              </div>
            </div>
          </div>
        )}

        {/* Project Info Card */}
        {selectedProject && (
          <div className="absolute bottom-20 left-4 right-4 bg-white rounded-lg shadow-xl p-4 z-20">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-[#1A3E73] flex-1 pr-2">
                {selectedProject.title}
              </h3>
              <div className="flex items-center gap-2">
                <Badge className={`text-xs px-2 py-1 ${getStatusColor(selectedProject.status)}`}>
                  {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedProject(null)}
                  className="w-6 h-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{selectedProject.location}</span>
                </div>
                <span>{selectedProject.category}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  Budget: {formatCurrency(selectedProject.budget)}
                </span>
                <span className="font-medium text-[#1A3E73]">
                  {selectedProject.progress}% Complete
                </span>
              </div>

              <Button 
                size="sm" 
                className="w-full mt-3 bg-[#1A3E73] hover:bg-[#1A3E73]/90 text-white"
                onClick={() => handleProjectDetailClick(selectedProject)}
              >
                View Details
              </Button>
            </div>
          </div>
        )}
      </div>



      {/* Search Results Count */}
      {searchQuery && (
        <div className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg z-20">
          <div className="text-sm text-muted-foreground">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        </div>
      )}
    </div>
  );
}