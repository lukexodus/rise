import React, { useState, useEffect } from "react";
import { BudgetOverview } from "./components/BudgetOverview";
import { ProjectCards } from "./components/ProjectCards";
import { BottomNavigation } from "./components/BottomNavigation";
import { CommunityFeed } from "./components/CommunityFeed";
import { ProjectMap } from "./components/ProjectMap";
import { SearchProjects } from "./components/SearchProjects";
import { ProjectDetail } from "./components/ProjectDetail";
import { ReportIssue } from "./components/ReportIssue";
import { ReportPost } from "./components/ReportPost";
import { Analytics } from "./components/Analytics";
import { Header } from "./components/Header";
import { NotificationsPage } from "./components/NotificationsPage";
import { Profile } from "./components/Profile";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedProjectId, setSelectedProjectId] = useState<
    string | null
  >(null);
  const [selectedPostId, setSelectedPostId] = useState<
    string | null
  >(null);
  const [showReportIssue, setShowReportIssue] = useState(false);
  const [showNotifications, setShowNotifications] =
    useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Store scroll positions for each tab
  const [scrollPositions, setScrollPositions] = useState<
    Record<string, number>
  >({
    home: 0,
    map: 0,
    search: 0,
    community: 0,
    analytics: 0,
  });

  // Save and restore scroll positions
  const saveScrollPosition = (tab: string) => {
    const scrollY = window.scrollY;
    setScrollPositions((prev) => ({
      ...prev,
      [tab]: scrollY,
    }));
  };

  const restoreScrollPosition = (tab: string) => {
    const savedPosition = scrollPositions[tab] || 0;
    setTimeout(() => {
      window.scrollTo({
        top: savedPosition,
        behavior: "smooth",
      });
    }, 50); // Small delay to ensure DOM is ready
  };

  // Scroll to top when opening project detail
  useEffect(() => {
    if (selectedProjectId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProjectId]);

  // Scroll to top when opening report post detail
  useEffect(() => {
    if (selectedPostId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedPostId]);

  // Scroll to top when opening notifications
  useEffect(() => {
    if (showNotifications) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showNotifications]);

  // Scroll to top when opening profile
  useEffect(() => {
    if (showProfile) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showProfile]);

  // Handle project clicks with scroll position saving
  const handleProjectClick = (projectId: string) => {
    // Save current scroll position for the active tab
    saveScrollPosition(activeTab);
    setSelectedProjectId(projectId);
  };

  // Handle project detail back with scroll restoration
  const handleProjectBack = () => {
    setSelectedProjectId(null);
    // Restore scroll position for the current tab
    restoreScrollPosition(activeTab);
  };

  // Handle post clicks with scroll position saving
  const handlePostClick = (postId: string) => {
    // Save current scroll position for the active tab
    saveScrollPosition(activeTab);
    setSelectedPostId(postId);
  };

  // Handle post detail back with scroll restoration
  const handlePostBack = () => {
    setSelectedPostId(null);
    // Restore scroll position for the current tab
    restoreScrollPosition(activeTab);
  };

  // Handle tab changes and reset project/report states
  const handleTabChange = (newTab: string) => {
    // If clicking the same tab, scroll to top
    if (
      newTab === activeTab &&
      !selectedProjectId &&
      !selectedPostId &&
      !showReportIssue &&
      !showNotifications &&
      !showProfile
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Save current scroll position before switching tabs
    if (
      !selectedProjectId &&
      !selectedPostId &&
      !showReportIssue &&
      !showNotifications &&
      !showProfile
    ) {
      saveScrollPosition(activeTab);
    }

    setActiveTab(newTab);
    setSelectedProjectId(null);
    setSelectedPostId(null);
    setShowReportIssue(false);
    setShowNotifications(false);
    setShowProfile(false);

    // Restore scroll position for the new tab or scroll to top
    if (scrollPositions[newTab] > 0) {
      restoreScrollPosition(newTab);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Mock budget data
  const budgetData = {
    totalBudget: 5400000000000, // 5.4 Trillion PHP
    allocated: 4300000000000, // 4.3 Trillion PHP
    spent: 2800000000000, // 2.8 Trillion PHP
    remaining: 2600000000000, // 2.6 Trillion PHP
  };

  const renderContent = () => {
    // Show profile page if enabled
    if (showProfile) {
      return <Profile onBack={() => setShowProfile(false)} />;
    }

    // Show notifications page if enabled
    if (showNotifications) {
      return (
        <NotificationsPage
          onBack={() => setShowNotifications(false)}
        />
      );
    }

    // Show report post detail if a post is selected
    if (selectedPostId) {
      return (
        <ReportPost
          postId={selectedPostId}
          onBack={handlePostBack}
        />
      );
    }

    // Show report issue form if enabled
    if (showReportIssue && selectedProjectId) {
      return (
        <ReportIssue
          projectId={selectedProjectId}
          onBack={() => setShowReportIssue(false)}
        />
      );
    }

    // Show project detail if a project is selected
    if (selectedProjectId) {
      return (
        <ProjectDetail
          projectId={selectedProjectId}
          onBack={handleProjectBack}
          onReportIssue={() => setShowReportIssue(true)}
        />
      );
    }

    switch (activeTab) {
      case "home":
        return (
          <div className="pb-20 lg:pb-0">
            {/* Header only shows on mobile */}
            <div className="lg:hidden">
              <Header
                onNotificationsClick={() =>
                  setShowNotifications(true)
                }
                onProfileClick={() => setShowProfile(true)}
              />
            </div>
            <div className="bg-gradient-to-br from-[#1A3E73] to-[#2A4E83]">
              <BudgetOverview {...budgetData} />
            </div>
            <ProjectCards onProjectClick={handleProjectClick} />
          </div>
        );
      case "map":
        return (
          <div className="pb-20 lg:pb-0 lg:h-full">
            <ProjectMap onProjectClick={handleProjectClick} />
          </div>
        );
      case "search":
        return (
          <div className="pb-20 lg:pb-0">
            <SearchProjects
              onProjectClick={handleProjectClick}
            />
          </div>
        );
      case "community":
        return (
          <div className="pb-20 lg:pb-0">
            <CommunityFeed onPostClick={handlePostClick} />
          </div>
        );
      case "analytics":
        return (
          <div className="pb-20 lg:pb-0">
            <Analytics />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="mx-auto bg-white min-h-screen relative">
          {renderContent()}
          <BottomNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden lg:block">
        <div className="flex h-screen">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-xl font-medium text-[#1A3E73]">
                BantayBayan
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Government Transparency Platform
              </p>
            </div>

            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {[
                  {
                    id: "home",
                    label: "Dashboard",
                    icon: "🏠",
                  },
                  {
                    id: "search",
                    label: "Search Projects",
                    icon: "🔍",
                  },
                  {
                    id: "map",
                    label: "Project Map",
                    icon: "🗺️",
                  },
                  {
                    id: "community",
                    label: "Community",
                    icon: "👥",
                  },
                  {
                    id: "analytics",
                    label: "Analytics",
                    icon: "📊",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-[#1A3E73] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </nav>

            <div className="p-4 border-t border-gray-200">
              <div className="space-y-2">
                <button
                  onClick={() => setShowNotifications(true)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg">🔔</span>
                  <span className="font-medium">
                    Notifications
                  </span>
                </button>
                <button
                  onClick={() => setShowProfile(true)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg">👤</span>
                  <span className="font-medium">Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto bg-gray-50">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}