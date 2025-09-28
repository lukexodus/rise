import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  FileText,
  Download,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Bookmark,
  Send,
  User,
  Building2,
  Zap,
  GraduationCap,
  Heart,
  Car,
  Wifi,
  TreePine,
  Users,
  Shield,
  Play,
  XCircle,
  Construction,
  Eye,
  Hourglass,
  Cross,
  Briefcase,
  Home,
  Utensils,
  Gavel,
  Globe,
  Coins,
  DollarSign,
  BarChart3,
  Info,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Import data from external JSON files
import projectsData from "../data/projects.json";
import sectorsData from "../data/sectors.json";
import statusesData from "../data/statuses.json";

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
  onReportIssue: () => void;
}

export function ProjectDetail({
  projectId,
  onBack,
  onReportIssue,
}: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [newFeedback, setNewFeedback] = useState("");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  // Reset scroll to top on mobile when component mounts
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, []);

  // Get the project data for the current projectId
  const project = projectsData[projectId as keyof typeof projectsData];
  
  // If project not found, show error state
  if (!project) {
    return (
      <div className="pb-32 p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-[#1A3E73] hover:bg-gray-100 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-medium text-[#1A3E73]">Project Not Found</h1>
        </div>
        <Card className="p-4">
          <p className="text-center text-muted-foreground">
            The requested project could not be found.
          </p>
        </Card>
      </div>
    );
  }

  const [feedback, setFeedback] = useState(project.feedback);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "ongoing":
        return "text-yellow-600";
      case "pending":
        return "text-gray-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <CheckCircle className="w-4 h-4 text-green-600" />
        );
      case "ongoing":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "pending":
        return (
          <AlertCircle className="w-4 h-4 text-gray-400" />
        );
      default:
        return (
          <AlertCircle className="w-4 h-4 text-gray-400" />
        );
    }
  };

  const getSectorIcon = (sectorName: string) => {
    // Access the sectors array from the nested structure
    const sectorsArray = sectorsData.sectors || [];
    const sector = sectorsArray.find((s: any) => s.name.toLowerCase() === sectorName.toLowerCase());
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

  const getStatusIconFromData = (statusName: string) => {
    // Access the statuses array from the nested structure
    const statusesArray = statusesData.statuses || [];
    const status = statusesArray.find((s: any) => s.name.toLowerCase() === statusName.toLowerCase());
    const iconName = status?.icon;
    
    switch (iconName) {
      case 'Hourglass': return <Hourglass className="w-4 h-4" />;
      case 'Eye': return <Eye className="w-4 h-4" />;
      case 'MessageCircle': return <MessageCircle className="w-4 h-4" />;
      case 'CheckCircle': return <CheckCircle className="w-4 h-4" />;
      case 'Clock': return <Clock className="w-4 h-4" />;
      case 'AlertTriangle': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getProjectStatusBadgeColor = (status: string) => {
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

  const budgetData = [
    {
      name: "Spent",
      value: project.budget.spent,
      color: "#1A3E73",
    },
    {
      name: "Remaining",
      value: project.budget.remaining,
      color: "#F2C063",
    },
  ];

  const handleVote = (
    feedbackId: number,
    voteType: "up" | "down",
  ) => {
    setFeedback((prev) =>
      prev.map((item) => {
        if (item.id === feedbackId) {
          const currentVote = item.userVote;
          let newUpvotes = item.upvotes;
          let newDownvotes = item.downvotes;
          let newUserVote: "up" | "down" | null = voteType;

          // Remove previous vote if exists
          if (currentVote === "up") newUpvotes--;
          if (currentVote === "down") newDownvotes--;

          // Add new vote or remove if same vote
          if (currentVote === voteType) {
            newUserVote = null;
          } else {
            if (voteType === "up") newUpvotes++;
            if (voteType === "down") newDownvotes++;
          }

          return {
            ...item,
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            userVote: newUserVote,
          };
        }
        return item;
      }),
    );
  };

  const handleDownload = (documentName?: string) => {
    toast.success(`Downloading${documentName ? ` ${documentName}` : ''}...`);
  };

  const handleSubmitFeedback = async () => {
    if (!newFeedback.trim()) return;
    
    setIsSubmittingFeedback(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newFeedbackItem = {
      id: Math.max(...feedback.map(f => f.id)) + 1,
      author: "You", // In a real app, this would come from user auth
      comment: newFeedback.trim(),
      date: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      userVote: null as "up" | "down" | null
    };
    
    setFeedback(prev => [newFeedbackItem, ...prev]);
    setNewFeedback("");
    setIsSubmittingFeedback(false);
    
    toast.success("Feedback submitted successfully!");
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      toast.success("Project bookmarked!");
    } else {
      toast.info("Bookmark removed");
    }
  };

  return (
    <div className="pb-32">
      {/* Header */}
      <div className="bg-[#1A3E73] text-white p-4 lg:p-6">
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/10 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="text-sm opacity-90">
              {project.id}
            </div>
            <h1 className="text-lg font-medium">
              {project.title}
            </h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmarkToggle}
            className="text-white hover:bg-white/10 p-2"
          >
            <Bookmark 
              className={`w-5 h-5 transition-all duration-200 ${isBookmarked ? 'fill-current scale-110' : ''}`} 
            />
          </Button>
        </div>
        <div className="flex items-center gap-5 text-xs md:text-sm opacity-90">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{project.location}</span>
          </div>
          {/* flex-col space-y-1 md:flex-row */}
          <div className="flex gap-2">
          <Badge className="bg-white/20 text-white border-0 flex items-center gap-1">
            {getSectorIcon(project.sector)}
            {project.sector}
          </Badge>
          <Badge className={`${getProjectStatusBadgeColor(project.status)} border-0 flex items-center gap-1`}>
            {getStatusIconFromData(project.status)}
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
          </div>
          
          {/* Report Issue Button - only show on larger screens in header */}
          <div className="hidden lg:flex lg:ml-auto">
            <Button
              onClick={onReportIssue}
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* Top Section - Budget & Progress side by side on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 mb-4">
          {/* Budget Overview */}
          <Card className="border-0 shadow-lg">
            <div className="p-4 lg:p-6">
              <h3 className="font-medium text-[#1A3E73] mb-3">
                Budget Overview
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="text-center lg:col-span-full xl:col-span-1">
                  <div className="w-20 h-20 lg:w-32 lg:h-32 xl:w-20 xl:h-20 mx-auto mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={budgetData}
                          cx="50%"
                          cy="50%"
                          innerRadius={22}
                          outerRadius={40}
                          startAngle={90}
                          endAngle={450}
                          dataKey="value"
                        >
                          {budgetData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-xs lg:text-sm text-muted-foreground">
                    {((project.budget.spent / project.budget.total) * 100).toFixed(1)}% Used
                  </div>
                </div>
                <div className="space-y-2 lg:space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Total Budget
                    </div>
                    <div className="font-medium text-[#1A3E73]">
                      {formatCurrency(project.budget.total)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Spent
                    </div>
                    <div className="font-medium text-[#1A3E73]">
                      {formatCurrency(project.budget.spent)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Remaining
                    </div>
                    <div className="font-medium text-[#1A3E73]">
                      {formatCurrency(project.budget.remaining)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Progress Tracker */}
          <Card className="border-0 shadow-sm">
            <div className="p-4 lg:p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-[#1A3E73]">
                  Progress
                </h3>
                <Badge className={`${getProjectStatusBadgeColor(project.status)}`}>
                  {project.progress}% Complete
                </Badge>
              </div>
              <Progress
                value={project.progress}
                className="mb-4"
              />
              <div className="flex justify-between text-xs lg:text-sm text-muted-foreground">
                <span>
                  Started: {formatDate(project.startDate)}
                </span>
                <span>
                  Expected: {formatDate(project.expectedCompletion)}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Report Issue Button - show only on mobile between cards */}
        <div className="mb-4 lg:hidden">
          <Button
            onClick={onReportIssue}
            className="w-full bg-[#BF4226] hover:bg-[#BF4226]/90 text-white"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Report Issue
          </Button>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 lg:max-w-md lg:mx-auto xl:max-w-none">
            <TabsTrigger value="overview" className="text-xs lg:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-xs lg:text-sm">
              Documents
            </TabsTrigger>
            <TabsTrigger value="feedback" className="text-xs lg:text-sm">
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            {/* Overview Content - 2-column layout on larger screens */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-6">
              
              {/* Left Column */}
              <div className="space-y-4">
                {/* Project Description */}
                <Card className="border-0 shadow-sm">
                  <div className="p-4 lg:p-6">
                    <h4 className="font-medium text-[#1A3E73] mb-2">Description</h4>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </Card>

                {/* Timeline */}
                <Card className="border-0 shadow-sm">
                  <div className="p-4 lg:p-6">
                    <h4 className="font-medium text-[#1A3E73] mb-3">Timeline</h4>
                    <div className="space-y-3 lg:space-y-4">
                      {project.milestones.map((milestone, index) => (
                        <div key={milestone.id} className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            {getStatusIcon(milestone.status)}
                          </div>
                          <div className="flex-1">
                            <div className={`text-sm lg:text-base font-medium ${getStatusColor(milestone.status)}`}>
                              {milestone.title}
                            </div>
                            <div className="text-xs lg:text-sm text-muted-foreground">
                              {formatDate(milestone.date)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Monthly Spending Chart */}
                <Card className="border-0 shadow-sm">
                  <div className="p-4 lg:p-6">
                    <h4 className="font-medium text-[#1A3E73] mb-3">Monthly Spending</h4>
                    <div className="h-40 lg:h-64 xl:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={project.monthlySpending}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="month" className="text-xs" />
                          <YAxis 
                            className="text-xs"
                            tickFormatter={(value) => `₱${(value / 1000000000).toFixed(1)}B`}
                          />
                          <Bar dataKey="amount" fill="#1A3E73" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-4">
            {/* Documents - Grid layout on larger screens */}
            <Card className="border-0 shadow-sm">
              <div className="p-4 lg:p-6">
                <h4 className="font-medium text-[#1A3E73] mb-3">
                  Project Documents
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                  {project.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <FileText className="w-5 h-5 text-[#1A3E73] flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-[#1A3E73] truncate">
                            {doc.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {doc.type} • {doc.size} • {formatDate(doc.date)}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-[#1A3E73] ml-2 flex-shrink-0"
                        onClick={() => handleDownload(doc.name)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="mt-4">
            <Card className="border-0 shadow-sm">
              <div className="p-4 lg:p-6">
                <h4 className="font-medium text-[#1A3E73] mb-4">
                  Citizen Feedback
                </h4>
                
                {/* Add Feedback Form */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-[#1A3E73]" />
                    <span className="text-sm font-medium text-[#1A3E73]">Share your feedback</span>
                  </div>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Share your thoughts about this project..."
                      value={newFeedback}
                      onChange={(e) => setNewFeedback(e.target.value)}
                      className="resize-none"
                      rows={3}
                    />
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        {newFeedback.length}/500 characters
                      </div>
                      <Button
                        onClick={handleSubmitFeedback}
                        disabled={!newFeedback.trim() || isSubmittingFeedback || newFeedback.length > 500}
                        className="bg-[#1A3E73] hover:bg-[#1A3E73]/90 text-white"
                        size="sm"
                      >
                        {isSubmittingFeedback ? (
                          <>
                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Feedback
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Feedback List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  {feedback.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-100 rounded-lg p-4 bg-white"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-[#1A3E73]">
                            {item.author}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(item.date)}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {item.comment}
                      </p>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleVote(item.id, "up")}
                          className={`flex items-center gap-1 text-xs ${
                            item.userVote === "up"
                              ? "text-green-600"
                              : "text-muted-foreground hover:text-green-600"
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>{item.upvotes}</span>
                        </button>
                        <button
                          onClick={() => handleVote(item.id, "down")}
                          className={`flex items-center gap-1 text-xs ${
                            item.userVote === "down"
                              ? "text-red-600"
                              : "text-muted-foreground hover:text-red-600"
                          }`}
                        >
                          <ThumbsDown className="w-4 h-4" />
                          <span>{item.downvotes}</span>
                        </button>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageCircle className="w-4 h-4" />
                          <span>Reply</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {feedback.length === 0 && (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-muted-foreground">No feedback yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}