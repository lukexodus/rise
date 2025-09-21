import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigationState } from "../hooks/useNavigationState";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Check, 
  ChevronsUpDown, 
  X
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { cn } from "@/lib/utils";

// Import data from external JSON files
import searchResultsData from "../data/searchResults.json";
import locationsData from "../data/locations.json";
import sectorsData from "../data/sectors.json";
import statusesData from "../data/statuses.json";
import departmentsData from "../data/departments.json";
import { getSectorIcon, getIcon } from "../utils/iconUtils";

const mockSearchResults = searchResultsData;

interface SearchProjectsProps {
  onProjectClick?: (projectId: string) => void;
}

export function SearchProjects({ onProjectClick }: SearchProjectsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { navigateWithState } = useNavigationState();
  
  // Initialize filters from URL search parameters
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') || "");
  const [filterSector, setFilterSector] = useState(() => searchParams.get('sector') || "all");
  const [filterStatus, setFilterStatus] = useState(() => searchParams.get('status') || "all");
  const [filterDepartment, setFilterDepartment] = useState(() => searchParams.get('department') || "all");
  const [filterLocation, setFilterLocation] = useState(() => searchParams.get('location') || "all");
  const [results, setResults] = useState(mockSearchResults);
  const [selectedProject, setSelectedProject] = useState<typeof mockSearchResults[0] | null>(null);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [departmentSearchTerm, setDepartmentSearchTerm] = useState("");
  const [locationSearchTerm, setLocationSearchTerm] = useState("");
  const [debouncedDepartmentSearch, setDebouncedDepartmentSearch] = useState("");
  const [debouncedLocationSearch, setDebouncedLocationSearch] = useState("");

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

  // Update URL when filters change
  const updateFiltersInURL = useCallback(() => {
    const params = new URLSearchParams();
    
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (filterSector !== "all") params.set('sector', filterSector);
    if (filterStatus !== "all") params.set('status', filterStatus);
    if (filterDepartment !== "all") params.set('department', filterDepartment);
    if (filterLocation !== "all") params.set('location', filterLocation);
    
    setSearchParams(params, { replace: true });
  }, [searchQuery, filterSector, filterStatus, filterDepartment, filterLocation, setSearchParams]);

  // Sync state with URL parameters
  useEffect(() => {
    const urlQuery = searchParams.get('q') || "";
    const urlSector = searchParams.get('sector') || "all";
    const urlStatus = searchParams.get('status') || "all";
    const urlDepartment = searchParams.get('department') || "all";
    const urlLocation = searchParams.get('location') || "all";
    
    if (urlQuery !== searchQuery) setSearchQuery(urlQuery);
    if (urlSector !== filterSector) setFilterSector(urlSector);
    if (urlStatus !== filterStatus) setFilterStatus(urlStatus);
    if (urlDepartment !== filterDepartment) setFilterDepartment(urlDepartment);
    if (urlLocation !== filterLocation) setFilterLocation(urlLocation);
  }, [searchParams]);

  // Perform search and update URL
  const handleSearch = useCallback(() => {
    let filtered = mockSearchResults;

    if (searchQuery.trim()) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.contractor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterSector !== "all") {
      filtered = filtered.filter(project => project.sector === filterSector);
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
    updateFiltersInURL();
  }, [searchQuery, filterSector, filterStatus, filterDepartment, filterLocation, updateFiltersInURL]);

  // Auto-search when filters change
  useEffect(() => {
    handleSearch();
  }, [searchQuery, filterSector, filterStatus, filterDepartment, filterLocation]);

  const clearFilters = () => {
    setSearchQuery("");
    setFilterSector("all");
    setFilterStatus("all");
    setFilterDepartment("all");
    setFilterLocation("all");
    setResults(mockSearchResults);
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  // Enhanced project click handler
  const handleProjectClick = (projectId: string) => {
    onProjectClick?.(projectId);
  };

  // Debounce department search
  const debounceDepartmentSearch = useCallback(
    useMemo(() => {
      let timeoutId: NodeJS.Timeout;
      return (searchTerm: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setDebouncedDepartmentSearch(searchTerm);
        }, 300);
      };
    }, []),
    []
  );

  // Debounce location search
  const debounceLocationSearch = useCallback(
    useMemo(() => {
      let timeoutId: NodeJS.Timeout;
      return (searchTerm: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setDebouncedLocationSearch(searchTerm);
        }, 300);
      };
    }, []),
    []
  );

  // Filter departments based on debounced search term
  const filteredDepartments = useMemo(() => {
    if (!debouncedDepartmentSearch) return departmentsData.departments.slice(0, 20);
    return departmentsData.departments.filter(dept =>
      dept.name.toLowerCase().includes(debouncedDepartmentSearch.toLowerCase()) ||
      dept.shortName.toLowerCase().includes(debouncedDepartmentSearch.toLowerCase())
    ).slice(0, 50);
  }, [debouncedDepartmentSearch]);

  // Filter locations based on debounced search term
  const filteredLocations = useMemo(() => {
    const allLocations = [...locationsData.all_locations, ...locationsData.cities];
    if (!debouncedLocationSearch) return allLocations.slice(0, 20);
    return allLocations.filter(location =>
      location.toLowerCase().includes(debouncedLocationSearch.toLowerCase())
    ).slice(0, 50);
  }, [debouncedLocationSearch]);

  const handleDepartmentSearchChange = (value: string) => {
    setDepartmentSearchTerm(value);
    debounceDepartmentSearch(value);
  };

  const handleLocationSearchChange = (value: string) => {
    setLocationSearchTerm(value);
    debounceLocationSearch(value);
  };

  // Use sectors from JSON data
  const categories = sectorsData.sectors.map(sector => sector.name);

  // Use locations from the imported JSON file
  const locations = locationsData.all_locations;

  return (
    <div className="px-4 lg:px-8 py-4 lg:py-6">
      <div className="lg:max-w-6xl lg:mx-auto space-y-4 lg:space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-lg lg:text-2xl font-medium text-[#1A3E73]">Search Projects</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Find specific projects, budgets, and allocations
            {(searchQuery || filterSector !== "all" || filterStatus !== "all" || filterDepartment !== "all" || filterLocation !== "all") && (
              <span className="text-[#1A3E73]">
                {" • "}{results.length} result{results.length !== 1 ? 's' : ''} found
              </span>
            )}
          </p>
        </div>

        {/* Search Bar */}
        <Card className="p-4 lg:p-6">
          <div className="space-y-3 lg:space-y-4">
            <div className="flex gap-2 lg:gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
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
              <Select value={filterSector} onValueChange={setFilterSector}>
                <SelectTrigger className="text-xs lg:text-sm">
                  <SelectValue placeholder="Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      <div className="flex items-center gap-2">
                        {getSectorIcon(cat)}
                        <span>{cat}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="text-xs lg:text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statusesData.statuses.filter(status => ["ongoing", "completed", "delayed"].includes(status.id)).map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      <div className="flex items-center gap-2">
                        {getIcon(status.icon, "w-3 h-3")}
                        <span>{status.name}</span>
                      </div>
                    </SelectItem>
                  ))}
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
                      : departmentsData.departments.find((dept) => dept.name === filterDepartment)?.shortName || "Department"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput 
                      placeholder="Search departments..." 
                      value={departmentSearchTerm}
                      onValueChange={handleDepartmentSearchChange}
                    />
                    <CommandEmpty>No department found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      <CommandItem
                        key="all"
                        value="all"
                        onSelect={() => {
                          setFilterDepartment("all");
                          setOpenDepartment(false);
                          setDepartmentSearchTerm("");
                          setDebouncedDepartmentSearch("");
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
                      {filteredDepartments.map((dept) => (
                        <CommandItem
                          key={dept.id}
                          value={dept.name}
                          onSelect={(currentValue) => {
                            setFilterDepartment(currentValue === filterDepartment ? "all" : currentValue);
                            setOpenDepartment(false);
                            setDepartmentSearchTerm("");
                            setDebouncedDepartmentSearch("");
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              filterDepartment === dept.name ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col">
                            <span className="font-medium">{dept.shortName}</span>
                            <span className="text-xs text-muted-foreground">{dept.name}</span>
                          </div>
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
                    {filterLocation === "all" ? "Location" : filterLocation}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput 
                      placeholder="Search locations..." 
                      value={locationSearchTerm}
                      onValueChange={handleLocationSearchChange}
                    />
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      <CommandItem
                        key="all"
                        value="all"
                        onSelect={() => {
                          setFilterLocation("all");
                          setOpenLocation(false);
                          setLocationSearchTerm("");
                          setDebouncedLocationSearch("");
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
                      {filteredLocations.map((loc) => (
                        <CommandItem
                          key={loc}
                          value={loc}
                          onSelect={(currentValue) => {
                            setFilterLocation(currentValue === filterLocation ? "all" : currentValue);
                            setOpenLocation(false);
                            setLocationSearchTerm("");
                            setDebouncedLocationSearch("");
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
                {searchQuery && ` for "${searchQuery}"`}
              </span>
              {(searchQuery || filterSector !== "all" || filterStatus !== "all" || filterDepartment !== "all" || filterLocation !== "all") && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              )}
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
                  <div className="flex items-center gap-1 text-muted-foreground">
                    {getSectorIcon(project.sector)}
                    <span>{project.sector}</span>
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
                        handleProjectClick(`PROJ-2024-${project.id.toString().padStart(3, '0')}`);
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
              <p className="text-muted-foreground">
                {searchQuery || filterSector !== "all" || filterStatus !== "all" || filterDepartment !== "all" || filterLocation !== "all" 
                  ? "No projects found matching your criteria." 
                  : "Enter search terms or apply filters to find projects."
                }
              </p>
              {(searchQuery || filterSector !== "all" || filterStatus !== "all" || filterDepartment !== "all" || filterLocation !== "all") && (
                <Button variant="outline" onClick={clearFilters} className="mt-2">
                  Clear filters to see all projects
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}