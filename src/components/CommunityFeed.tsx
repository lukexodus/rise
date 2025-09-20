import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CommunityPost } from "./CommunityPost";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import mockPostsData from "../data/mockPosts.json";
import locationsData from "../data/locations.json";
import sectorsData from "../data/sectors.json";
import statusesData from "../data/statuses.json";
import { getSectorIcon, getStatusIcon } from "../utils/iconUtils";
import { 
  Plus, 
  Filter, 
  TrendingUp, 
  Camera, 
  X, 
  Search, 
  Building, 
  Building2, 
  Users, 
  Upload, 
  FileText, 
  Clock,
  AlertTriangle,
  Hourglass,
  Eye,
  MessageCircle,
  CheckCircle,
  Check,
  ChevronsUpDown,
  MapPin,
  Tag,
  MessageSquare,
  Construction,
  Shield,
  Zap,
  TreePine,
  Cross,
  GraduationCap,
  Car,
  Wifi,
  Briefcase,
  Home,
  Utensils,
  Gavel,
  Globe,
  Coins
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

// Comprehensive list of Philippine government agencies, LGUs, and institutions
const responsibleEntities = {
  "National Government Agencies": [
    "Department of Public Works and Highways (DPWH)",
    "Department of Transportation (DOTr)", 
    "Department of Health (DOH)",
    "Department of Education (DepEd)",
    "Department of Environment and Natural Resources (DENR)",
    "Department of Social Welfare and Development (DSWD)",
    "Department of Interior and Local Government (DILG)",
    "Department of Agriculture (DA)",
    "Department of Trade and Industry (DTI)",
    "Philippine National Police (PNP)",
    "Bureau of Fire Protection (BFP)",
    "Metro Manila Development Authority (MMDA)",
    "Land Transportation Office (LTO)",
    "Land Transportation Franchising and Regulatory Board (LTFRB)",
    "Philippine Atmospheric, Geophysical and Astronomical Services Administration (PAGASA)",
    "National Food Authority (NFA)",
    "Philippine Statistics Authority (PSA)",
    "Philippine Drug Enforcement Agency (PDEA)"
  ],
  "Metro Manila LGUs": [
    "Manila City Government",
    "Quezon City Government", 
    "Makati City Government",
    "Pasig City Government",
    "Taguig City Government",
    "Muntinlupa City Government",
    "Parañaque City Government",
    "Las Piñas City Government",
    "Caloocan City Government",
    "Malabon City Government",
    "Navotas City Government",
    "Valenzuela City Government",
    "Marikina City Government",
    "Pasay City Government",
    "Mandaluyong City Government",
    "San Juan City Government",
    "Pateros Municipality"
  ],
  "Provincial LGUs": [
    "Rizal Provincial Government",
    "Bulacan Provincial Government", 
    "Cavite Provincial Government",
    "Laguna Provincial Government",
    "Batangas Provincial Government",
    "Pampanga Provincial Government",
    "Nueva Ecija Provincial Government",
    "Tarlac Provincial Government"
  ],
  "Utilities & Services": [
    "Manila Water Company",
    "Maynilad Water Services",
    "Meralco (Manila Electric Company)",
    "PLDT",
    "Globe Telecom",
    "Smart Communications",
    "Philippine Long Distance Telephone Company",
    "Manila Electric Company",
    "Metropolitan Waterworks and Sewerage System (MWSS)",
    "National Power Corporation (NAPOCOR)",
    "Energy Regulatory Commission (ERC)"
  ],
  "Transportation": [
    "Philippine National Railways (PNR)",
    "Metro Rail Transit (MRT)",
    "Light Rail Transit Authority (LRTA)",
    "Manila International Airport Authority (MIAA)",
    "Philippine Ports Authority (PPA)",
    "Toll Regulatory Board (TRB)"
  ],
  "Healthcare": [
    "Philippine General Hospital (PGH)",
    "National Kidney and Transplant Institute (NKTI)",
    "Philippine Heart Center (PHC)",
    "Lung Center of the Philippines (LCP)",
    "Philippine Children's Medical Center (PCMC)",
    "East Avenue Medical Center (EAMC)",
    "Philippine Health Insurance Corporation (PhilHealth)"
  ],
  "Education": [
    "Commission on Higher Education (CHED)",
    "Technical Education and Skills Development Authority (TESDA)",
    "University of the Philippines System",
    "Ateneo de Manila University",
    "De La Salle University",
    "Polytechnic University of the Philippines (PUP)"
  ]
};

interface CommunityFeedProps {
  onPostClick?: (postId: string) => void;
}

export function CommunityFeed({ onPostClick }: CommunityFeedProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [posts] = useState(mockPostsData);
  
  // Initialize filters from URL search parameters or defaults
  const [sortBy, setSortBy] = useState(() => searchParams.get('sortBy') || "trending");
  const [filterSector, setFilterSector] = useState(() => searchParams.get('sector') || "all");
  const [filterStatus, setFilterStatus] = useState(() => searchParams.get('status') || "all");
  const [newPostData, setNewPostData] = useState({
    title: "",
    description: "",
    location: "",
    sector: "",
    priority: "medium"
  });
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<{name: string; size: string}[]>([]);
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [entitySearchTerm, setEntitySearchTerm] = useState("");
  const [showEntityDropdown, setShowEntityDropdown] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openLocationCombobox, setOpenLocationCombobox] = useState(false);
  const [openSectorCombobox, setOpenSectorCombobox] = useState(false);
  const [locationSearchTerm, setLocationSearchTerm] = useState("");
  const [debouncedLocationSearch, setDebouncedLocationSearch] = useState("");

  // Flatten all entities for searching
  const allEntities = Object.values(responsibleEntities).flat();
  
  // Filter entities based on search term
  const filteredEntities = allEntities.filter(entity =>
    entity.toLowerCase().includes(entitySearchTerm.toLowerCase()) &&
    !selectedEntities.includes(entity)
  );

  // Combine all locations and cities
  const allLocations = [...locationsData.all_locations, ...locationsData.cities];

  // Use sectors from JSON data
  const sectors = sectorsData.sectors.map(sector => sector.name);

  const filteredPosts = useMemo(() => {
    return posts
      .filter(post => {
        const sectorMatch = filterSector === "all" || post.sector === filterSector;
        const statusMatch = filterStatus === "all" || post.status === filterStatus;
        return sectorMatch && statusMatch;
      })
      .sort((a, b) => {
        if (sortBy === "trending") {
          return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        } else if (sortBy === "recent") {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }
        return 0;
      });
  }, [posts, sortBy, filterSector, filterStatus]);

  const handleSubmitPost = () => {
    // In a real app, this would submit to backend
    console.log("Submitting post:", newPostData, "Image:", newPostImage, "Documents:", uploadedDocuments, "Tagged Entities:", selectedEntities);
    setNewPostData({
      title: "",
      description: "",
      location: "",
      sector: "",
      priority: "medium"
    }); 
    setNewPostImage(null);
    setUploadedDocuments([]);
    setSelectedEntities([]);
    setEntitySearchTerm("");
    setIsDialogOpen(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPostImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEntity = (entity: string) => {
    if (!selectedEntities.includes(entity)) {
      setSelectedEntities(prev => [...prev, entity]);
      setEntitySearchTerm("");
      setShowEntityDropdown(false);
    }
  };

  const handleRemoveEntity = (entityToRemove: string) => {
    setSelectedEntities(prev => prev.filter(entity => entity !== entityToRemove));
  };

  const getSectorIcon = (entity: string) => {
    if (entity.includes("City") || entity.includes("Municipality") || entity.includes("Provincial")) {
      return <Building className="w-4 h-4" />;
    } else if (entity.includes("Department") || entity.includes("Bureau") || entity.includes("Authority")) {
      return <Building2 className="w-4 h-4" />;
    } else if (entity.includes("Company") || entity.includes("Corporation")) {
      return <Users className="w-4 h-4" />;
    }
    return <Building2 className="w-4 h-4" />;
  };

  const getSectorIconForDropdown = (sectorName: string) => {
    const sector = sectorsData.sectors.find(s => s.name.toLowerCase() === sectorName.toLowerCase());
    const iconName = sector?.icon;
    
    switch (iconName) {
      case 'Construction': return <Construction className="w-4 h-4" />;
      case 'Shield': return <Shield className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'TreePine': return <TreePine className="w-4 h-4" />;
      case 'Cross': return <Cross className="w-4 h-4" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4" />;
      case 'Car': return <Car className="w-4 h-4" />;
      case 'Users': return <Users className="w-4 h-4" />;
      case 'Wifi': return <Wifi className="w-4 h-4" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      case 'Home': return <Home className="w-4 h-4" />;
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      case 'Gavel': return <Gavel className="w-4 h-4" />;
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Coins': return <Coins className="w-4 h-4" />;
      default: return <Building2 className="w-4 h-4" />;
    }
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newDocuments = Array.from(files).map(file => ({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      }));
      setUploadedDocuments(prev => [...prev, ...newDocuments]);
    }
  };

  const handleRemoveDocument = (indexToRemove: number) => {
    setUploadedDocuments(prev => prev.filter((_, index) => index !== indexToRemove));
  };

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

  // Filter locations based on debounced search term
  const filteredLocations = useMemo(() => {
    if (!debouncedLocationSearch) return allLocations.slice(0, 50); // Show first 50 by default
    return allLocations.filter(location =>
      location.toLowerCase().includes(debouncedLocationSearch.toLowerCase())
    ).slice(0, 100); // Limit to 100 results
  }, [allLocations, debouncedLocationSearch]);

  const handleLocationSearchChange = (value: string) => {
    setLocationSearchTerm(value);
    debounceLocationSearch(value);
  };

  // Update URL when filters change
  const updateFiltersInURL = useCallback((newSortBy: string, newSector: string, newStatus: string) => {
    const params = new URLSearchParams();
    
    // Only add non-default values to keep URL clean
    if (newSortBy && newSortBy !== "trending") {
      params.set('sortBy', newSortBy);
    }
    if (newSector && newSector !== "all") {
      params.set('sector', newSector);
    }
    if (newStatus && newStatus !== "all") {
      params.set('status', newStatus);
    }
    
    // Update URL without causing navigation
    setSearchParams(params, { replace: true });
  }, [setSearchParams]);

  // Enhanced filter setters that update both state and URL
  const handleSortByChange = useCallback((value: string) => {
    setSortBy(value);
    updateFiltersInURL(value, filterSector, filterStatus);
  }, [filterSector, filterStatus, updateFiltersInURL]);

  const handleFilterSectorChange = useCallback((value: string) => {
    setFilterSector(value);
    updateFiltersInURL(sortBy, value, filterStatus);
  }, [sortBy, filterStatus, updateFiltersInURL]);

  const handleFilterStatusChange = useCallback((value: string) => {
    setFilterStatus(value);
    updateFiltersInURL(sortBy, filterSector, value);
  }, [sortBy, filterSector, updateFiltersInURL]);

  // Sync state with URL parameters when they change (e.g., browser back/forward)
  useEffect(() => {
    const urlSortBy = searchParams.get('sortBy') || "trending";
    const urlSector = searchParams.get('sector') || "all";
    const urlStatus = searchParams.get('status') || "all";
    
    // Update local state if URL parameters differ
    if (urlSortBy !== sortBy) setSortBy(urlSortBy);
    if (urlSector !== filterSector) setFilterSector(urlSector);
    if (urlStatus !== filterStatus) setFilterStatus(urlStatus);
  }, [searchParams, sortBy, filterSector, filterStatus]);

  // Handle post clicks with scroll position preservation
  const handlePostClick = useCallback((postId: string) => {
    // Store current scroll position
    const currentPosition = window.innerWidth < 1024 
      ? window.scrollY 
      : document.querySelector('.overflow-y-auto')?.scrollTop || 0;
    
    localStorage.setItem('communityScrollPosition', currentPosition.toString());
    
    // Navigate to post detail while preserving current URL parameters
    navigate(`/community/post/${postId}`);
  }, [navigate]);

  // Restore scroll position when returning from post detail
  useEffect(() => {
    const restoreScrollPosition = () => {
      const savedPosition = localStorage.getItem('communityScrollPosition');
      if (savedPosition) {
        const position = parseInt(savedPosition);
        setTimeout(() => {
          if (window.innerWidth < 1024) {
            window.scrollTo({ top: position, behavior: "smooth" });
          } else {
            const mainContent = document.querySelector('.overflow-y-auto');
            if (mainContent) {
              mainContent.scrollTo({ top: position, behavior: "smooth" });
            }
          }
          // Clear the saved position after restoring
          localStorage.removeItem('communityScrollPosition');
        }, 100);
      }
    };

    // Only restore scroll position if we're on the main community page
    if (window.location.pathname === '/community') {
      restoreScrollPosition();
    }
  }, []);

  return (
    <div className="px-4 lg:px-8 py-4 lg:py-6">
      <div className="lg:max-w-6xl lg:mx-auto space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg lg:text-2xl font-medium text-[#1A3E73]">Community Issues</h2>
            <p className="text-sm lg:text-base text-muted-foreground">
              Report and track issues in your area
              {(filterSector !== "all" || filterStatus !== "all" || sortBy !== "trending") && (
                <span className="text-[#1A3E73]">
                  {" • "}
                  {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} 
                  {filterSector !== "all" && ` in ${filterSector}`}
                  {filterStatus !== "all" && ` with status: ${filterStatus.replace('_', ' ')}`}
                </span>
              )}
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} className="">
            <DialogTrigger asChild>
              <Button className="bg-[#1A3E73] hover:bg-[#1A3E73]/90 text-white lg:px-6">
                <Plus className="w-4 h-4" />
                Report
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md lg:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-[#1A3E73]">Report Issue</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Fill out the form below to report a new issue in your community.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#1A3E73] mb-2 block flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  Title
                </label>
                <Input
                  placeholder="Brief description of the issue"
                  value={newPostData.title}
                  onChange={(e) => setNewPostData(prev => ({...prev, title: e.target.value}))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#1A3E73] mb-2 block flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Description
                </label>
                <Textarea
                  placeholder="Provide more details about the issue..."
                  rows={3}
                  value={newPostData.description}
                  onChange={(e) => setNewPostData(prev => ({...prev, description: e.target.value}))}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium text-[#1A3E73] mb-2 block flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  <Popover open={openLocationCombobox} onOpenChange={setOpenLocationCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openLocationCombobox}
                        className="w-full justify-between"
                      >
                        {newPostData.location
                          ? allLocations.find((location) => location === newPostData.location)
                          : "Select location..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput 
                          placeholder="Search location..." 
                          value={locationSearchTerm}
                          onValueChange={handleLocationSearchChange}
                        />
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {filteredLocations.map((location) => (
                              <CommandItem
                                key={location}
                                value={location}
                                onSelect={(currentValue) => {
                                  setNewPostData(prev => ({...prev, location: currentValue === newPostData.location ? "" : currentValue}));
                                  setOpenLocationCombobox(false);
                                  setLocationSearchTerm("");
                                  setDebouncedLocationSearch("");
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    newPostData.location === location ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {location}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1A3E73] mb-2 block flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    Sector
                  </label>
                  <Popover open={openSectorCombobox} onOpenChange={setOpenSectorCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openSectorCombobox}
                        className="w-full justify-between"
                      >
                        {newPostData.sector
                          ? (
                            <div className="flex items-center gap-2">
                              {getSectorIconForDropdown(newPostData.sector)}
                              <span>{newPostData.sector}</span>
                            </div>
                          )
                          : "Select sector..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search sector..." />
                        <CommandEmpty>No sector found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {sectors.map((sector) => (
                              <CommandItem
                                key={sector}
                                value={sector}
                                onSelect={(currentValue) => {
                                  setNewPostData(prev => ({...prev, sector: currentValue === newPostData.sector ? "" : currentValue}));
                                  setOpenSectorCombobox(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    newPostData.sector === sector ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                <div className="flex items-center gap-2">
                                  {getSectorIconForDropdown(sector)}
                                  <span>{sector}</span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#1A3E73] mb-2 block flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Priority Level
                </label>
                <Select 
                  value={newPostData.priority}
                  onValueChange={(value) => setNewPostData(prev => ({...prev, priority: value}))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Responsible Entity Tagging */}
              <div>
                <label className="text-sm font-medium text-[#1A3E73] mb-2 block flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  Tag Responsible Institution
                </label>
                <div className="space-y-3">
                  {/* Selected Entities */}
                  {selectedEntities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedEntities.map((entity) => (
                        <Badge 
                          key={entity} 
                          className="bg-[#1A3E73] text-white pl-2 pr-1 py-1 flex items-center gap-2"
                        >
                          {getSectorIcon(entity)}
                          <span className="text-xs">{entity}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveEntity(entity)}
                            className="h-auto p-0 w-4 h-4 text-white hover:bg-white/20 rounded-full"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Search Input */}
                  <div className="relative">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        value={entitySearchTerm}
                        onChange={(e) => {
                          setEntitySearchTerm(e.target.value);
                          setShowEntityDropdown(e.target.value.length > 0);
                        }}
                        onFocus={() => setShowEntityDropdown(entitySearchTerm.length > 0)}
                        placeholder="Search agencies, LGUs, departments, companies..."
                        className="pl-10"
                      />
                    </div>

                    {/* Dropdown Results */}
                    {showEntityDropdown && filteredEntities.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {filteredEntities.slice(0, 8).map((entity) => (
                          <button
                            key={entity}
                            type="button"
                            onClick={() => handleAddEntity(entity)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm border-b border-gray-100 last:border-b-0"
                          >
                            {getSectorIcon(entity)}
                            <span>{entity}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-gray-500">
                    Tag the specific agencies, LGUs, departments, or companies responsible for addressing this issue.
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm font-medium text-[#1A3E73] mb-2 block flex items-center gap-1.5">
                  <Camera className="w-4 h-4" />
                  Upload Image (Optional)
                </label>
                {newPostImage ? (
                  <div className="relative">
                    <img 
                      src={newPostImage} 
                      alt="Uploaded issue" 
                      className="w-full h-40 object-cover rounded-lg border border-gray-200"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => setNewPostImage(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <label htmlFor="image-upload" className="block cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1A3E73] transition-colors">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">
                        Tap to upload an image of the issue
                      </div>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>

              {/* Document Upload */}
              <div>
                <label className="text-sm font-medium text-[#1A3E73] mb-2 block flex items-center gap-1.5">
                  <Upload className="w-4 h-4" />
                  Upload Documents (Optional)
                </label>
                
                {/* Uploaded Documents List */}
                {uploadedDocuments.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {uploadedDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#1A3E73]" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-gray-900 truncate">{doc.name}</div>
                            <div className="text-xs text-gray-500">{doc.size}</div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveDocument(index)}
                          className="h-auto p-1 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Document Upload Button */}
                <label htmlFor="document-upload" className="block cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#1A3E73] transition-colors">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">
                      Tap to upload documents (PDF, DOC, JPG, PNG)
                    </div>
                  </div>
                  <input
                    id="document-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    multiple
                    className="hidden"
                    onChange={handleDocumentUpload}
                  />
                </label>
              </div>
              
              <Button 
                onClick={handleSubmitPost}
                className="w-full bg-[#1A3E73] hover:bg-[#1A3E73]/90 text-white"
                disabled={!newPostData.title || !newPostData.description || !newPostData.location || !newPostData.sector}
              >
                Submit Report
              </Button>
            </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="p-3 sm:p-4">
          <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
            {/* Sort Filters*/}
            <div className="flex items-center justify-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div className="flex gap-2">
                <Button
                  variant={sortBy === "trending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSortByChange("trending")}
                  className={sortBy === "trending" ? "bg-[#1A3E73] text-white" : ""}
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Button>
                <Button
                  variant={sortBy === "recent" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSortByChange("recent")}
                  className={sortBy === "recent" ? "bg-[#1A3E73] text-white" : ""}
                >
                  <Clock className="w-3 h-3 mr-1" />
                  Recent
                </Button>
              </div>
            </div>
            
            {/* Sector and Status Filter with Clear Button */}
            <div className="space-y-3 lg:space-y-0 lg:flex lg:items-end lg:justify-start lg:gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="sm:w-40 xl:w-52">
                  <label className="text-xs text-muted-foreground block mb-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    Sector
                  </label>
                  <Select value={filterSector} onValueChange={handleFilterSectorChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      {sectors.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          <div className="flex items-center gap-2">
                            {getSectorIconForDropdown(cat)}
                            <span>{cat}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="sm:w-40 xl:w-52">
                  <label className="text-xs text-muted-foreground block mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Status
                  </label>
                  <Select value={filterStatus} onValueChange={handleFilterStatusChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {statusesData.statuses.filter(status => ["pending", "in_review", "responded", "resolved"].includes(status.id)).map((status) => (
                        <SelectItem key={status.id} value={status.id}>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(status.name)}
                            <span>{status.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Clear Filters Button */}
              {(filterSector !== "all" || filterStatus !== "all" || sortBy !== "trending") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSortBy("trending");
                    setFilterSector("all");
                    setFilterStatus("all");
                    updateFiltersInURL("trending", "all", "all");
                  }}
                  className="text-[#1A3E73] border-[#1A3E73] hover:bg-[#1A3E73]/5 col-span-2 sm:col-span-1"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Posts */}
        <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
          {filteredPosts.map(post => (
            <CommunityPost 
              key={post.id} 
              post={post}
              onPostClick={handlePostClick}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No issues found for the selected filters.
              <br />
              <Button 
                variant="link" 
                className="text-[#1A3E73] p-0 h-auto"
                onClick={() => {
                  setSortBy("trending");
                  setFilterSector("all");
                  setFilterStatus("all");
                  updateFiltersInURL("trending", "all", "all");
                }}
              >
                Clear filters to see all issues
              </Button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}