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
  name: "Juan Dela Cruz",
  email: "juan@email.com",
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
    <div className="pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A3E73] to-[#2A4E83] text-white p-4 lg:p-6 xl:p-8">
        <div className="max-w-6xl mx-auto flex items-center gap-3 lg:gap-4 mb-2">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20 p-2 lg:p-3"
            >
              <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
            </Button>
          )}
          <h1 className="text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">Profile</h1>
        </div>
        <p className="text-sm lg:text-base xl:text-lg 2xl:text-xl opacity-90 max-w-6xl mx-auto">
          Your civic engagement dashboard
        </p>
      </div>

      <div className="p-4 lg:p-6 xl:p-8 2xl:p-10 space-y-4 lg:space-y-6 xl:space-y-8">
        <div className="max-w-6xl mx-auto space-y-4 lg:space-y-6 xl:space-y-8">
          {/* User Info Card */}
          <Card className="p-4 lg:p-6 xl:p-8">
            <div className="flex items-start gap-4 lg:gap-6">
              <div className="relative">
                <Avatar className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-[#1A3E73] text-white">
                  <div className="flex items-center justify-center w-full h-full text-xl lg:text-2xl xl:text-3xl font-medium">
                    {mockUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </Avatar>
                {mockUser.verificationStatus === "verified" && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 lg:p-1.5">
                    <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 lg:gap-3 mb-1 lg:mb-2">
                  <h3 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-[#1A3E73]">
                    {mockUser.name}
                  </h3>
                  <Badge className="bg-green-100 text-green-700 text-xs lg:text-sm xl:text-base px-2 py-1 lg:px-3 lg:py-1.5 xl:px-4 xl:py-2">
                    <Shield className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                    Verified
                  </Badge>
                </div>

                <div className="space-y-1 lg:space-y-2 text-sm lg:text-base xl:text-lg text-muted-foreground">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <Mail className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span>{mockUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3">
                    <MapPin className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span>{mockUser.location}</span>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3">
                    <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span>Member since {mockUser.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Civic Engagement Stats */}
          <Card className="p-4 lg:p-6 xl:p-8">
            <h3 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-[#1A3E73] mb-3 lg:mb-4 xl:mb-6">
              Civic Engagement
            </h3>
            <div className="grid grid-cols-3 gap-4 lg:gap-6 xl:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-[#BF4226]/10 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3">
                  <AlertTriangle className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-[#BF4226]" />
                </div>
                <div className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-[#1A3E73]">
                  {mockUser.reportsSubmitted}
                </div>
                <div className="text-xs lg:text-sm xl:text-base text-muted-foreground">
                  Reports
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-[#1A3E73]/10 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3">
                  <BookOpen className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-[#1A3E73]" />
                </div>
                <div className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-[#1A3E73]">
                  {mockUser.projectsFollowing}
                </div>
                <div className="text-xs lg:text-sm xl:text-base text-muted-foreground">
                  Following
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-[#F2C063]/10 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3">
                  <Award className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-[#F2C063]" />
                </div>
                <div className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-[#1A3E73]">
                  {mockUser.communityPoints}
                </div>
                <div className="text-xs lg:text-sm xl:text-base text-muted-foreground">
                  Points
                </div>
              </div>
            </div>
          </Card>

          {/* Saved Projects */}
          <Card className="p-4 lg:p-6 xl:p-8">
            <div className="flex items-center justify-between mb-3 lg:mb-4 xl:mb-6">
              <h3 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-[#1A3E73]">
                Saved Projects
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#1A3E73] p-1 lg:p-2"
              >
                <span className="text-sm lg:text-base xl:text-lg">View All</span>
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 ml-1" />
              </Button>
            </div>

            <div className="space-y-3 lg:space-y-4 xl:space-y-6">
              {mockSavedProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between py-2 lg:py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1">
                    <div className="text-sm lg:text-base xl:text-lg font-medium text-[#1A3E73] mb-1">
                      {project.title}
                    </div>
                    <div className="text-xs lg:text-sm xl:text-base text-muted-foreground">
                      Updated {project.lastUpdate}
                    </div>
                  </div>
                  <Badge
                    className={`text-xs lg:text-sm xl:text-base px-2 py-1 lg:px-3 lg:py-1.5 xl:px-4 xl:py-2 ${getStatusColor(project.status)}`}
                  >
                    {project.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Reports */}
          <Card className="p-4 lg:p-6 xl:p-8">
            <div className="flex items-center justify-between mb-3 lg:mb-4 xl:mb-6">
              <h3 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-[#1A3E73]">
                Recent Reports
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#1A3E73] p-1 lg:p-2"
              >
                <span className="text-sm lg:text-base xl:text-lg">View All</span>
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 ml-1" />
              </Button>
            </div>

            <div className="space-y-3 lg:space-y-4 xl:space-y-6">
              {mockRecentReports.slice(0, 2).map((report) => (
                <div
                  key={report.id}
                  className="border border-gray-200 rounded-lg p-3 lg:p-4 xl:p-5"
                >
                  <div className="flex justify-between items-start mb-2 lg:mb-3">
                    <div className="flex-1">
                      <div className="text-sm lg:text-base xl:text-lg font-medium text-[#1A3E73] mb-1">
                        {report.project}
                      </div>
                      <div className="text-xs lg:text-sm xl:text-base text-muted-foreground mb-1">
                        {report.date}
                      </div>
                    </div>
                    <Badge
                      className={`text-xs lg:text-sm xl:text-base px-2 py-1 lg:px-3 lg:py-1.5 xl:px-4 xl:py-2 ${getStatusColor(report.status)}`}
                    >
                      <div className="flex items-center gap-1 lg:gap-2">
                        {getStatusIcon(report.status)}
                        <span className="capitalize">
                          {report.status}
                        </span>
                      </div>
                    </Badge>
                  </div>
                  <p className="text-sm lg:text-base xl:text-lg text-gray-700">
                    {report.issue}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-4 lg:p-6 xl:p-8">
            <h3 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-[#1A3E73] mb-3 lg:mb-4 xl:mb-6">
              Quick Actions
            </h3>
            <div className="space-y-3 lg:space-y-4 xl:space-y-6">
              <button className="w-full flex items-center justify-between p-3 lg:p-4 xl:p-5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 lg:gap-4 xl:gap-5">
                  <Bell className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-[#1A3E73]" />
                  <span className="text-sm lg:text-base xl:text-lg font-medium">
                    Notification Settings
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center justify-between p-3 lg:p-4 xl:p-5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 lg:gap-4 xl:gap-5">
                  <Shield className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-[#1A3E73]" />
                  <span className="text-sm lg:text-base xl:text-lg font-medium">
                    Privacy Settings
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center justify-between p-3 lg:p-4 xl:p-5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 lg:gap-4 xl:gap-5">
                  <Settings className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-[#1A3E73]" />
                  <span className="text-sm lg:text-base xl:text-lg font-medium">
                    Account Settings
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-muted-foreground" />
              </button>
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card className="p-4 lg:p-6 xl:p-8">
            <h3 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-[#1A3E73] mb-3 lg:mb-4 xl:mb-6">
              Notifications
            </h3>
            <div className="space-y-4 lg:space-y-6 xl:space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm lg:text-base xl:text-lg font-medium">
                    Project Updates
                  </div>
                  <div className="text-xs lg:text-sm xl:text-base text-muted-foreground">
                    Get notified about saved projects
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm lg:text-base xl:text-lg font-medium">
                    Report Status
                  </div>
                  <div className="text-xs lg:text-sm xl:text-base text-muted-foreground">
                    Updates on your submitted reports
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm lg:text-base xl:text-lg font-medium">
                    Community Activity
                  </div>
                  <div className="text-xs lg:text-sm xl:text-base text-muted-foreground">
                    New posts and comments
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* Help & Support */}
          <Card className="p-4 lg:p-6 xl:p-8">
            <h3 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-[#1A3E73] mb-3 lg:mb-4 xl:mb-6">
              Help & Support
            </h3>
            <div className="space-y-3 lg:space-y-4 xl:space-y-6">
              <button className="w-full flex items-center justify-between p-3 lg:p-4 xl:p-5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 lg:gap-4 xl:gap-5">
                  <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-[#1A3E73]" />
                  <span className="text-sm lg:text-base xl:text-lg font-medium">
                    Contact Support
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center justify-between p-3 lg:p-4 xl:p-5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 lg:gap-4 xl:gap-5">
                  <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-[#1A3E73]" />
                  <span className="text-sm lg:text-base xl:text-lg font-medium">
                    How RISE Works
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-muted-foreground" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}