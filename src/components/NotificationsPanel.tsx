import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Bell,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  MapPin,
  Building,
  FileText,
  Bookmark,
  Settings,
  X,
} from "lucide-react";

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications = {
  project_updates: [
    {
      id: 1,
      type: "milestone",
      title: "Metro Manila Subway Phase 2",
      message: "Project reached 75% completion milestone",
      timestamp: "2024-11-15T10:30:00Z",
      read: false,
      priority: "high",
      projectId: "PROJ-2024-001",
    },
    {
      id: 2,
      type: "budget",
      title: "CALABARZON Water Supply System",
      message: "Budget increased by ₱2.1B due to material cost adjustments",
      timestamp: "2024-11-14T14:15:00Z",
      read: false,
      priority: "medium",
      projectId: "PROJ-2024-004",
    },
    {
      id: 3,
      type: "delay",
      title: "Bataan Nuclear Power Plant Rehabilitation",
      message: "Timeline extended by 6 months due to regulatory requirements",
      timestamp: "2024-11-13T09:45:00Z",
      read: true,
      priority: "high",
      projectId: "PROJ-2024-006",
    },
    {
      id: 4,
      type: "audit",
      title: "National Broadband Infrastructure",
      message: "COA flagged procurement irregularities - investigation ongoing",
      timestamp: "2024-11-12T16:20:00Z",
      read: false,
      priority: "critical",
      projectId: "PROJ-2024-003",
    },
  ],
  report_feedback: [
    {
      id: 5,
      type: "status_change",
      title: "Report #RPT-2024-156",
      message: "Status changed: Pending → Under Review",
      timestamp: "2024-11-15T11:45:00Z",
      read: false,
      priority: "medium",
      reportId: "RPT-2024-156",
    },
    {
      id: 6,
      type: "official_response",
      title: "DPWH Response",
      message: "Official response received for your road damage report",
      timestamp: "2024-11-14T13:30:00Z",
      read: false,
      priority: "high",
      reportId: "RPT-2024-142",
    },
    {
      id: 7,
      type: "peer_activity",
      title: "Similar Reports Filed",
      message: "15 other citizens reported similar issues in your area",
      timestamp: "2024-11-13T08:15:00Z",
      read: true,
      priority: "low",
      location: "Quezon City",
    },
  ],
  engagement: [
    {
      id: 8,
      type: "upvote",
      title: "Your Post Gained Support",
      message: "Your report about traffic light malfunction received 24 upvotes",
      timestamp: "2024-11-15T12:00:00Z",
      read: false,
      priority: "low",
      postId: "POST-2024-089",
    },
    {
      id: 9,
      type: "reply",
      title: "New Reply",
      message: "Maria Santos replied to your comment on subway construction",
      timestamp: "2024-11-14T15:45:00Z",
      read: false,
      priority: "medium",
      postId: "POST-2024-067",
    },
    {
      id: 10,
      type: "trending",
      title: "Trending in Your Area",
      message: "Most reported: Pothole issues in EDSA - 156 reports this week",
      timestamp: "2024-11-13T07:30:00Z",
      read: true,
      priority: "low",
      location: "Metro Manila",
    },
  ],
  system_updates: [
    {
      id: 11,
      type: "new_project",
      title: "New Project Near You",
      message: "Quezon City Bus Rapid Transit approved - ₱18.5B budget",
      timestamp: "2024-11-14T10:00:00Z",
      read: false,
      priority: "medium",
      location: "Quezon City",
    },
    {
      id: 12,
      type: "sector_highlight",
      title: "Education Sector Update",
      message: "12 new school buildings approved in your province - ₱4.2B allocation",
      timestamp: "2024-11-13T14:20:00Z",
      read: true,
      priority: "medium",
      sector: "Education",
    },
    {
      id: 13,
      type: "government_response",
      title: "DOTr Public Statement",
      message: "Official response to MRT maintenance concerns raised by citizens",
      timestamp: "2024-11-12T11:15:00Z",
      read: true,
      priority: "high",
      agency: "DOTr",
    },
  ],
};

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "milestone": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "budget": return <TrendingUp className="w-4 h-4 text-[#F2C063]" />;
      case "delay": return <Clock className="w-4 h-4 text-yellow-600" />;
      case "audit": return <AlertTriangle className="w-4 h-4 text-[#BF4226]" />;
      case "status_change": return <FileText className="w-4 h-4 text-[#1A3E73]" />;
      case "official_response": return <Building className="w-4 h-4 text-[#1A3E73]" />;
      case "peer_activity": return <MessageCircle className="w-4 h-4 text-muted-foreground" />;
      case "upvote": return <ThumbsUp className="w-4 h-4 text-green-600" />;
      case "reply": return <MessageCircle className="w-4 h-4 text-[#1A3E73]" />;
      case "trending": return <TrendingUp className="w-4 h-4 text-[#F2C063]" />;
      case "new_project": return <MapPin className="w-4 h-4 text-[#1A3E73]" />;
      case "sector_highlight": return <Building className="w-4 h-4 text-[#1A3E73]" />;
      case "government_response": return <Building className="w-4 h-4 text-[#1A3E73]" />;
      default: return <Bell className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "border-l-[#BF4226]";
      case "high": return "border-l-orange-500";
      case "medium": return "border-l-[#F2C063]";
      case "low": return "border-l-gray-300";
      default: return "border-l-gray-300";
    }
  };

  const markAsRead = (category: keyof typeof notifications, notificationId: number) => {
    setNotifications(prev => ({
      ...prev,
      [category]: prev[category].map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    }));
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        updated[key as keyof typeof updated] = updated[key as keyof typeof updated].map(notif => ({
          ...notif,
          read: true
        }));
      });
      return updated;
    });
  };

  const getAllNotifications = () => {
    return [
      ...notifications.project_updates,
      ...notifications.report_feedback,
      ...notifications.engagement,
      ...notifications.system_updates,
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const getUnreadCount = () => {
    return getAllNotifications().filter(notif => !notif.read).length;
  };

  const renderNotificationsList = (notificationsList: any[], category?: keyof typeof notifications) => (
    <div className="space-y-3">
      {notificationsList.map((notification) => (
        <Card 
          key={notification.id}
          className={`p-3 cursor-pointer transition-colors hover:bg-gray-50 border-l-4 ${getPriorityColor(notification.priority)} ${
            !notification.read ? 'bg-blue-50/30' : ''
          }`}
          onClick={() => {
            if (category) {
              markAsRead(category, notification.id);
            } else {
              // For "All" tab, find the correct category
              const correctCategory = Object.keys(notifications).find(key => 
                notifications[key as keyof typeof notifications].some((n: any) => n.id === notification.id)
              ) as keyof typeof notifications;
              if (correctCategory) {
                markAsRead(correctCategory, notification.id);
              }
            }
          }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className={`text-sm ${!notification.read ? 'font-medium text-[#1A3E73]' : 'text-[#1A3E73]'}`}>
                  {notification.title}
                </h4>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatTime(notification.timestamp)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {notification.message}
              </p>
              {!notification.read && (
                <div className="w-2 h-2 bg-[#1A3E73] rounded-full mt-2"></div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-16">
      <Card className="w-full max-w-md mx-4 max-h-[80vh] bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium text-[#1A3E73]">Notifications</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-[#1A3E73] text-white">
              {getUnreadCount()} unread
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-[#1A3E73] text-xs"
            >
              Mark all read
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="px-4 pt-2">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
              <TabsTrigger value="reports" className="text-xs">Reports</TabsTrigger>
              <TabsTrigger value="system" className="text-xs">System</TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 h-96">
            <div className="p-4">
              <TabsContent value="all" className="mt-0">
                {renderNotificationsList(getAllNotifications())}
              </TabsContent>

              <TabsContent value="projects" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-[#1A3E73] mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Project Updates
                  </h3>
                  {renderNotificationsList(notifications.project_updates, 'project_updates')}
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-[#1A3E73] mb-3 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Engagement
                  </h3>
                  {renderNotificationsList(notifications.engagement, 'engagement')}
                </div>
              </TabsContent>

              <TabsContent value="reports" className="mt-0">
                <h3 className="text-sm font-medium text-[#1A3E73] mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Report Feedback
                </h3>
                {renderNotificationsList(notifications.report_feedback, 'report_feedback')}
              </TabsContent>

              <TabsContent value="system" className="mt-0">
                <h3 className="text-sm font-medium text-[#1A3E73] mb-3 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  System Updates
                </h3>
                {renderNotificationsList(notifications.system_updates, 'system_updates')}
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>

        <div className="p-4 border-t bg-gray-50">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-[#1A3E73] border-[#1A3E73]"
          >
            <Settings className="w-4 h-4 mr-2" />
            Notification Settings
          </Button>
        </div>
      </Card>
    </div>
  );
}