import React from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
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
    const from = searchParams.get('from');
    const category = searchParams.get('category');
    
    // Try to restore the previous navigation state based on where user came from
    if (from === 'list' && category) {
      const restored = restoreNavigationState('home', `/list/${category}`);
      if (!restored) {
        navigate(`/list/${category}`);
      }
    } else if (from === 'search') {
      const restored = restoreNavigationState('search', '/search');
      if (!restored) {
        navigate('/search');
      }
    } else if (from === 'map') {
      const restored = restoreNavigationState('map', '/map');
      if (!restored) {
        navigate('/map');
      }
    } else if (from === 'community') {
      const restored = restoreNavigationState('community', '/community');
      if (!restored) {
        navigate('/community');
      }
    } else {
      // Default to trying home navigation state, then fallback to home
      const restored = restoreNavigationState('home', '/');
      if (!restored) {
        navigate('/');
      }
    }
  };

  // Handle report issue
  const handleReportIssue = () => {
    setShowReportIssue(true);
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
      <ProjectDetail
        projectId={projectId}
        onBack={handleBack}
        onReportIssue={handleReportIssue}
      />
      
      {/* Report Issue Modal */}
      {showReportIssue && (
        <ReportIssue
          projectId={projectId}
          onBack={() => setShowReportIssue(false)}
        />
      )}
    </>
  );
}