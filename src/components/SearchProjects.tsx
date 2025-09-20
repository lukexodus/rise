import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Search, Filter, Calendar, MapPin, DollarSign, Check, ChevronsUpDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { cn } from "@/lib/utils";

const mockSearchResults = [
  {
    id: 1,
    title: "Metro Manila Subway Project Phase 2",
    description: "Underground rail system connecting key areas in Metro Manila",
    budget: 75000000000,
    allocated: 45000000000,
    spent: 30600000000,
    remaining: 44400000000,
    status: "ongoing",
    department: "Department of Transportation",
    location: "Metro Manila",
    startDate: "Jan 2023",
    endDate: "Dec 2025",
    contractor: "Sumitomo Mitsui Construction Co.",
    category: "Transportation"
  },
  {
    id: 2,
    title: "CALABARZON Water Supply System Expansion",
    description: "Water infrastructure improvement for CALABARZON region",
    budget: 8200000000,
    allocated: 8200000000,
    spent: 6970000000,
    remaining: 1230000000,
    status: "ongoing",
    department: "Department of Public Works and Highways",
    location: "CALABARZON",
    startDate: "Mar 2023",
    endDate: "Sep 2024",
    contractor: "Megawide Construction Corporation",
    category: "Utilities"
  },
  {
    id: 3,
    title: "National Broadband Infrastructure Program",
    description: "Nationwide fiber optic network expansion",
    budget: 45000000000,
    allocated: 45000000000,
    spent: 18900000000,
    remaining: 26100000000,
    status: "delayed",
    department: "Department of Information and Communications Technology",
    location: "Nationwide",
    startDate: "Jun 2022",
    endDate: "Jun 2026",
    contractor: "PLDT Inc. & Globe Telecom",
    category: "Technology"
  },
  {
    id: 4,
    title: "Cebu BRT System Implementation",
    description: "Bus Rapid Transit system for Cebu metropolitan area",
    budget: 16800000000,
    allocated: 16800000000,
    spent: 16800000000,
    remaining: 0,
    status: "completed",
    department: "Department of Transportation",
    location: "Central Visayas",
    startDate: "Jan 2022",
    endDate: "Jan 2024",
    contractor: "Asian Development Bank",
    category: "Transportation"
  },
  {
    id: 5,
    title: "Mindanao Rural Electrification Program",
    description: "Power grid expansion for rural communities in Mindanao",
    budget: 12500000000,
    allocated: 12500000000,
    spent: 12500000000,
    remaining: 0,
    status: "completed",
    department: "Department of Energy",
    location: "Mindanao",
    startDate: "Jun 2021",
    endDate: "Mar 2024",
    contractor: "National Grid Corporation",
    category: "Utilities"
  },
  {
    id: 6,
    title: "Ilocos Norte Solar Farm Project",
    description: "Large-scale solar power generation facility",
    budget: 8900000000,
    allocated: 8900000000,
    spent: 3200000000,
    remaining: 5700000000,
    status: "ongoing",
    department: "Department of Energy",
    location: "Ilocos Region",
    startDate: "Sep 2023",
    endDate: "Dec 2025",
    contractor: "Solar Philippines",
    category: "Utilities"
  },
  {
    id: 7,
    title: "Palawan Airport Modernization",
    description: "Upgrade and expansion of Puerto Princesa Airport",
    budget: 5600000000,
    allocated: 5600000000,
    spent: 1400000000,
    remaining: 4200000000,
    status: "delayed",
    department: "Department of Transportation",
    location: "MIMAROPA",
    startDate: "Apr 2023",
    endDate: "Nov 2024",
    contractor: "Filinvest Development Corp.",
    category: "Infrastructure"
  },
  {
    id: 8,
    title: "Bicol Regional Medical Center Upgrade",
    description: "Hospital expansion and equipment modernization",
    budget: 3200000000,
    allocated: 3200000000,
    spent: 2700000000,
    remaining: 500000000,
    status: "ongoing",
    department: "Department of Health",
    location: "Bicol Region",
    startDate: "Feb 2023",
    endDate: "Aug 2024",
    contractor: "D.M. Consunji Inc.",
    category: "Healthcare"
  }
];

interface SearchProjectsProps {
  onProjectClick?: (projectId: string) => void;
}

