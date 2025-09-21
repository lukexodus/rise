import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Separator } from "./ui/separator";
import {
  Bell,
  BellDot,
  CheckCircle,
  CheckCheck,
  Clock,
  AlertTriangle,
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  MapPin,
  Building,
  FileText,
  Settings,
  ArrowLeft,
  DollarSign,
} from "lucide-react";

// Import data from external JSON file
import notificationsData from "../data/notifications.json";

interface NotificationsPageProps {
  onBack: () => void;
}

export function NotificationsPage({
  onBack,
}: NotificationsPageProps) {
  
  // Reset scroll to top on mobile when component mounts
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, []);
  
  // Handle back navigation with scroll restoration on mobile
  const handleBack = () => {
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
      // Get stored scroll position
      const storedScroll = sessionStorage.getItem('mobile-scroll-/');
      
      // Navigate back
      onBack();
      
      // Restore scroll position after navigation
      if (storedScroll) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(storedScroll));
          sessionStorage.removeItem('mobile-scroll-/');
        }, 50);
      }
    } else {
      onBack();
    }
  };
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(notificationsData);
  const [
    visibleNotificationsCount,
    setVisibleNotificationsCount,
  ] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

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
      case "milestone":
        return (
          <CheckCircle className="w-4 h-4 text-green-600" />
        );
      case "budget":
        return (
          <DollarSign className="w-4 h-4 text-[#F2C063]" />
        );
      case "delay":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "audit":
        return (
          <AlertTriangle className="w-4 h-4 text-[#BF4226]" />
        );
      case "status_change":
        return <FileText className="w-4 h-4 text-[#1A3E73]" />;
      case "official_response":
        return <Building className="w-4 h-4 text-[#1A3E73]" />;
      case "peer_activity":
        return (
          <MessageCircle className="w-4 h-4 text-muted-foreground" />
        );
      case "upvote":
        return <ThumbsUp className="w-4 h-4 text-green-600" />;
      case "reply":
        return (
          <MessageCircle className="w-4 h-4 text-[#1A3E73]" />
        );
      case "trending":
        return (
          <TrendingUp className="w-4 h-4 text-[#F2C063]" />
        );
      case "new_project":
        return <MapPin className="w-4 h-4 text-[#1A3E73]" />;
      case "sector_highlight":
        return <Building className="w-4 h-4 text-[#1A3E73]" />;
      case "government_response":
        return <Building className="w-4 h-4 text-[#1A3E73]" />;
      default:
        return (
          <Bell className="w-4 h-4 text-muted-foreground" />
        );
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "border-l-[#BF4226]";
      case "high":
        return "border-l-orange-500";
      case "medium":
        return "border-l-[#F2C063]";
      case "low":
        return "border-l-gray-300";
      default:
        return "border-l-gray-300";
    }
  };

  const markAsRead = (
    category: keyof typeof notifications,
    notificationId: number,
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [category]: prev[category].map((notif) =>
        notif.id === notificationId
          ? { ...notif, read: true }
          : notif,
      ),
    }));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        updated[key as keyof typeof updated] = updated[
          key as keyof typeof updated
        ].map((notif) => ({
          ...notif,
          read: true,
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
    ].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() -
        new Date(a.timestamp).getTime(),
    );
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "projects":
        return [
          ...notifications.project_updates,
          ...notifications.engagement,
        ].sort(
          (a, b) =>
            new Date(b.timestamp).getTime() -
            new Date(a.timestamp).getTime(),
        );
      case "reports":
        return notifications.report_feedback;
      case "system":
        return notifications.system_updates;
      default:
        return getAllNotifications();
    }
  };

  const filteredNotifications = getFilteredNotifications();
  const visibleNotifications = filteredNotifications.slice(
    0,
    visibleNotificationsCount,
  );
  const hasMoreNotifications =
    visibleNotificationsCount < filteredNotifications.length;

  const getUnreadCount = () => {
    return getAllNotifications().filter((notif) => !notif.read)
      .length;
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate API call delay
    setTimeout(() => {
      setVisibleNotificationsCount((prev) =>
        Math.min(prev + 8, filteredNotifications.length),
      );
      setIsLoadingMore(false);
    }, 800);
  };

  // Reset visible count when tab changes
  useEffect(() => {
    setVisibleNotificationsCount(12);
  }, [activeTab]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (
          target.isIntersecting &&
          hasMoreNotifications &&
          !isLoadingMore
        ) {
          handleLoadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    if (loadMoreTriggerRef.current) {
      observer.observe(loadMoreTriggerRef.current);
    }

    return () => {
      if (loadMoreTriggerRef.current) {
        observer.unobserve(loadMoreTriggerRef.current);
      }
    };
  }, [hasMoreNotifications, isLoadingMore]);

  const renderNotificationsList = (
    notificationsList: any[],
    category?: keyof typeof notifications,
  ) => (
    <div className="space-y-3">
      {notificationsList.map((notification) => (
        <Card
          key={notification.id}
          className={`p-3 cursor-pointer transition-colors hover:bg-gray-50 border-l-4 ${getPriorityColor(notification.priority)} ${
            !notification.read ? "bg-blue-50/30" : ""
          }`}
          onClick={() => {
            if (category) {
              markAsRead(category, notification.id);
            } else {
              // For "All" tab, find the correct category
              const correctCategory = Object.keys(
                notifications,
              ).find((key) =>
                notifications[
                  key as keyof typeof notifications
                ].some((n: any) => n.id === notification.id),
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
                <h4
                  className={`text-sm ${!notification.read ? "font-medium text-[#1A3E73]" : "text-[#1A3E73]"}`}
                >
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

      {/* Infinite Scroll Trigger & Load More Button */}
      {hasMoreNotifications && (
        <div className="pt-2 border-t">
          {/* Invisible trigger for infinite scroll */}
          <div
            ref={loadMoreTriggerRef}
            className="h-1 w-full"
          />

          {/* Loading indicator or Load More button */}
          {isLoadingMore ? (
            <div className="flex items-center justify-center gap-2 py-4 text-[#1A3E73]">
              <div className="w-4 h-4 border-2 border-[#1A3E73] border-t-transparent rounded-full animate-spin"></div>
              Loading more notifications...
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={handleLoadMore}
              className="w-full text-[#1A3E73] border-[#1A3E73] hover:bg-[#1A3E73]/5"
            >
              Load More Notifications (
              {filteredNotifications.length -
                visibleNotificationsCount}{" "}
              remaining)
            </Button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A3E73] to-[#2A4E83] text-white p-4 lg:p-6 xl:p-8">
        <div className="max-w-6xl mx-auto flex items-center gap-3 lg:gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-white hover:bg-white/20 p-2 lg:p-3"
          >
            <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">
              Notifications
            </h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-2 lg:p-3"
          >
            <Settings className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 lg:p-6 xl:p-8 2xl:p-10 space-y-4 lg:space-y-6 xl:space-y-8">
        <div className="max-w-5xl mx-auto space-y-4 lg:space-y-6 xl:space-y-8">
          {/* Stats Header */}
          <Card className="p-4 lg:p-6 xl:p-8">
            <div className="flex items-center justify-between">
              <Badge
                variant="secondary"
                className="bg-[#1A3E73] text-white flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5"
              >
                <BellDot className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
                <span className="text-sm lg:text-base xl:text-lg 2xl:text-xl font-medium">
                  {getUnreadCount()} unread
                </span>
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-[#1A3E73] text-sm lg:text-base xl:text-lg 2xl:text-xl flex items-center gap-2 lg:gap-3 px-3 lg:px-4 xl:px-5 py-2 lg:py-2.5"
              >
                <CheckCheck className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
                Mark all read
              </Button>
            </div>
          </Card>

          {/* Tabs and Notifications */}
          <Card className="p-4 lg:p-6 xl:p-8 2xl:p-10 pb-8 mb-20 lg:mb-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4 lg:space-y-6 xl:space-y-8"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="text-sm xl:text-lg 2xl:text-xl">
                  All
                </TabsTrigger>
                <TabsTrigger value="projects" className="text-sm xl:text-lg 2xl:text-xl">
                  Projects
                </TabsTrigger>
                <TabsTrigger value="reports" className="text-sm xl:text-lg 2xl:text-xl">
                  Reports
                </TabsTrigger>
                <TabsTrigger value="system" className="text-sm xl:text-lg 2xl:text-xl">
                  System
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="">
                {renderNotificationsList(visibleNotifications)}
              </TabsContent>

              <TabsContent
                value="projects"
                className="space-y-6"
              >
                <div>
                  <h3 className="text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold text-[#1A3E73] mb-4 lg:mb-6 xl:mb-8 flex items-center gap-2 lg:gap-3 xl:gap-4">
                    <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8" />
                    Project Updates & Engagement
                  </h3>
                  {renderNotificationsList(visibleNotifications)}
                </div>
              </TabsContent>

              <TabsContent value="reports" className="">
                <h3 className="text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold text-[#1A3E73] mb-4 lg:mb-6 xl:mb-8 flex items-center gap-2 lg:gap-3 xl:gap-4">
                  <FileText className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8" />
                  Report Feedback
                </h3>
                {renderNotificationsList(
                  visibleNotifications,
                  "report_feedback",
                )}
              </TabsContent>

              <TabsContent value="system" className="">
                <h3 className="text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold text-[#1A3E73] mb-4 lg:mb-6 xl:mb-8 flex items-center gap-2 lg:gap-3 xl:gap-4">
                  <Building className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8" />
                  System Updates
                </h3>
                {renderNotificationsList(
                  visibleNotifications,
                  "system_updates",
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}