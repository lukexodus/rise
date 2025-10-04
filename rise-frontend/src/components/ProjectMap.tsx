import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin, Search, Navigation, ZoomIn, ZoomOut, X, HelpCircle, DollarSign } from "lucide-react";

// Import data from external JSON file
import projectsData from "../data/projects.json";
import React from "react";

// Convert project data to map format
const mockMapProjects = Object.values(projectsData).map(project => ({
  id: project.id,
  title: project.title,
  location: project.location,
  coordinates: project.coordinates,
  budget: project.budget.total,
  status: project.status as "ongoing" | "completed" | "delayed",
  progress: project.progress,
  sector: project.sector,
  position: project.position
}));

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
    project.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePinClick = (project: typeof mockMapProjects[0]) => {
    setSelectedProject(selectedProject?.id === project.id ? null : project);
  };

  const handleProjectDetailClick = (project: typeof mockMapProjects[0]) => {
    if (onProjectClick) {
      onProjectClick(project.id);
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
        <div className="absolute w-full h-full inset-0 flex items-center justify-center">
          <div className="relative w-auto h-full py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="svg2"
              width="232.239"
              height="396.668"
              viewBox="0 0 232.239 396.668"
              className="h-full w-full max-w-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                id="path3652"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M3.333 309.148c1.59-2.38 1.71-5.249-.63-7.204a7.15 7.15 0 0 0 .63 7.204"
              ></path>
              <path
                id="path3654"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M8.395 288.246c-1.283 2.112-.96 4.608-1.602 6.893 6.387-7.329 15.155-9.49 20.87-17.835 2.127-3.102 19.684-13.641 13.716-19.004 3.604 1.038 1.212-1.562 1.517-3.76.372-2.679 4.712-2.885 6.599-3.063 3.23-.302 3.903-1.529 4.548-4.462.9-4.09 3.836-2.953 6.575-4.595 5.766-3.447 1.766-7.195-.43-11.504-2.637-5.174 2.203-11.932-1.878-16.412-2.817 2.274.17 11.47-3.659 7.718.903 1.91 3.316 7.26 3.45 9.332-2.252-1.37-4.86-2.856-5.617-5.602-.154 2.84 1.235 5.174 2.002 7.799.773 2.638-2.816 10.562-4.042 4.918-.28 1.728-1.245 2.265-2.827 2.635-1.223.284-.698 3.776-1.063 4.623-.461 1.067-2.609-.423-3.138.554-.844 1.551 1.196 2.726-.17 4.479-.388-5.298-2.854.72-3.695 2.113a35.3 35.3 0 0 1-4.65 6.643c-3.019 3.102-4.694 7.43-8.193 10.106-1.393 1.063-2.91.488-4.296 1.442-1.587 1.09-1.748 3.107-3.377 3.977-4.62 2.48-8.715 8.163-10.64 13.005"
              ></path>
              <path
                id="path3660"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M55.093 86.478c-1.193 4.92 2.815 4.442 3.203 7.271.593 4.333.71 9.882 2.73 13.758a30.2 30.2 0 0 1 3.4 11.087c.302 2.49 4.055 8.092 3.725 2.488 4.117 1.727 1.412 9.772 6.197 11.405 7.058 2.412 1.763-6.968 2.039-9.97 1.783.727 16.389 6.14 10.498 10.015a65 65 0 0 0-6.313 5.062c-3.289 2.802-.264 8.698-.086 12.455 1.914-.156 2.703-1.26 1.924-3.072 4.031.218 5.795 2.526 4.926 6.473 1.49-4.607 4.263-.41 3.293 1.92 2.311-.293 5.64 1.254 7.614-.575 1.683-1.563 2.228-4.024 4.133-5.35.592-.412 4.055-2.87 4.851-2.183 2.728 2.36 6.44 3.62 8.932 6.182 3.297 3.385 9.646 8.077 10.397 12.933.25 1.627 3.002 4.09 3.75 1.283a8.66 8.66 0 0 0-1.085-4.34c-.282-.761-3.448-5.4-1.686-4.763-3.497-2.386-2.38-7.175-4.781-10.276 4.865-.583 9.179 5.415 11.38 8.83 2.983 4.62 8.342 5.091 10.83 10.74.651 1.482-1.087 4.24 1.022 4.778 2.287.583 4.164 2.296 6.239 3.39 1.656.877 3.036 3.28 5.004 2.335 1.432-.685 3.595-2.747 5.333-2.313-.462 2.737-5.572 3.775-3.493 7.06.376.595 4.332 6.756 5.555 3.836 1.902-4.538.646-20.584-8.201-14.94-.893-1.933.154-3.162-.228-5.027-.484-2.362-3.739-5.861-5.703-7.095-5.208-3.27 6.144-5.845 9.009-4.147-.382-3.318-5.673-4.846-8.359-5.194-4.577-.597-5.202-4.514-8.976-5.336-1.074 3.082 4.587 7.844-.357 9.411-3.618 1.147-4.345-7.464-5.822-10.194-3.002-5.568-16.3-10.943-16.419-.746a31 31 0 0 0-1.672-2.756c-3.131 2.686 2.959 4.674 1.154 6.573-3.049 3.213-8.872-1.53-10.92-3.799-1.837-2.036-9.531-16.384-3.43-16.514-5.375-4.06-10.673-15.355-7.908-21.618 1.885-4.27-.16-8.303 1.55-12.059 2.113-4.651 8.445-4.726 11.777-8.081q-.624 1.888-1.265 3.77c2.814-2.967 2.098-6.6 3.487-10.188 2.12-5.467 4.891-11.315 4.07-17.352-3.168 1.354-1.586-2.893-2.543-4.363-2.652-4.062-5.89-4.312-7.401-9.82-1.544-5.654-1.24-9.974 1.29-15.136 1.314-2.678-1.936-10.278-4.539-6.396-1.034 1.54-1.34 5.013-3.995 4.427-1.607-.357-5.032-2.35-6.539-.578a10.8 10.8 0 0 0-4.193-4.404c-3.31-2.23-7.604-5.55-11.672-4.37-1.755.51-3.606-.504-5.324-.722-1.603-.207-.45 2.168-1.966 2.11-4.31-.163-1.686 2.321-1.867 4.867-.328 4.55-1.966 10.105-2.801 14.704-1.523 8.37 4.55 16.046 2.46 24.93-1.695 7.205 1.094 12.733 1.812 19.527.897 8.421-11.44-3.232-12.211-6.833-2.88 1.309-2.721 4.372-1.829 6.89"
              ></path>
              <path
                id="path3662"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="m57.937 82.101 1.946 2.093c.562-1.836.319-3.647-1.946-2.093"
              ></path>
              <path
                id="path3666"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M68.603 191.34a12.7 12.7 0 0 0-2.173-1.877c-4.236 7.323 5.498 8.963 10.655 9.159a4.38 4.38 0 0 0-1.753-3.994c-2.498-1.519-4.134-.96-6.73-3.287"
              ></path>
              <path
                id="path3668"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M67.757 148.672c.796 2.196 2.97 3.61 4.77 4.893.211-2.766-2.216-4.687-4.77-4.893"
              ></path>
              <path
                id="path3670"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="m69.166 200.338-2.948.562c.43 2.796 3.751 3.152 3.378 6.186 2.102-1.756.15-4.875-.43-6.748"
              ></path>
              <path
                id="path3672"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M71.336 237.671c-.154-3.926-5.38-.49-5.438 2.038 2.973 1.322 2.58-2.554 5.438-2.038"
              ></path>
              <path
                id="path3676"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M73.871 159.226c.43 1.307 5.25 5.473 6.394 6.448 4.87 4.155 3.442 9.275 6.932 13.583 1.53 1.89 11.609 22.064 14.454 10.643.603-2.421 2.175-4.43 2.74-6.853.559-2.404-1.634-4.647-1.543-7.071.22-5.789-2.563-9.5-6.33-13.551-3.04-3.285-19.494-6.966-22.647-3.199"
              ></path>
              <path
                id="path3678"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M81.694.42a6.8 6.8 0 0 0 4.123 3.074A2.739 2.739 0 0 0 81.694.42"
              ></path>
              <path
                id="path3684"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M72.012 386.028c1.43-.738 9.72-4.825 9.378-5.85-1.246-3.785-3.735-.37-5.685.91-2.394 1.582-6.231 1.505-3.693 4.94"
              ></path>
              <path
                id="path3688"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M95.241 15.52a4.17 4.17 0 0 0 1.766-4.646 4.9 4.9 0 0 0-1.766 4.646"
              ></path>
              <path
                id="path3692"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M105.763 365.536c6.26-2.83-3.22-6.162-6.185-5.73-3.225.477-2.943 4.558-2.178 4.182 2.122-1.039 7.528-1.354 8.363 1.548"
              ></path>
              <path
                id="path3694"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M105.91 118.925c.627 2.78 1.862 8.109 4.819 9.38 1.444-3.311.904-14.081-4.819-9.38"
              ></path>
              <path
                id="path3696"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M116.563 146.257c-.57-2.752-4.126-4.781-6.516-5.636 1.444 2.61 4.146 4.022 6.516 5.636"
              ></path>
              <path
                id="path3698"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M109.275 161.016c-.275 5.026 7.406 9.092 7.906 1.91.248-3.655-6.583-5.905-7.906-1.91"
              ></path>
              <path
                id="path3702"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M113.385 206.277c7.222 1.564 5.262 7.146 4.914 12.712-.25 4.036.304 6.934-.938 10.935-1.29 4.172 1.008 8.28-.634 12.384 4.136 1.042 7.072-6.015 11.619-5.843 2.96.112 8.638-3.996 7.89-6.973-.652-2.605 8.836-3.209 7.7-6.93-1.512-4.934 2.212-11.516-5.814-6.144 1.996-2.022-.778-4.97-3.091-4.546-2.147.392-3.633 3.02-5.384 1.011-1.98-2.269-3.354-4.83-6.139-6.273-2.62-1.355-6.048-2.015-7.712-4.727a8.8 8.8 0 0 0-2.41 4.394"
              ></path>
              <path
                id="path3704"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M115.906 186.625c-.461 4.034-2.26 7.41.705 11.02.722-4.586 1.267-9.188 2.4-13.655.637-2.525-5.166-1.13-3.105 2.635"
              ></path>
              <path
                id="path3710"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M119.259 347.425a3.876 3.876 0 0 0 5.439 3.279c2.643-1.084 2.57-3.905 4.288-5.828-2.314.109-3.637-1.734-5.744-2.237-2.174-.525-3.922 2.11-5.921 2.468a13.7 13.7 0 0 0 1.938 2.318"
              ></path>
              <path
                id="path3714"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M119.878 331.067c-1.394 6.29 7.19 9.289 8.131 1.91.342-2.686 1.791-10.093 3.883-10.837 1.664-.588 3.216-10.362 6.844-7.333 2.61 2.181 1.34 6.609 3.386 9.024.74-3.921 2.087-1.95 3.143.119.97-2.397.363-5.787 3.41-6.827a3.363 3.363 0 0 1-.653 4.912c3.08.229 4.874 4.114 7.964 3.667-.885-1.392-1.973-3.278-1.833-5.006.078-.982 2.236-.788 2.526-1.7.768-2.398-1.943-1.934 1.271-4.168 1.975-1.372 3.774 1.24 5.193 2.207 4.828 3.287 9.262 4.312 10.672 10.93.762 3.597-4.192 6.75-4.716 10.542-.527 3.795 1.322 9.114 1.986 12.904 1.022 5.845 5.935 9.515 10.797 12.243 2.23 1.253 10.114 6.81 12.652 4.737 2.033-1.66 1.145-5.795 4.854-5.461.367.033-1.378 17.28 4.048 13.833 3.772-2.395 7.295-10.982 6.886-15.248-.574-6-5.017-8.674-7.15-13.58-1.287-2.962 6.407-18.98 8.883-17.678 1.903 1.001 5.846 10.385 6.607 12.661.745 2.217.186 4.48.293 6.747.156 3.31 2.746 5.611 3.107 8.832.2-5.204 2.783-11.863-.971-16.418 1.967-.83 3.498.385 4.187 2.178-3.215-3.083 1.83-5.859 3.536-8.013 3.3-4.16 1.33-10.5.66-15.11-.549-3.786-5.478-3.988-3.363-7.997 1.226-2.322 1.544-8.41-2.771-6.653 7.448-5.908-5.674-8.422-5.384-11.652.168-1.889 3.884-2.63 4.676-4.46 1.42-3.279-2.232-4.754-3.109-7.37-.411-1.235 1.157-6.998-1.14-5.92-2.9 1.359-3.387.303-4.842-1.956-1.721-2.677.175-4.11-3.763-5.478-4.337-1.508-4.984-5.503-8.758-7.32-2.51 4.97 1.315 11.778 2.662 16.613.304 1.106 1.745 5.194-.265 5.694-2.621.649-6.164-.124-7.184-2.965-2.357 6.521-.121 7.139-6.145 2.603-5.67-4.266-1.217 11.885-6.063 12.365-3.113.31-3.575-3.451-6.481-2.274-3.023 1.229-2.408 6.713-3.441 9.22-1.24 3.013-5.644 1.481-7.932 3.202-1.328 1-3.641 3.397-5.418 3.407-1.833.012 2.38-2.764 2-2.53 2.377-1.455 2.895-2.296 2.422-5.262-.368-2.302-3.086-13.416-7.093-8.254-.512-1.855-1.548-4.225-3.893-4.19 1.074 6.215-6.546 3.558-8.484 6.838-2.29 3.872-.599 7.576-5.584 9.011-5.041 1.452-12.35-.259-14.946 5.966-1.11 2.67-.601 5.834-1.019 8.636-.542 3.707-2.619 7.352-4.278 10.659"
              ></path>
              <path
                id="path3716"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M128.013 187.083a12.4 12.4 0 0 0-2.309 1.708 67 67 0 0 1 5.424 4.918 3.982 3.982 0 0 0-3.115-6.626"
              ></path>
              <path
                id="path3718"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M134.062 270.117c2.077 1.616 5.14 1.688 6.836 3.847 1.43 1.821.536 4.605 2.265 6.263 2.382 2.287 5.727-.21 7.042-2.345 2.445-3.975-1.665-6.901-2.616-10.49-1.76-6.609 1.138-16.133 3.43-22.423 1.743-4.79 7.13-11.106.537-14.912a8.72 8.72 0 0 0-7.417-.764c-4.09 1.669-2.54 5.24-3.683 8.522-.738 2.116-2.862 2.728-2.18 5.306.758 2.865 1.864 6.005.616 8.928-1.878 4.405-10.005 1.236-10.073 6.23-.052 4.183 3.048 8.495 5.243 11.839"
              ></path>
              <path
                id="path3720"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M131.694 243.773c2.038-.833 7-6.85 2.783-8.055-3.186-.909-4.286 6.327-2.783 8.055"
              ></path>
              <path
                id="path3722"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M147.473 182.66c-2.419-4.269-5.173-10.055-9.852-12.267-2.493 3.851 8.176 9.622 9.852 12.266"
              ></path>
              <path
                id="path3724"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M144.31 201.165q-.156 1.227-.311 2.454c3.234-2.038 5.915-10.436 9.556-5.856 1.476 1.857 3.112 3.59 4.41 5.58 1.647 2.522 5.225 2.785 6.942 5.331 3.705-6.548-5.248-10.954-8.181-14.724a40 40 0 0 0-4.938-4.922c-.935-.818-6.17-3.547-7.323-3.565.744 2.169-.146 7.801.743 9.094 2.198 3.194-.547 3.249-.898 6.608"
              ></path>
              <path
                id="path3726"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M141.73 328.528c8.408-2.954-6.506-5.582 0 0"
              ></path>
              <path
                id="path3728"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M154.903 188.102a13.9 13.9 0 0 0 3.2 4.385c-.337-3.042-1.037-6.778-3.95-8.453a3.216 3.216 0 0 0 .75 4.068"
              ></path>
              <path
                id="path3730"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M152.814 255.568c.147 4.7-1.483 9.223-2.113 13.833 6.35 1.936 5.567-13.353 8.268-16.274 3.344-3.622 6.852-6.528 7.606-11.717.898-6.178-.847-12.362-.426-18.548-3.127.52-4.372 10.2-4.988 12.543-1.874 7.103-6.6 13.04-8.347 20.163"
              ></path>
              <path
                id="path3734"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M157.927 280.222c3.876-.053 2.376-3.656.897-5.576-2.226.994-3.699 4.167-.897 5.576"
              ></path>
              <path
                id="path3736"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M165.586 161.13c5.78-3.743 5.29-12.678-2.164-14.444-2.372 4.516-1.146 11.158 2.164 14.444"
              ></path>
              <path
                id="path3740"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M161.529 268.24q3.2-.08 2.329-2.155c-1.741-.206-2.344.488-2.33 2.156"
              ></path>
              <path
                id="path3742"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M163.702 263.61c-.838 8.705 15.105-.621 17.07.195-1.06-4.54-.89-13.407-9.024-11.509-2.855.665-11.842 8.69-8.046 11.314"
              ></path>
              <path
                id="path3746"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M169.468 188.654c1.587 4.835 3.48 8.986 7.388 12.397 2.178 1.9 8.765 9.42 11.588 8.297-1.03 2.183-1.036 5.131-3.84 5.91a13.9 13.9 0 0 1 3.21 4.16c-2.288-2.716-3.803.57-5.794 1.63-3.085 1.637-7.638-3.406-8.854-5.771-2.349 2.675 1.4 16.11 4.722 17.679-.366-6.042 6.41 1.994 6.456 5.07.118 7.836-1.536 13.798 6.607 17.865-.265-2.375-1.4-4.575-1.324-7.003 1.255 1.509 5.816 1.803 6.349-.664.295-1.37-2.814-7.998-3.595-9.42-1.79-3.279-2.388-2.88-2.537-7.184-.097-2.787.676-7.134-1.674-9.264 1.879-.412 6.947 4.92 7 4.865 2.145-2.33 9.744 1.03 11.8 2.355-1.624-2.053-2.691-4.893-5.39-5.815 3.629-2.564-3.138-10.787-3.337-14.005-.214-3.39 1.418-6.335-.325-9.281-1.113-1.881 3.318-1.177-.177-3.463-1.895-1.24-4.402-.472-4.105-3.525.376-3.919-3.027-4.185-5.814-4.908a10.64 10.64 0 0 0-7.232.041c-3.727 1.037-7.646-2.387-11.122.034"
              ></path>
              <path
                id="path3748"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M176.25 216.961c3.937.729 1.388-8.602-3.58-5.97.982 2.072 1.467 4.656 3.58 5.97"
              ></path>
              <path
                id="path3750"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M173.576 240.647a31.6 31.6 0 0 0 3.907-2.77 2.98 2.98 0 0 1-4.28.287z"
              ></path>
              <path
                id="path3752"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M186.138 281.74c1.15-2.298-.686-6.004-3.443-3.721a5.17 5.17 0 0 0 3.443 3.72"
              ></path>
              <path
                id="path3756"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M195.141 257.172q1.224 1.14 2.405 2.335c-.377-2.143-1.272-5.74-4.303-4.876a17 17 0 0 0 1.898 2.54"
              ></path>
              <path
                id="path3758"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M204.104 257.511a2.854 2.854 0 0 1 .289 4.724c3.32.618 2.736-4.176 2.41-6.027-.344-1.94-1.503-3.685-1.754-5.617-.23-1.76 1-3.123.405-4.922-4.488 1.719-1.101 5.606-3.684 8.388 1.775.357 2.92 1.578 2.334 3.454"
              ></path>
              <path
                id="path3762"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M211.48 341.718c.798-2.389.22-4.804-.192-7.189-3.913.631-.693 4.63.192 7.189"
              ></path>
              <path
                id="path3764"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M213.302 269.753c1.598-1.532.605-3.698-.938-4.751a6.24 6.24 0 0 0 .938 4.751"
              ></path>
              <path
                id="path3766"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M215.09 257.927c-1.174 1.464-2.388 7.77 1.212 7.09 3.654-.69 1.187-6.55-1.211-7.09"
              ></path>
              <path
                id="path3770"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M92.658 30.233q.437 2.05.968 4.079a3.63 3.63 0 0 1-.968-4.08"
              ></path>
              <g
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.25"
              >
                <path
                  id="path3656"
                  d="M9.543 299.061a10.5 10.5 0 0 0-.568-2.269q.286 1.137.568 2.27"
                ></path>
                <path
                  id="path3664"
                  d="M66.147 215.034q1.106-3.52-2.408-1.437c.805.48 1.603.958 2.408 1.437"
                ></path>
                <path
                  id="path3674"
                  d="M62.633 396.668a7.7 7.7 0 0 0 .053-7.179 63 63 0 0 1-.053 7.179"
                ></path>
                <path
                  id="path3680"
                  d="M75.761 203.954a24.8 24.8 0 0 0-.506-4.732 3.83 3.83 0 0 0 .506 4.732"
                ></path>
                <path
                  id="path3682"
                  d="m82.942 14.38 2.467-.13c-1.26-.618-1.836-1.064-2.467.13"
                ></path>
                <path
                  id="path3700"
                  d="M116.608 126.96q1.126-3.202-2.173-1.877a631 631 0 0 1 2.173 1.877"
                ></path>
                <path
                  id="path3706"
                  d="m118.37 128.149 2.25-.14a4.16 4.16 0 0 0-2.25.14"
                ></path>
                <path
                  id="path3708"
                  d="M121.975 186.855q2.896.549-.6-2.267c.202.759.401 1.511.6 2.267"
                ></path>
                <path
                  id="path3732"
                  d="M161.92 169.07q.642-2.277-2.208-.982c.736.324 1.472.654 2.207.981"
                ></path>
                <path
                  id="path3738"
                  d="M166.571 170.592a2.43 2.43 0 0 0-2.442-.545q1.22.276 2.442.545"
                ></path>
                <path
                  id="path3744"
                  d="M165.385 249.537c.62-.725 1.24-1.446 1.859-2.174-2.08-.044-1.806.54-1.859 2.174"
                ></path>
                <path
                  id="path3754"
                  d="M186.342 187.498c.592.577 1.043.516 1.347-.174-.451.058-.896.113-1.347.174"
                ></path>
                <path
                  id="path3772"
                  d="M173.576 240.647c-.124-.828-.252-1.656-.373-2.483q3.792.705.373 2.483"
                ></path>
                <path
                  id="path3774"
                  d="M175.192 239.137c.764-.42 1.524-.84 2.291-1.26a2.95 2.95 0 0 1-2.291 1.26"
                ></path>
              </g>
              <path
                id="path3776"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M187.813 219.419a6.1 6.1 0 0 1 .357 2.934 4.94 4.94 0 0 1-.357-2.934"
              ></path>
              <path
                id="path3788"
                fill="none"
                stroke="#c7d7d9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M155.859 227.858c-1.315-8.82 10.425-3.866 0 0"
              ></path>
            </svg>

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
          </div>
        </div>

        {/* Map Controls */}
        <div className={`${isScrolled ? 'fixed top-6 right-4 z-40' : 'absolute top-6 right-4'} flex flex-col gap-2 transition-all duration-200`}>
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
        {showLegend && (
          <>
            <div className="fixed bottom-20 lg:hidden left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-30">
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

            <div className="hidden lg:block absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-30">
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
          </>

        )}

        {/* Project Info Card */}
        {selectedProject && (
          <div className="fixed bottom-[4.5rem] left-4 right-4 z-30 lg:bottom-4 md:left-0 md:right-0 md:flex md:justify-center pointer-events-none">
            <div className="bg-white rounded-lg shadow-xl p-4 pointer-events-auto md:max-w-lg md:w-full md:mx-4">
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
                  {/* <span>{selectedProject.sector}</span> */}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
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
          </div>
        )}
      </div>



      {/* Search Results Count */}
      {
        searchQuery && (
          <div className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg z-20">
            <div className="text-sm text-muted-foreground">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
            </div>
          </div>
        )
      }
    </div >
  );
}