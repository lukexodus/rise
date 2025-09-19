import { useState } from "react";
import { CommunityPost } from "./CommunityPost";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Plus, Filter, TrendingUp, Camera, X, Search, Building, Building2, Users, Upload, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

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

const mockPosts = [
  {
    id: "1",
    title: "Poor road conditions on EDSA-Cubao intersection",
    description: "Large potholes causing traffic congestion and vehicle damage. This has been ongoing for 3 weeks now and affects thousands of commuters daily.",
    location: "Quezon City",
    category: "Infrastructure",
    priority: "high" as const,
    upvotes: 234,
    downvotes: 12,
    status: "in_review" as const,
    timeAgo: "2 hours ago",
    department: "DPWH Metro Manila",
    hasUserVoted: null as const,
    imageUrl: "https://images.unsplash.com/photo-1647650299423-7d645ffe320f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "2", 
    title: "Incomplete sidewalk construction near schools",
    description: "Construction has been halted for 2 months, creating safety hazards for students and pedestrians.",
    location: "Makati City",
    category: "Safety",
    priority: "high" as const,
    upvotes: 189,
    downvotes: 8,
    status: "responded" as const,
    timeAgo: "5 hours ago",
    department: "Makati Public Works",
    hasUserVoted: "up" as const
  },
  {
    id: "3",
    title: "Water supply interruption in Subdivision",
    description: "No water supply for 3 days. Manila Water has not provided clear timeline for restoration.",
    location: "Marikina City",
    category: "Utilities",
    priority: "medium" as const,
    upvotes: 156,
    downvotes: 4,
    status: "pending" as const,
    timeAgo: "1 day ago",
    department: "Manila Water Company",
    hasUserVoted: null as const
  },
  {
    id: "4",
    title: "Missing streetlights causing security concerns",
    description: "Several streetlights have been broken for months, making the area unsafe at night.",
    location: "Pasig City",
    category: "Safety",
    priority: "medium" as const,
    upvotes: 98,
    downvotes: 2,
    status: "resolved" as const,
    timeAgo: "3 days ago",
    department: "Pasig City Government",
    hasUserVoted: null as const,
    imageUrl: "https://images.unsplash.com/photo-1719036723449-37680727c0e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9rZW4lMjBzdHJlZXRsaWdodCUyMG5pZ2h0JTIwZGFya3xlbnwxfHx8fDE3NTc5NDM2MzB8MA"
  }
];

interface CommunityFeedProps {
  onPostClick?: (postId: string) => void;
}

export function CommunityFeed({ onPostClick }: CommunityFeedProps) {
  const [posts] = useState(mockPosts);
  const [sortBy, setSortBy] = useState("trending");
  const [filterCategory, setFilterCategory] = useState("all");
  const [newPostData, setNewPostData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    priority: "medium"
  });
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<{name: string; size: string}[]>([]);
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [entitySearchTerm, setEntitySearchTerm] = useState("");
  const [showEntityDropdown, setShowEntityDropdown] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Flatten all entities for searching
  const allEntities = Object.values(responsibleEntities).flat();
  
  // Filter entities based on search term
  const filteredEntities = allEntities.filter(entity =>
    entity.toLowerCase().includes(entitySearchTerm.toLowerCase()) &&
    !selectedEntities.includes(entity)
  );

  const categories = ["Infrastructure", "Safety", "Utilities", "Environment", "Healthcare", "Education"];

  const filteredPosts = posts
    .filter(post => filterCategory === "all" || post.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === "trending") {
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      }
      return 0; // Default to original order for "recent"
    });

  const handleSubmitPost = () => {
    // In a real app, this would submit to backend
    console.log("Submitting post:", newPostData, "Image:", newPostImage, "Documents:", uploadedDocuments, "Tagged Entities:", selectedEntities);
    setNewPostData({
      title: "",
      description: "",
      location: "",
      category: "",
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

  const getCategoryIcon = (entity: string) => {
    if (entity.includes("City") || entity.includes("Municipality") || entity.includes("Provincial")) {
      return <Building className="w-4 h-4" />;
    } else if (entity.includes("Department") || entity.includes("Bureau") || entity.includes("Authority")) {
      return <Building2 className="w-4 h-4" />;
    } else if (entity.includes("Company") || entity.includes("Corporation")) {
      return <Users className="w-4 h-4" />;
    }
    return <Building2 className="w-4 h-4" />;
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

  return (
    <div className="px-4 lg:px-8 py-4 lg:py-6">
      <div className="lg:max-w-6xl lg:mx-auto space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg lg:text-2xl font-medium text-[#1A3E73]">Community Issues</h2>
            <p className="text-sm lg:text-base text-muted-foreground">Report and track issues in your area</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#1A3E73] hover:bg-[#1A3E73]/90 text-white lg:px-6">
                <Plus className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md lg:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-[#1A3E73]">Report New Issue</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Fill out the form below to report a new issue in your community.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#1A3E73] mb-2 block">
                  Issue Title
                </label>
                <Input
                  placeholder="Brief description of the issue"
                  value={newPostData.title}
                  onChange={(e) => setNewPostData(prev => ({...prev, title: e.target.value}))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#1A3E73] mb-2 block">
                  Detailed Description
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
                  <label className="text-sm font-medium text-[#1A3E73] mb-2 block">
                    Location
                  </label>
                  <Input
                    placeholder="City/Area"
                    value={newPostData.location}
                    onChange={(e) => setNewPostData(prev => ({...prev, location: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1A3E73] mb-2 block">
                    Category
                  </label>
                  <Select onValueChange={(value) => setNewPostData(prev => ({...prev, category: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#1A3E73] mb-2 block">
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
                <label className="text-sm font-medium text-[#1A3E73] mb-2 block">
                  Tag Responsible Agencies/Institutions
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
                          {getCategoryIcon(entity)}
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
                            {getCategoryIcon(entity)}
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
                <label className="text-sm font-medium text-[#1A3E73] mb-2 block">
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
                <label className="text-sm font-medium text-[#1A3E73] mb-2 block">
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
                disabled={!newPostData.title || !newPostData.description || !newPostData.location || !newPostData.category}
              >
                Submit Report
              </Button>
            </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="p-3 lg:p-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div className="flex gap-2">
                <Button
                  variant={sortBy === "trending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("trending")}
                  className={sortBy === "trending" ? "bg-[#1A3E73] text-white" : ""}
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Button>
                <Button
                  variant={sortBy === "recent" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("recent")}
                  className={sortBy === "recent" ? "bg-[#1A3E73] text-white" : ""}
                >
                  Recent
                </Button>
              </div>
            </div>
            
            <div className="flex gap-1 overflow-x-auto lg:flex-wrap">
              <Badge
                variant={filterCategory === "all" ? "default" : "outline"}
                className={`cursor-pointer text-xs ${
                  filterCategory === "all" ? "bg-[#F2C063] text-[#1A3E73]" : ""
                }`}
                onClick={() => setFilterCategory("all")}
              >
                All
              </Badge>
              {categories.map(cat => (
                <Badge
                  key={cat}
                  variant={filterCategory === cat ? "default" : "outline"}
                  className={`cursor-pointer text-xs whitespace-nowrap ${
                    filterCategory === cat ? "bg-[#F2C063] text-[#1A3E73]" : ""
                  }`}
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Posts */}
        <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
          {filteredPosts.map(post => (
            <CommunityPost 
              key={post.id} 
              post={post}
              onPostClick={onPostClick}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-8 sm:col-span-2">
            <p className="text-muted-foreground">No issues found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}