import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { NotFound } from "./components/NotFound";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { MapPage } from "./pages/MapPage";
import { CommunityPage } from "./pages/CommunityPage";
import { CommunityLayout } from "./pages/CommunityLayout";
import { ReportPostPage } from "./pages/ReportPostPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ProjectListPage } from "./pages/ProjectListPage";
import { NotificationsPage } from "./components/NotificationsPage";
import { Profile } from "./components/Profile";
import { Toaster } from "./components/ui/sonner";

// Layout component to handle navigation
function AppLayout() {
  const navigate = useNavigate();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Routes that use the main Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={
              <ErrorBoundary>
                <HomePage />
              </ErrorBoundary>
            } />
            <Route path="search" element={
              <ErrorBoundary>
                <SearchPage />
              </ErrorBoundary>
            } />
            <Route path="map" element={
              <ErrorBoundary>
                <MapPage />
              </ErrorBoundary>
            } />
            <Route path="analytics" element={
              <ErrorBoundary>
                <AnalyticsPage />
              </ErrorBoundary>
            } />
            
            {/* Nested Community Routes */}
            <Route path="community" element={<CommunityLayout />}>
              <Route index element={
                <ErrorBoundary>
                  <CommunityPage />
                </ErrorBoundary>
              } />
              <Route path="post/:postId" element={
                <ErrorBoundary>
                  <ReportPostPage />
                </ErrorBoundary>
              } />
            </Route>
          </Route>
          
          {/* Routes that don't use the main Layout (full-screen pages) */}
          <Route path="project/:projectId" element={
            <ErrorBoundary>
              <ProjectDetailPage />
            </ErrorBoundary>
          } />
          <Route path="list/:category" element={
            <ErrorBoundary>
              <ProjectListPage />
            </ErrorBoundary>
          } />
          <Route path="notifications" element={
            <ErrorBoundary>
              <NotificationsPage onBack={() => navigate(-1)} />
            </ErrorBoundary>
          } />
          <Route path="profile" element={
            <ErrorBoundary>
              <Profile onBack={() => navigate(-1)} />
            </ErrorBoundary>
          } />
          
          {/* 404 Route - Must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Toast Notifications */}
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}

// Main App component with Router wrapper
export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}