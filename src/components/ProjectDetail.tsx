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

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
  onReportIssue: () => void;
}

// Complete project data for all 8 projects
const projectsData = {
  "PROJ-2024-001": {
    id: "PROJ-2024-001",
    title: "Metro Manila Subway Project Phase 2",
    location: "Metro Manila",
    category: "Transportation",
    status: "ongoing" as const,
    progress: 68,
    startDate: "2023-01-01",
    expectedCompletion: "2025-12-31",
    description: "Underground rail system connecting key areas in Metro Manila",
    budget: {
      total: 75000000000,
      allocated: 75000000000,
      spent: 51000000000,
      remaining: 24000000000,
    },
    milestones: [
      { id: 1, title: "Site Preparation", date: "2022-03-01", status: "completed" },
      { id: 2, title: "Foundation Work", date: "2022-08-15", status: "completed" },
      { id: 3, title: "Tunnel Boring", date: "2023-06-01", status: "completed" },
      { id: 4, title: "Station Construction", date: "2024-01-01", status: "ongoing" },
      { id: 5, title: "Track Installation", date: "2024-09-01", status: "pending" },
      { id: 6, title: "Systems Testing", date: "2025-06-01", status: "pending" },
      { id: 7, title: "Commercial Operation", date: "2025-12-31", status: "pending" },
    ],
    monthlySpending: [
      { month: "Jul", amount: 2500000000 },
      { month: "Aug", amount: 3200000000 },
      { month: "Sep", amount: 2800000000 },
      { month: "Oct", amount: 3500000000 },
      { month: "Nov", amount: 2900000000 },
    ],
    documents: [
      { id: 1, name: "Environmental Impact Assessment", type: "PDF", size: "2.4 MB", date: "2024-01-15" },
      { id: 2, name: "Technical Specifications", type: "PDF", size: "5.1 MB", date: "2024-02-20" },
      { id: 3, name: "Progress Report Q3 2024", type: "PDF", size: "1.8 MB", date: "2024-10-01" },
      { id: 4, name: "Budget Breakdown 2024", type: "XLSX", size: "892 KB", date: "2024-01-01" },
    ],
    feedback: [
      { id: 1, author: "Juan Dela Cruz", date: "2024-11-10", comment: "Great progress on the project! The reduced traffic in our area is already noticeable.", upvotes: 24, downvotes: 2, userVote: "up" as const },
      { id: 2, author: "Maria Santos", date: "2024-11-08", comment: "Construction noise has been disruptive, but understanding it's for long-term benefit.", upvotes: 15, downvotes: 8, userVote: null },
      { id: 3, author: "Ana Rodriguez", date: "2024-11-05", comment: "Looking forward to the completion. This will greatly improve commuting in Metro Manila.", upvotes: 31, downvotes: 1, userVote: "up" as const },
    ],
  },
  "PROJ-2024-002": {
    id: "PROJ-2024-002",
    title: "CALABARZON Water Supply System Expansion",
    location: "CALABARZON",
    category: "Utilities",
    status: "ongoing" as const,
    progress: 85,
    startDate: "2023-03-01",
    expectedCompletion: "2024-09-30",
    description: "Water infrastructure improvement for CALABARZON region",
    budget: {
      total: 8200000000,
      allocated: 8200000000,
      spent: 6970000000,
      remaining: 1230000000,
    },
    milestones: [
      { id: 1, title: "Water Source Assessment", date: "2023-03-15", status: "completed" },
      { id: 2, title: "Treatment Plant Construction", date: "2023-06-01", status: "completed" },
      { id: 3, title: "Distribution Network", date: "2023-12-01", status: "completed" },
      { id: 4, title: "Household Connections", date: "2024-03-01", status: "completed" },
      { id: 5, title: "Quality Testing", date: "2024-07-01", status: "ongoing" },
      { id: 6, title: "System Handover", date: "2024-09-30", status: "pending" },
    ],
    monthlySpending: [
      { month: "Jul", amount: 450000000 },
      { month: "Aug", amount: 380000000 },
      { month: "Sep", amount: 420000000 },
      { month: "Oct", amount: 350000000 },
      { month: "Nov", amount: 290000000 },
    ],
    documents: [
      { id: 1, name: "Water Quality Standards", type: "PDF", size: "1.8 MB", date: "2024-01-10" },
      { id: 2, name: "Distribution Map", type: "PDF", size: "5.2 MB", date: "2024-07-20" },
      { id: 3, name: "Quality Test Results", type: "PDF", size: "2.1 MB", date: "2024-10-15" },
      { id: 4, name: "Maintenance Schedule", type: "PDF", size: "1.5 MB", date: "2024-08-01" },
    ],
    feedback: [
      { id: 1, author: "Community Leader", date: "2024-11-10", comment: "Water quality has improved dramatically. Very grateful for this essential service upgrade.", upvotes: 92, downvotes: 2, userVote: "up" as const },
      { id: 2, author: "Local Resident", date: "2024-11-07", comment: "Construction was well-managed with minimal disruption to daily life. Thank you!", upvotes: 67, downvotes: 4, userVote: "up" as const },
      { id: 3, author: "Health Worker", date: "2024-11-05", comment: "This will significantly reduce waterborne diseases in our communities. Excellent project!", upvotes: 78, downvotes: 1, userVote: null },
    ],
  },
  "PROJ-2024-003": {
    id: "PROJ-2024-003",
    title: "National Broadband Infrastructure Program",
    location: "Nationwide",
    category: "Technology",
    status: "delayed" as const,
    progress: 42,
    startDate: "2022-06-01",
    expectedCompletion: "2026-06-30",
    description: "Nationwide fiber optic network expansion",
    budget: {
      total: 45000000000,
      allocated: 45000000000,
      spent: 18900000000,
      remaining: 26100000000,
    },
    milestones: [
      { id: 1, title: "Network Design", date: "2023-08-01", status: "completed" },
      { id: 2, title: "Procurement Phase", date: "2023-12-01", status: "completed" },
      { id: 3, title: "Metro Manila Rollout", date: "2024-03-01", status: "completed" },
      { id: 4, title: "Luzon Coverage", date: "2024-12-01", status: "ongoing" },
      { id: 5, title: "Visayas Expansion", date: "2025-06-01", status: "pending" },
      { id: 6, title: "Mindanao Integration", date: "2025-12-01", status: "pending" },
      { id: 7, title: "Full National Coverage", date: "2026-06-30", status: "pending" },
    ],
    monthlySpending: [
      { month: "Jul", amount: 1800000000 },
      { month: "Aug", amount: 2100000000 },
      { month: "Sep", amount: 1900000000 },
      { month: "Oct", amount: 1600000000 },
      { month: "Nov", amount: 1400000000 },
    ],
    documents: [
      { id: 1, name: "Network Architecture Plan", type: "PDF", size: "8.7 MB", date: "2023-07-15" },
      { id: 2, name: "Delay Analysis Report", type: "PDF", size: "2.8 MB", date: "2024-09-10" },
      { id: 3, name: "Phase 1 Completion Report", type: "PDF", size: "4.3 MB", date: "2024-08-01" },
      { id: 4, name: "Revised Timeline", type: "PDF", size: "1.9 MB", date: "2024-10-15" },
    ],
    feedback: [
      { id: 1, author: "Tech Entrepreneur", date: "2024-11-12", comment: "The delay is concerning for our digital economy. Hope to see faster progress in Q1 2025.", upvotes: 67, downvotes: 8, userVote: null },
      { id: 2, author: "Rural Teacher", date: "2024-11-08", comment: "Looking forward to better internet in our province. Online learning has been challenging.", upvotes: 54, downvotes: 3, userVote: "up" as const },
      { id: 3, author: "Business Owner", date: "2024-11-05", comment: "Metro Manila rollout was excellent. Hoping other regions get the same quality implementation.", upvotes: 43, downvotes: 5, userVote: "up" as const },
    ],
  },
  "PROJ-2024-004": {
    id: "PROJ-2024-004",
    title: "Cebu BRT System Implementation",
    location: "Central Visayas",
    category: "Transportation",
    status: "completed" as const,
    progress: 100,
    startDate: "2022-01-01",
    expectedCompletion: "2024-01-31",
    description: "Bus Rapid Transit system for Cebu metropolitan area",
    budget: {
      total: 16800000000,
      allocated: 16800000000,
      spent: 16800000000,
      remaining: 0,
    },
    milestones: [
      { id: 1, title: "Route Planning", date: "2020-07-01", status: "completed" },
      { id: 2, title: "Lane Construction", date: "2021-03-01", status: "completed" },
      { id: 3, title: "Station Development", date: "2022-01-01", status: "completed" },
      { id: 4, title: "Fleet Procurement", date: "2022-09-01", status: "completed" },
      { id: 5, title: "System Testing", date: "2023-09-01", status: "completed" },
      { id: 6, title: "Commercial Launch", date: "2024-01-31", status: "completed" },
    ],
    monthlySpending: [
      { month: "Sep 23", amount: 800000000 },
      { month: "Oct 23", amount: 900000000 },
      { month: "Nov 23", amount: 750000000 },
      { month: "Dec 23", amount: 650000000 },
      { month: "Jan 24", amount: 400000000 },
    ],
    documents: [
      { id: 1, name: "Route Optimization Study", type: "PDF", size: "4.1 MB", date: "2024-02-01" },
      { id: 2, name: "Operations Manual", type: "PDF", size: "6.5 MB", date: "2024-01-20" },
      { id: 3, name: "Performance Metrics", type: "PDF", size: "2.8 MB", date: "2024-10-01" },
      { id: 4, name: "Passenger Survey Results", type: "PDF", size: "3.2 MB", date: "2024-09-15" },
    ],
    feedback: [
      { id: 1, author: "Daily Commuter", date: "2024-11-08", comment: "BRT has cut my commute time in half! Much more reliable than previous options.", upvotes: 156, downvotes: 8, userVote: "up" as const },
      { id: 2, author: "Business Owner", date: "2024-11-05", comment: "Great for business - easier for customers and employees to reach our location.", upvotes: 89, downvotes: 3, userVote: "up" as const },
      { id: 3, author: "Tourist", date: "2024-11-02", comment: "Impressed with the modern system! Makes getting around Cebu much easier.", upvotes: 67, downvotes: 2, userVote: null },
    ],
  },
  "PROJ-2024-005": {
    id: "PROJ-2024-005",
    title: "Mindanao Rural Electrification Program",
    location: "Mindanao",
    category: "Utilities",
    status: "completed" as const,
    progress: 100,
    startDate: "2021-06-01",
    expectedCompletion: "2024-03-31",
    description: "Power grid expansion for rural communities in Mindanao",
    budget: {
      total: 12500000000,
      allocated: 12500000000,
      spent: 12500000000,
      remaining: 0,
    },
    milestones: [
      { id: 1, title: "Community Assessment", date: "2020-04-01", status: "completed" },
      { id: 2, title: "Grid Planning", date: "2020-08-01", status: "completed" },
      { id: 3, title: "Power Line Installation", date: "2021-01-01", status: "completed" },
      { id: 4, title: "Transformer Setup", date: "2022-06-01", status: "completed" },
      { id: 5, title: "Connection Testing", date: "2023-09-01", status: "completed" },
      { id: 6, title: "Final Handover", date: "2024-03-31", status: "completed" },
    ],
    monthlySpending: [
      { month: "Nov 23", amount: 800000000 },
      { month: "Dec 23", amount: 900000000 },
      { month: "Jan 24", amount: 750000000 },
      { month: "Feb 24", amount: 650000000 },
      { month: "Mar 24", amount: 400000000 },
    ],
    documents: [
      { id: 1, name: "Community Impact Report", type: "PDF", size: "3.2 MB", date: "2024-04-01" },
      { id: 2, name: "Final Engineering Report", type: "PDF", size: "6.8 MB", date: "2024-03-25" },
      { id: 3, name: "Completion Certificate", type: "PDF", size: "1.1 MB", date: "2024-03-31" },
      { id: 4, name: "Maintenance Guidelines", type: "PDF", size: "2.5 MB", date: "2024-04-05" },
    ],
    feedback: [
      { id: 1, author: "Roberto Fernandez", date: "2024-04-10", comment: "This project has transformed our community! Our children can now study at night and local businesses are thriving.", upvotes: 89, downvotes: 3, userVote: "up" as const },
      { id: 2, author: "Luz Mercado", date: "2024-04-08", comment: "Finally reliable electricity! Thank you to everyone involved in making this happen.", upvotes: 76, downvotes: 1, userVote: "up" as const },
      { id: 3, author: "Carlos Reyes", date: "2024-04-05", comment: "Excellent work by the implementation team. The installation was done professionally and efficiently.", upvotes: 45, downvotes: 2, userVote: null },
    ],
  },
  "PROJ-2024-006": {
    id: "PROJ-2024-006",
    title: "Ilocos Norte Solar Farm Project",
    location: "Ilocos Region",
    category: "Utilities",
    status: "ongoing" as const,
    progress: 36,
    startDate: "2023-09-01",
    expectedCompletion: "2025-12-31",
    description: "Large-scale solar power generation facility",
    budget: {
      total: 8900000000,
      allocated: 8900000000,
      spent: 3200000000,
      remaining: 5700000000,
    },
    milestones: [
      { id: 1, title: "Site Preparation", date: "2023-10-01", status: "completed" },
      { id: 2, title: "Environmental Clearance", date: "2023-12-01", status: "completed" },
      { id: 3, title: "Solar Panel Installation", date: "2024-03-01", status: "completed" },
      { id: 4, title: "Grid Connection Setup", date: "2024-08-01", status: "ongoing" },
      { id: 5, title: "Power Testing", date: "2025-03-01", status: "pending" },
      { id: 6, title: "Commercial Operation", date: "2025-12-31", status: "pending" },
    ],
    monthlySpending: [
      { month: "Jul", amount: 420000000 },
      { month: "Aug", amount: 380000000 },
      { month: "Sep", amount: 450000000 },
      { month: "Oct", amount: 390000000 },
      { month: "Nov", amount: 350000000 },
    ],
    documents: [
      { id: 1, name: "Environmental Impact Assessment", type: "PDF", size: "4.2 MB", date: "2023-11-10" },
      { id: 2, name: "Solar Panel Specifications", type: "PDF", size: "6.8 MB", date: "2024-02-15" },
      { id: 3, name: "Grid Integration Plan", type: "PDF", size: "3.1 MB", date: "2024-07-20" },
      { id: 4, name: "Progress Report Q3 2024", type: "PDF", size: "2.4 MB", date: "2024-10-01" },
    ],
    feedback: [
      { id: 1, author: "Environmental Advocate", date: "2024-11-08", comment: "Excellent renewable energy initiative! This will significantly reduce our carbon footprint.", upvotes: 89, downvotes: 4, userVote: "up" as const },
      { id: 2, author: "Local Farmer", date: "2024-11-05", comment: "Good project but hope it doesn't affect our agricultural land usage in the long term.", upvotes: 45, downvotes: 12, userVote: null },
      { id: 3, author: "Energy Professional", date: "2024-11-03", comment: "Great investment in renewable energy. Will help stabilize power supply in Northern Luzon.", upvotes: 67, downvotes: 3, userVote: "up" as const },
    ],
  },
  "PROJ-2024-007": {
    id: "PROJ-2024-007",
    title: "Palawan Airport Modernization",
    location: "MIMAROPA",
    category: "Infrastructure",
    status: "delayed" as const,
    progress: 25,
    startDate: "2023-04-01",
    expectedCompletion: "2024-11-30",
    description: "Upgrade and expansion of Puerto Princesa Airport",
    budget: {
      total: 5600000000,
      allocated: 5600000000,
      spent: 1400000000,
      remaining: 4200000000,
    },
    milestones: [
      { id: 1, title: "Design and Planning", date: "2023-06-01", status: "completed" },
      { id: 2, title: "Terminal Expansion", date: "2023-10-01", status: "completed" },
      { id: 3, title: "Runway Improvements", date: "2024-02-01", status: "ongoing" },
      { id: 4, title: "Baggage System Upgrade", date: "2024-06-01", status: "pending" },
      { id: 5, title: "Security System Installation", date: "2024-09-01", status: "pending" },
      { id: 6, title: "Final Testing and Handover", date: "2024-11-30", status: "pending" },
    ],
    monthlySpending: [
      { month: "Jul", amount: 180000000 },
      { month: "Aug", amount: 150000000 },
      { month: "Sep", amount: 120000000 },
      { month: "Oct", amount: 100000000 },
      { month: "Nov", amount: 95000000 },
    ],
    documents: [
      { id: 1, name: "Airport Master Plan", type: "PDF", size: "8.7 MB", date: "2023-05-15" },
      { id: 2, name: "Delay Analysis Report", type: "PDF", size: "2.1 MB", date: "2024-08-20" },
      { id: 3, name: "Terminal Design Blueprints", type: "PDF", size: "12.4 MB", date: "2023-09-10" },
      { id: 4, name: "Environmental Compliance Report", type: "PDF", size: "3.8 MB", date: "2024-01-15" },
    ],
    feedback: [
      { id: 1, author: "Tourism Operator", date: "2024-11-09", comment: "The delays are affecting tourism bookings. Hope to see completion soon for the holiday season.", upvotes: 78, downvotes: 15, userVote: "up" as const },
      { id: 2, author: "Local Resident", date: "2024-11-06", comment: "Construction noise has been disruptive but we understand the long-term benefits for Palawan.", upvotes: 54, downvotes: 8, userVote: null },
      { id: 3, author: "Business Owner", date: "2024-11-04", comment: "Looking forward to better airport facilities. This will boost business and tourism in our area.", upvotes: 62, downvotes: 3, userVote: "up" as const },
    ],
  },
  "PROJ-2024-008": {
    id: "PROJ-2024-008",
    title: "Bicol Regional Medical Center Upgrade",
    location: "Bicol Region",
    category: "Healthcare",
    status: "ongoing" as const,
    progress: 84,
    startDate: "2023-02-01",
    expectedCompletion: "2024-08-31",
    description: "Hospital expansion and equipment modernization",
    budget: {
      total: 3200000000,
      allocated: 3200000000,
      spent: 2700000000,
      remaining: 500000000,
    },
    milestones: [
      { id: 1, title: "Building Expansion", date: "2023-04-01", status: "completed" },
      { id: 2, title: "Medical Equipment Procurement", date: "2023-08-01", status: "completed" },
      { id: 3, title: "ICU Upgrade", date: "2023-12-01", status: "completed" },
      { id: 4, title: "Emergency Department Expansion", date: "2024-03-01", status: "completed" },
      { id: 5, title: "Staff Training Programs", date: "2024-06-01", status: "ongoing" },
      { id: 6, title: "Final Certification", date: "2024-08-31", status: "pending" },
    ],
    monthlySpending: [
      { month: "Jul", amount: 120000000 },
      { month: "Aug", amount: 98000000 },
      { month: "Sep", amount: 85000000 },
      { month: "Oct", amount: 75000000 },
      { month: "Nov", amount: 65000000 },
    ],
    documents: [
      { id: 1, name: "Medical Equipment Inventory", type: "PDF", size: "3.4 MB", date: "2024-01-20" },
      { id: 2, name: "Staff Training Manual", type: "PDF", size: "5.7 MB", date: "2024-06-15" },
      { id: 3, name: "Safety Protocols Update", type: "PDF", size: "2.8 MB", date: "2024-08-10" },
      { id: 4, name: "Progress Report Q3 2024", type: "PDF", size: "1.9 MB", date: "2024-10-01" },
    ],
    feedback: [
      { id: 1, author: "Healthcare Worker", date: "2024-11-10", comment: "The new equipment and facilities have greatly improved our ability to serve patients. Thank you!", upvotes: 156, downvotes: 2, userVote: "up" as const },
      { id: 2, author: "Patient Family", date: "2024-11-07", comment: "Much better facilities now. The new emergency department saved our father's life last month.", upvotes: 203, downvotes: 1, userVote: "up" as const },
      { id: 3, author: "Community Leader", date: "2024-11-05", comment: "Excellent investment in our region's healthcare infrastructure. Well-managed project execution.", upvotes: 98, downvotes: 5, userVote: "up" as const },
    ],
  },
};

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