import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ProjectDetail } from "../components/ProjectDetail";
import { useState, useEffect } from "react";
import { ReportIssue } from "../components/ReportIssue";
import { useNavigationState } from "../hooks/useNavigationState";
import { NotFound } from "../components/NotFound";

// Import project data to validate project existence
import projectsData from "../data/projects.json";

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { restoreNavigationState } = useNavigationState();
  const [showReportIssue, setShowReportIssue] = useState(false);
  const [projectExists, setProjectExists] = useState<boolean | null>(null);

  // Check if project exists in the data
  useEffect(() => {
    if (projectId) {
      // Check if project exists in the projects data (projects are keyed by ID)
      const exists = projectId in projectsData;
      setProjectExists(exists);
    } else {
      setProjectExists(false);
    }
  }, [projectId]);

  // Handle back navigation with proper state restoration
  const handleBack = () => {
    // Try to restore navigation state first
    const restored = restoreNavigationState('project');
    
    if (!restored) {
      // Fallback navigation based on URL parameters
      const searchParams = new URLSearchParams(location.search);
      const from = searchParams.get('from');
      const category = searchParams.get('category');
      
      if (from === 'list' && category) {
        navigate(`/list/${category}`);
      } else if (from === 'map') {
        navigate('/map');
      } else if (from === 'search') {
        navigate('/search');
      } else {
        navigate('/');
      }
    }
  };

  // Handle report issue
  const handleReportIssue = () => {
    console.log('Report issue clicked'); // Debug log
    setShowReportIssue(true);
  };

  // Handle close report issue
  const handleCloseReportIssue = () => {
    console.log('Closing report issue'); // Debug log
    setShowReportIssue(false);
  };

  // Show loading state while checking project existence
  if (projectExists === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#1A3E73] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  // Show NotFound if project doesn't exist
  if (!projectId || !projectExists) {
    return (
      <NotFound 
        title="Project Not Found"
        message="The project you're looking for doesn't exist or may have been removed."
        showBackButton={true}
        showHomeButton={true}
      />
    );
  }

  return (
    <>
      {!showReportIssue ? (
        <ProjectDetail
          projectId={projectId}
          onBack={handleBack}
          onReportIssue={handleReportIssue}
        />
      ) : (
        <ReportIssue
          projectId={projectId}
          onBack={handleCloseReportIssue}
        />
      )}
    </>
  );
}