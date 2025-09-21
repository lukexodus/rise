import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  ArrowLeft,
  Upload,
  Camera,
  CheckCircle,
  Clock,
  Eye,
  AlertTriangle,
  FileText,
  File,
  X,
} from "lucide-react";

// Import data from external JSON files
import projectsData from "../data/projects.json";
import reportsData from "../data/reports.json";

interface ReportIssueProps {
  projectId: string;
  onBack: () => void;
}

export function ReportIssue({
  projectId,
  onBack,
}: ReportIssueProps) {
  const [comment, setComment] = useState("");
  const [uploadedPhoto, setUploadedPhoto] = useState<
    string | null
  >(null);
  const [uploadedDocument, setUploadedDocument] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userReports, setUserReports] = useState(reportsData);

    // Reset scroll to top on mobile when component mounts
    useEffect(() => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        window.scrollTo(0, 0);
      }
    }, []);

  // Filter reports for current project
  const currentProjectReports = userReports.filter(
    (report) => report.projectId === projectId,
  );

  const project = projectsData[projectId as keyof typeof projectsData];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-700";
      case "reviewed":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      case "reviewed":
        return <Eye className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      setUploadedDocument({
        name: file.name,
        size: `${sizeInMB} MB`,
      });
    }
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newReport = {
      id: userReports.length + 1,
      projectId: projectId,
      date: new Date().toISOString().split("T")[0],
      issue: comment,
      status: "pending" as const,
    };

    setUserReports((prev) => [newReport, ...prev]);
    setComment("");
    setUploadedPhoto(null);
    setUploadedDocument(null);
    setIsSubmitting(false);
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!project) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">
          Project not found
        </p>
        <Button onClick={onBack} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
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
              Report Issue
            </div>
            <h1 className="text-lg font-medium">
              {project.title}
            </h1>
          </div>
        </div>

        <div className="text-sm opacity-90">
          Help us improve this project by reporting issues
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mx-4 mt-4">
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center gap-3 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <div>
                <div className="font-medium">
                  Report Submitted Successfully
                </div>
                <div className="text-sm text-green-600">
                  We'll review your report and respond within
                  3-5 business days.
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Report Form */}
      <div className="px-4 mt-4 space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 max-w-7xl mx-auto">
        {/* Left Column - Report Form */}
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="project"
                className="text-[#1A3E73]"
              >
                Project
              </Label>
              <div className="mt-1 p-3 bg-gray-50 rounded-lg text-[#1A3E73] font-medium">
                {project.title}
              </div>
            </div>

            <div>
              <Label
                htmlFor="attachments"
                className="text-[#1A3E73]"
              >
                Attachments (Optional)
              </Label>
              <div className="mt-2 space-y-3">
                {/* Photo Upload */}
                {uploadedPhoto ? (
                  <div className="relative">
                    <img
                      src={uploadedPhoto}
                      alt="Uploaded issue"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => setUploadedPhoto(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <label
                    htmlFor="photo-upload"
                    className="block"
                  >
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#1A3E73] transition-colors">
                      <Camera className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">
                        Upload Photo
                      </div>
                    </div>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                )}

                {/* Document Upload */}
                {uploadedDocument ? (
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <File className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm font-medium text-blue-900">
                          {uploadedDocument.name}
                        </div>
                        <div className="text-xs text-blue-600">
                          {uploadedDocument.size}
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setUploadedDocument(null)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <label
                    htmlFor="document-upload"
                    className="block"
                  >
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#1A3E73] transition-colors">
                      <FileText className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">
                        Upload Document
                      </div>
                      <div className="text-xs text-gray-500">
                        PDF, DOC, DOCX (Max 10MB)
                      </div>
                    </div>
                    <input
                      id="document-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleDocumentUpload}
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <Label
                htmlFor="comment"
                className="text-[#1A3E73]"
              >
                Describe the Issue
              </Label>
              <Textarea
                id="comment"
                placeholder="Please provide details about the issue you've encountered..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-2 min-h-24 resize-none"
                maxLength={500}
              />
              <div className="text-xs text-gray-500 mt-1">
                {comment.length}/500 characters
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!comment.trim() || isSubmitting}
              className="w-full bg-[#BF4226] hover:bg-[#BF4226]/90 text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Submit Report
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Right Column - Previous Reports */}
        <Card className="p-4 mb-8">
          <h3 className="font-medium text-[#1A3E73] mb-3">
            Your Previous Reports
          </h3>
          {currentProjectReports.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No previous reports for this project</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentProjectReports.map((report) => (
                <div
                  key={report.id}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm text-gray-500">
                      {formatDate(report.date)}
                    </div>
                    <Badge
                      className={`text-xs px-2 py-1 ${getStatusColor(report.status)}`}
                    >
                      <div className="flex items-center gap-1">
                        {getStatusIcon(report.status)}
                        <span className="capitalize">
                          {report.status}
                        </span>
                      </div>
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                    {report.issue}
                  </p>

                  {report.response && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="text-xs text-blue-600 font-medium mb-1">
                        Response (
                        {formatDate(report.responseDate!)})
                      </div>
                      <p className="text-sm text-blue-800">
                        {report.response}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}