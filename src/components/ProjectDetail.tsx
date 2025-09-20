import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
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

// Import data from external JSON file
import projectsData from "../data/projects.json";

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

  return (
    <div className="pb-32">
      {/* Header */}
      <div className="bg-[#1A3E73] text-white p-4">
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
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="text-white hover:bg-white/10 p-2"
          >
            <Bookmark 
              className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} 
            />
          </Button>
        </div>

        <div className="flex items-center gap-4 text-sm opacity-90">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{project.location}</span>
          </div>
          <Badge className="bg-white/20 text-white border-0">
            {project.category}
          </Badge>
          <Badge className={`${getProjectStatusBadgeColor(project.status)} border-0`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Budget Overview */}
      <Card className="mx-4 mb-4 mt-4 border-0 shadow-lg relative z-10">
        <div className="p-4 mt-4 relative z-0">
          <h3 className="font-medium text-[#1A3E73] mb-3">
            Budget Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-2">
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
              <div className="text-xs text-muted-foreground">
                {(
                  (project.budget.spent /
                    project.budget.total) *
                  100
                ).toFixed(1)}
                % Used
              </div>
            </div>
            <div className="space-y-2">
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
      <Card className="mx-4 mb-4 border-0 shadow-sm">
        <div className="p-4">
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
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              Started: {formatDate(project.startDate)}
            </span>
            <span>
              Expected:{" "}
              {formatDate(project.expectedCompletion)}
            </span>
          </div>
        </div>
      </Card>

      {/* Report Issue Button */}
      <div className="px-4 mb-4">
        <Button
          onClick={onReportIssue}
          className="w-full bg-[#BF4226] hover:bg-[#BF4226]/90 text-white"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Report Issue
        </Button>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="overview" className="text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-xs">
              Documents
            </TabsTrigger>
            <TabsTrigger value="feedback" className="text-xs">
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="overview"
            className="mt-4 space-y-4"
          >
            {/* Project Description */}
            <Card className="border-0 shadow-sm">
              <div className="p-4">
                <h4 className="font-medium text-[#1A3E73] mb-2">
                  Description
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="border-0 shadow-sm">
              <div className="p-4">
                <h4 className="font-medium text-[#1A3E73] mb-3">
                  Timeline
                </h4>
                <div className="space-y-3">
                  {project.milestones.map(
                    (milestone, index) => (
                      <div
                        key={milestone.id}
                        className="flex items-center gap-3"
                      >
                        <div className="flex-shrink-0">
                          {getStatusIcon(milestone.status)}
                        </div>
                        <div className="flex-1">
                          <div
                            className={`text-sm font-medium ${getStatusColor(milestone.status)}`}
                          >
                            {milestone.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(milestone.date)}
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </Card>

            {/* Monthly Spending Chart */}
            <Card className="border-0 shadow-sm">
              <div className="p-4">
                <h4 className="font-medium text-[#1A3E73] mb-3">
                  Monthly Spending
                </h4>
                <div className="h-40">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <BarChart data={project.monthlySpending}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="opacity-30"
                      />
                      <XAxis
                        dataKey="month"
                        className="text-xs"
                      />
                      <YAxis
                        className="text-xs"
                        tickFormatter={(value) =>
                          `₱${(value / 1000000000).toFixed(1)}B`
                        }
                      />
                      <Bar
                        dataKey="amount"
                        fill="#1A3E73"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-4">
            <Card className="border-0 shadow-sm">
              <div className="p-4">
                <h4 className="font-medium text-[#1A3E73] mb-3">
                  Project Documents
                </h4>
                <div className="space-y-3">
                  {project.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#1A3E73]" />
                        <div>
                          <div className="text-sm font-medium text-[#1A3E73]">
                            {doc.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {doc.type} • {doc.size} •{" "}
                            {formatDate(doc.date)}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-[#1A3E73]"
                        onClick={() => handleDownload()}
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
              <div className="p-4">
                <h4 className="font-medium text-[#1A3E73] mb-3">
                  Citizen Feedback
                </h4>
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
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
                          onClick={() =>
                            handleVote(item.id, "up")
                          }
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
                          onClick={() =>
                            handleVote(item.id, "down")
                          }
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
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}