export function SearchProjects({ onProjectClick }: SearchProjectsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [results, setResults] = useState(mockSearchResults);
  const [selectedProject, setSelectedProject] = useState<typeof mockSearchResults[0] | null>(null);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
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

  const handleSearch = () => {
    let filtered = mockSearchResults;

    if (searchQuery.trim()) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.contractor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter(project => project.category === filterCategory);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(project => project.status === filterStatus);
    }

    if (filterDepartment !== "all") {
      filtered = filtered.filter(project => project.department === filterDepartment);
    }

    if (filterLocation !== "all") {
      filtered = filtered.filter(project => project.location === filterLocation);
    }

    setResults(filtered);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilterCategory("all");
    setFilterStatus("all");
    setFilterDepartment("all");
    setFilterLocation("all");
    setResults(mockSearchResults);
  };

  const categories = ["Transportation", "Utilities", "Technology", "Healthcare", "Education", "Infrastructure"];
  const departments = [
    "Department of Transportation",
    "Department of Public Works and Highways", 
    "Department of Information and Communications Technology",
    "Department of Energy",
    "Department of Health",
    "Department of Education",
    "Department of Agriculture",
    "Department of Environment and Natural Resources",
    "Department of Finance",
    "Department of Budget and Management",
    "Department of Interior and Local Government",
    "Department of Justice",
    "Department of Labor and Employment",
    "Department of National Defense",
    "Department of Science and Technology",
    "Department of Social Welfare and Development",
    "Department of Tourism",
    "Department of Trade and Industry",
    "Department of Foreign Affairs",
    "Department of Human Settlements and Urban Development",
    "Department of Migrant Workers",
    "National Economic and Development Authority",
    "Office of the President",
    "Office of the Vice President",
    "Bangko Sentral ng Pilipinas",
    "Bureau of Internal Revenue",
    "Bureau of Customs",
    "Securities and Exchange Commission",
    "Commission on Audit",
    "Civil Service Commission",
    "Commission on Elections",
    "Commission on Human Rights",
    "Office of the Ombudsman",
    "Philippine Statistics Authority",
    "Technical Education and Skills Development Authority",
    "Professional Regulation Commission",
    "Philippine Health Insurance Corporation",
    "Social Security System",
    "Government Service Insurance System",
    "Pag-IBIG Fund",
    "Philippine Amusement and Gaming Corporation",
    "Land Transportation Office",
    "Maritime Industry Authority",
    "Civil Aviation Authority of the Philippines",
    "Philippine Ports Authority",
    "Toll Regulatory Board",
    "Metropolitan Manila Development Authority",
    "Housing and Urban Development Coordinating Council",
    "National Housing Authority",
    "Philippine Reclamation Authority",
    "Bases Conversion and Development Authority",
    "Clark Development Corporation",
    "Subic Bay Metropolitan Authority",
    "Cagayan Economic Zone Authority",
    "Philippine Economic Zone Authority",
    "Aurora Pacific Economic Zone and Freeport Authority",
    "John Hay Management Corporation",
    "Zamboanga City Special Economic Zone Authority"
  ];
  const locations = [
    "Nationwide",
    // NCR
    "National Capital Region (NCR)",
    "Metro Manila",
    // Luzon Regions
    "Ilocos Region (Region I)",
    "Ilocos Norte", "Ilocos Sur", "La Union", "Pangasinan",
    "Cagayan Valley (Region II)",
    "Batanes", "Cagayan", "Isabela", "Nueva Vizcaya", "Quirino",
    "Central Luzon (Region III)",
    "Aurora", "Bataan", "Bulacan", "Nueva Ecija", "Pampanga", "Tarlac", "Zambales",
    "CALABARZON (Region IV-A)",
    "Batangas", "Cavite", "Laguna", "Quezon", "Rizal",
    "MIMAROPA (Region IV-B)",
    "Marinduque", "Occidental Mindoro", "Oriental Mindoro", "Palawan", "Romblon",
    "Bicol Region (Region V)",
    "Albay", "Camarines Norte", "Camarines Sur", "Catanduanes", "Masbate", "Sorsogon",
    "Cordillera Administrative Region (CAR)",
    "Abra", "Apayao", "Benguet", "Ifugao", "Kalinga", "Mountain Province",
    // Visayas Regions
    "Western Visayas (Region VI)",
    "Aklan", "Antique", "Capiz", "Guimaras", "Iloilo", "Negros Occidental",
    "Central Visayas (Region VII)",
    "Bohol", "Cebu", "Negros Oriental", "Siquijor",
    "Eastern Visayas (Region VIII)",
    "Biliran", "Eastern Samar", "Leyte", "Northern Samar", "Samar", "Southern Leyte",
    // Mindanao Regions
    "Zamboanga Peninsula (Region IX)",
    "Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay",
    "Northern Mindanao (Region X)",
    "Bukidnon", "Camiguin", "Lanao del Norte", "Misamis Occidental", "Misamis Oriental",
    "Davao Region (Region XI)",
    "Davao de Oro", "Davao del Norte", "Davao del Sur", "Davao Occidental", "Davao Oriental",
    "SOCCSKSARGEN (Region XII)",
    "Cotabato", "Sarangani", "South Cotabato", "Sultan Kudarat",
    "Caraga (Region XIII)",
    "Agusan del Norte", "Agusan del Sur", "Dinagat Islands", "Surigao del Norte", "Surigao del Sur",
    "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)",
    "Basilan", "Lanao del Sur", "Maguindanao del Norte", "Maguindanao del Sur", "Sulu", "Tawi-Tawi"
  ];

  return (
    <div className="px-4 lg:px-8 py-4 lg:py-6">
      <div className="lg:max-w-6xl lg:mx-auto space-y-4 lg:space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-lg lg:text-2xl font-medium text-[#1A3E73]">Search Projects</h2>
          <p className="text-sm lg:text-base text-muted-foreground">Find specific projects, budgets, and allocations</p>
        </div>

        {/* Search Bar */}
        <Card className="p-4 lg:p-6">
          <div className="space-y-3 lg:space-y-4">
            <div className="flex gap-2 lg:gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects, departments, contractors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 lg:text-base"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="bg-[#1A3E73] hover:bg-[#1A3E73]/90 text-white lg:px-6">
                Search
              </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 mb-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="text-xs lg:text-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="text-xs lg:text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>

              <Popover open={openDepartment} onOpenChange={setOpenDepartment}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openDepartment}
                    className="justify-between text-xs lg:text-sm h-10"
                  >
                    {filterDepartment === "all"
                      ? "Department"
                      : departments.find((dept) => dept === filterDepartment)?.split(' ').slice(2).join(' ') || "Department"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search departments..." />
                    <CommandEmpty>No department found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      <CommandItem
                        key="all"
                        value="all"
                        onSelect={() => {
                          setFilterDepartment("all");
                          setOpenDepartment(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            filterDepartment === "all" ? "opacity-100" : "opacity-0"
                          )}
                        />
                        All Departments
                      </CommandItem>
                      {departments.map((dept) => (
                        <CommandItem
                          key={dept}
                          value={dept}
                          onSelect={(currentValue) => {
                            setFilterDepartment(currentValue === filterDepartment ? "all" : currentValue);
                            setOpenDepartment(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              filterDepartment === dept ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {dept}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <Popover open={openLocation} onOpenChange={setOpenLocation}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openLocation}
                    className="justify-between text-xs lg:text-sm h-10"
                  >
                    {filterLocation === "all"
                      ? "Location"
                      : locations.find((loc) => loc === filterLocation) || "Location"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search locations..." />
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      <CommandItem
                        key="all"
                        value="all"
                        onSelect={() => {
                          setFilterLocation("all");
                          setOpenLocation(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            filterLocation === "all" ? "opacity-100" : "opacity-0"
                          )}
                        />
                        All Locations
                      </CommandItem>
                      {locations.map((loc) => (
                        <CommandItem
                          key={loc}
                          value={loc}
                          onSelect={(currentValue) => {
                            setFilterLocation(currentValue === filterLocation ? "all" : currentValue);
                            setOpenLocation(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              filterLocation === loc ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {loc}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm lg:text-base text-muted-foreground">
                {results.length} projects found
              </span>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
          {results.map(project => (
            <Card 
              key={project.id} 
              className="p-4 border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-[#1A3E73] flex-1 pr-2">
                    {project.title}
                  </h3>
                  <Badge className={`text-xs px-2 py-1 ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <DollarSign className="w-3 h-3" />
                    <span>Budget: {formatCurrency(project.budget)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{project.startDate} - {project.endDate}</span>
                  </div>
                  <div className="text-muted-foreground">
                    Category: {project.category}
                  </div>
                </div>

                {selectedProject?.id === project.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                    <div>
                      <h4 className="font-medium text-[#1A3E73] mb-2">Budget Breakdown</h4>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="text-muted-foreground">Allocated</div>
                          <div className="font-medium text-[#1A3E73]">
                            {formatCurrency(project.allocated)}
                          </div>
                        </div>
                        <div className="text-center p-2 bg-red-50 rounded">
                          <div className="text-muted-foreground">Spent</div>
                          <div className="font-medium text-[#BF4226]">
                            {formatCurrency(project.spent)}
                          </div>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded">
                          <div className="text-muted-foreground">Remaining</div>
                          <div className="font-medium text-[#F2C063]">
                            {formatCurrency(project.remaining)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Department: </span>
                        <span className="text-[#1A3E73]">{project.department}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Contractor: </span>
                        <span className="text-[#1A3E73]">{project.contractor}</span>
                      </div>
                    </div>

                    <Button 
                      size="sm" 
                      className="w-full mt-3 bg-[#1A3E73] hover:bg-[#1A3E73]/90 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onProjectClick) {
                          onProjectClick(`PROJ-2024-${project.id.toString().padStart(3, '0')}`);
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}

          {results.length === 0 && (
            <div className="text-center py-8 lg:col-span-2">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-2">
                Clear filters to see all projects
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}