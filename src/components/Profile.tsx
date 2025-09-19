import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Avatar } from "./ui/avatar";
import {
  User,
  Shield,
  BookOpen,
  MessageSquare,
  Bell,
  Settings,
  ChevronRight,
  Award,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  ArrowLeft,
} from "lucide-react";

// Mock user data
const mockUser = {
  name: "Maria Santos",
  email: "maria.santos@email.com",
  phone: "+63 917 123 4567",
  location: "Quezon City, Metro Manila",
  joinDate: "March 2024",
  verificationStatus: "verified",
  citizenId: "QC-2024-789456",
  reportsSubmitted: 8,
  projectsFollowing: 12,
  communityPoints: 245,
};

// Mock saved projects
const mockSavedProjects = [
  {
    id: "PROJ-2024-001",
    title: "Metro Manila Subway Phase 2",
    status: "ongoing",
    lastUpdate: "2 days ago",
  },
  {
    id: "PROJ-2024-003",
    title: "Cebu Bus Rapid Transit",
    status: "planning",
    lastUpdate: "1 week ago",
  },
  {
    id: "PROJ-2024-007",
    title: "Davao Smart City Initiative",
    status: "completed",
    lastUpdate: "3 days ago",
  },
];

// Mock recent reports
const mockRecentReports = [
  {
    id: 1,
    project: "Metro Manila Subway Phase 2",
    date: "Nov 15, 2024",
    status: "reviewed",
    issue: "Construction noise during night hours",
  },
  {
    id: 2,
    project: "Metro Manila Subway Phase 2",
    date: "Nov 10, 2024",
    status: "resolved",
    issue: "Safety barriers damaged near station",
  },
  {
    id: 3,
    project: "Metro Manila Subway Phase 2",
    date: "Nov 8, 2024",
    status: "pending",
    issue: "Water accumulation causing mosquito breeding",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "resolved":
    case "completed":
      return "bg-green-100 text-green-700";
    case "reviewed":
    case "ongoing":
      return "bg-blue-100 text-blue-700";
    case "pending":
    case "planning":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "resolved":
      return <CheckCircle className="w-3 h-3" />;
    case "reviewed":
      return <Eye className="w-3 h-3" />;
    case "pending":
      return <Clock className="w-3 h-3" />;
    default:
      return <Clock className="w-3 h-3" />;
  }
};

interface ProfileProps {
  onBack?: () => void;
}

export function Profile({ onBack }: ProfileProps) {
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A3E73] to-[#2A4E83] text-white p-4">
        <div className="flex items-center gap-3 mb-2">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <h1 className="text-xl font-medium">Profile</h1>
        </div>
        <p className="text-sm opacity-90">
          Your civic engagement dashboard
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* User Info Card */}
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16 bg-[#1A3E73] text-white">
                <div className="flex items-center justify-center w-full h-full text-xl font-medium">
                  {mockUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </Avatar>
              {mockUser.verificationStatus === "verified" && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-[#1A3E73]">
                  {mockUser.name}
                </h3>
                <Badge className="bg-green-100 text-green-700 text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  <span>{mockUser.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  <span>{mockUser.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>Member since {mockUser.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Civic Engagement Stats */}
        <Card className="p-4">
          <h3 className="font-medium text-[#1A3E73] mb-3">
            Civic Engagement
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#BF4226]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertTriangle className="w-6 h-6 text-[#BF4226]" />
              </div>
              <div className="text-lg font-medium text-[#1A3E73]">
                {mockUser.reportsSubmitted}
              </div>
              <div className="text-xs text-muted-foreground">
                Reports
              </div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#1A3E73]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-6 h-6 text-[#1A3E73]" />
              </div>
              <div className="text-lg font-medium text-[#1A3E73]">
                {mockUser.projectsFollowing}
              </div>
              <div className="text-xs text-muted-foreground">
                Following
              </div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#F2C063]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6 text-[#F2C063]" />
              </div>
              <div className="text-lg font-medium text-[#1A3E73]">
                {mockUser.communityPoints}
              </div>
              <div className="text-xs text-muted-foreground">
                Points
              </div>
            </div>
          </div>
        </Card>

        {/* Saved Projects */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-[#1A3E73]">
              Saved Projects
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#1A3E73] p-1"
            >
              <span className="text-sm">View All</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-3">
            {mockSavedProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm text-[#1A3E73] mb-1">
                    {project.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Updated {project.lastUpdate}
                  </div>
                </div>
                <Badge
                  className={`text-xs ${getStatusColor(project.status)}`}
                >
                  {project.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Reports */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-[#1A3E73]">
              Recent Reports
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#1A3E73] p-1"
            >
              <span className="text-sm">View All</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-3">
            {mockRecentReports.slice(0, 2).map((report) => (
              <div
                key={report.id}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-[#1A3E73] mb-1">
                      {report.project}
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {report.date}
                    </div>
                  </div>
                  <Badge
                    className={`text-xs ${getStatusColor(report.status)}`}
                  >
                    <div className="flex items-center gap-1">
                      {getStatusIcon(report.status)}
                      <span className="capitalize">
                        {report.status}
                      </span>
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-gray-700">
                  {report.issue}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-4">
          <h3 className="font-medium text-[#1A3E73]">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#1A3E73]" />
                <span className="text-sm font-medium">
                  Notification Settings
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#1A3E73]" />
                <span className="text-sm font-medium">
                  Privacy Settings
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-[#1A3E73]" />
                <span className="text-sm font-medium">
                  Account Settings
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card className="p-4">
          <h3 className="font-medium text-[#1A3E73]">
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">
                  Project Updates
                </div>
                <div className="text-xs text-muted-foreground">
                  Get notified about saved projects
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">
                  Report Status
                </div>
                <div className="text-xs text-muted-foreground">
                  Updates on your submitted reports
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">
                  Community Activity
                </div>
                <div className="text-xs text-muted-foreground">
                  New posts and comments
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Help & Support */}
        <Card className="p-4">
          <h3 className="font-medium text-[#1A3E73] mb-3">
            Help & Support
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-[#1A3E73]" />
                <span className="text-sm font-medium">
                  Contact Support
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#1A3E73]" />
                <span className="text-sm font-medium">
                  How BantayBayan Works
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}