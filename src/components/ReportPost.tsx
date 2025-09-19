import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  MapPin,
  Clock,
  AlertTriangle,
  Building2,
  FileText,
  Send,
} from "lucide-react";

interface ReportPostProps {
  postId: string;
  onBack: () => void;
}

// Mock data for detailed post view
const mockDetailedPost = {
  id: "1",
  title: "Poor road conditions on EDSA-Cubao intersection",
  description:
    "Large potholes causing traffic congestion and vehicle damage. This has been ongoing for 3 weeks now and affects thousands of commuters daily. The intersection becomes particularly dangerous during rainy weather when the potholes fill with water and are harder to see.",
  location: "Quezon City",
  category: "Infrastructure",
  priority: "high" as const,
  upvotes: 234,
  downvotes: 12,
  status: "in_review" as const,
  timeAgo: "2 hours ago",
  taggedEntities: [
    "Department of Public Works and Highways (DPWH)",
    "Metro Manila Development Authority (MMDA)",
    "Quezon City Government",
  ],
  hasUserVoted: null as const,
  images: [
    "https://images.unsplash.com/photo-1647650299423-7d645ffe320f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  documents: [
    { name: "Traffic_Survey_Report.pdf", size: "2.4 MB" },
    { name: "Damage_Assessment.docx", size: "1.8 MB" },
  ],
  comments: [
    {
      id: "1",
      author: "Maria Santos",
      timeAgo: "1 hour ago",
      content:
        "This is getting worse every day. Almost damaged my motorcycle wheel yesterday!",
      upvotes: 12,
    },
    {
      id: "2",
      author: "DPWH Metro Manila",
      timeAgo: "45 minutes ago",
      content:
        "Thank you for the report. We have scheduled this for inspection next week and will begin repairs within 2 weeks.",
      upvotes: 8,
      isOfficial: true,
    },
    {
      id: "3",
      author: "Juan Cruz",
      timeAgo: "30 minutes ago",
      content:
        "Finally! This has been a problem for months. Thank you for reporting.",
      upvotes: 6,
    },
    {
      id: "4",
      author: "Anna Reyes",
      timeAgo: "25 minutes ago",
      content:
        "I reported this same issue last month but nothing happened. Hope this time gets more attention.",
      upvotes: 9,
    },
    {
      id: "5",
      author: "Carlos Miranda",
      timeAgo: "20 minutes ago",
      content:
        "The traffic jam this causes during rush hour is insane. Please prioritize this!",
      upvotes: 15,
    },
    {
      id: "6",
      author: "Quezon City Government",
      timeAgo: "15 minutes ago",
      content:
        "We are coordinating with DPWH for immediate action. Traffic rerouting will be implemented during repairs.",
      upvotes: 4,
      isOfficial: true,
    },
    {
      id: "7",
      author: "Mike Santos",
      timeAgo: "10 minutes ago",
      content:
        "Thank you for the coordination. Please keep us updated on the timeline.",
      upvotes: 3,
    },
    {
      id: "8",
      author: "Lisa Chen",
      timeAgo: "8 minutes ago",
      content:
        "I've seen at least 5 vehicles get damaged here this week. This is urgent!",
      upvotes: 7,
    },
    {
      id: "9",
      author: "Roberto Silva",
      timeAgo: "5 minutes ago",
      content:
        "Exact location is right after the pedestrian overpass. The biggest pothole is on the rightmost lane.",
      upvotes: 2,
    },
    {
      id: "10",
      author: "MMDA Official",
      timeAgo: "3 minutes ago",
      content:
        "Traffic management team has been notified. We will deploy personnel to assist during repair works.",
      upvotes: 6,
      isOfficial: true,
    },
  ],
};

export function ReportPost({
  postId,
  onBack,
}: ReportPostProps) {
  const [post] = useState(mockDetailedPost);
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const [userVote, setUserVote] = useState<
    "up" | "down" | null
  >(post.hasUserVoted);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [visibleCommentsCount, setVisibleCommentsCount] =
    useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      // Remove vote
      if (type === "up") {
        setUpvotes((prev) => prev - 1);
      } else {
        setDownvotes((prev) => prev - 1);
      }
      setUserVote(null);
    } else {
      // Change or add vote
      if (userVote === "up") {
        setUpvotes((prev) => prev - 1);
        setDownvotes((prev) => prev + 1);
      } else if (userVote === "down") {
        setDownvotes((prev) => prev - 1);
        setUpvotes((prev) => prev + 1);
      } else {
        if (type === "up") {
          setUpvotes((prev) => prev + 1);
        } else {
          setDownvotes((prev) => prev + 1);
        }
      }
      setUserVote(type);
    }
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        author: "Current User",
        timeAgo: "just now",
        content: newComment,
        upvotes: 0,
      };
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    }
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate API call delay
    setTimeout(() => {
      setVisibleCommentsCount((prev) =>
        Math.min(prev + 5, comments.length),
      );
      setIsLoadingMore(false);
    }, 800);
  };

  const visibleComments = comments.slice(
    0,
    visibleCommentsCount,
  );
  const hasMoreComments =
    visibleCommentsCount < comments.length;

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (
          target.isIntersecting &&
          hasMoreComments &&
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
  }, [hasMoreComments, isLoadingMore]);

  const getPriorityColor = () => {
    switch (post.priority) {
      case "high":
        return "bg-[#BF4226] text-white";
      case "medium":
        return "bg-[#F2C063] text-[#1A3E73]";
      case "low":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusColor = () => {
    switch (post.status) {
      case "pending":
        return "bg-gray-100 text-gray-600";
      case "in_review":
        return "bg-blue-100 text-[#1A3E73]";
      case "responded":
        return "bg-[#F2C063] text-[#1A3E73]";
      case "resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1A3E73] text-white p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-medium">
              Issue Details
            </h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Main Post Card */}
        <Card className="p-4">
          <div className="space-y-4">
            {/* Title and Priority */}
            <div className="flex justify-between items-start gap-2">
              <h2 className="text-lg font-medium text-[#1A3E73] leading-tight flex-1">
                {post.title}
              </h2>
              <div className="flex items-center gap-1">
                {post.priority === "high" && (
                  <AlertTriangle className="w-4 h-4 text-[#BF4226]" />
                )}
                <Badge
                  className={`text-xs px-2 py-1 ${getPriorityColor()}`}
                >
                  {post.priority.charAt(0).toUpperCase() +
                    post.priority.slice(1)}{" "}
                  Priority
                </Badge>
              </div>
            </div>

            {/* Status and Meta Info */}
            <div className="flex items-center gap-4 text-sm">
              <Badge className={`${getStatusColor()}`}>
                {post.status
                  .replace("_", " ")
                  .charAt(0)
                  .toUpperCase() +
                  post.status.replace("_", " ").slice(1)}
              </Badge>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{post.location}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{post.timeAgo}</span>
              </div>
            </div>

            {/* Category */}
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Category:</span>{" "}
              {post.category}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
              {post.description}
            </p>

            {/* Tagged Entities */}
            <div>
              <div className="text-sm font-medium text-[#1A3E73] mb-2">
                Tagged Agencies/Institutions:
              </div>
              <div className="flex flex-wrap gap-2">
                {post.taggedEntities.map((entity, index) => (
                  <Badge
                    key={index}
                    className="bg-[#1A3E73] text-white px-2 py-1 flex items-center gap-1"
                  >
                    <Building2 className="w-3 h-3" />
                    <span className="text-xs">{entity}</span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Images */}
            {post.images.length > 0 && (
              <div>
                <div className="text-sm font-medium text-[#1A3E73] mb-2">
                  Images:
                </div>
                <div className="grid gap-2">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Issue image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {post.documents.length > 0 && (
              <div>
                <div className="text-sm font-medium text-[#1A3E73] mb-2">
                  Documents:
                </div>
                <div className="space-y-2">
                  {post.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border"
                    >
                      <FileText className="w-4 h-4 text-[#1A3E73]" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">
                          {doc.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {doc.size}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Voting */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="text-sm text-muted-foreground">
                Help others by voting on this issue
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote("up")}
                  className={`p-2 h-9 w-9 ${
                    userVote === "up"
                      ? "bg-[#F2C063]/20 text-[#1A3E73]"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium text-[#1A3E73] min-w-[30px] text-center">
                  {upvotes - downvotes}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote("down")}
                  className={`p-2 h-9 w-9 ${
                    userVote === "down"
                      ? "bg-[#BF4226]/20 text-[#BF4226]"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Comments Section */}
        <Card className="p-4 mb-20">
          <div className="space-y-4 pb-8">
            <h3 className="font-medium text-[#1A3E73]">
              Comments ({comments.length})
            </h3>

            {/* Add Comment */}
            <div className="space-y-2">
              <Textarea
                placeholder="Add a comment to help resolve this issue..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="bg-[#1A3E73] hover:bg-[#1A3E73]/90 text-white"
                  size="sm"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-3">
              {visibleComments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-l-2 border-gray-200 pl-3"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-sm font-medium ${
                        comment.isOfficial
                          ? "text-[#1A3E73]"
                          : "text-gray-900"
                      }`}
                    >
                      {comment.author}
                    </span>
                    {comment.isOfficial && (
                      <Badge className="bg-[#F2C063] text-[#1A3E73] text-xs px-2 py-0">
                        Official
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {comment.timeAgo}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-6 text-xs text-gray-500 hover:bg-gray-100"
                    >
                      <ArrowUp className="w-3 h-3 mr-1" />
                      {comment.upvotes}
                    </Button>
                  </div>
                </div>
              ))}

              {/* Infinite Scroll Trigger & Load More Button */}
              {hasMoreComments && (
                <div className="pt-1 border-t">
                  {/* Invisible trigger for infinite scroll */}
                  <div
                    ref={loadMoreTriggerRef}
                    className="h-1 w-full"
                  />

                  {/* Loading indicator or Load More button */}
                  {isLoadingMore ? (
                    <div className="flex items-center justify-center gap-2 py-4 text-[#1A3E73]">
                      <div className="w-4 h-4 border-2 border-[#1A3E73] border-t-transparent rounded-full animate-spin"></div>
                      Loading more comments...
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={handleLoadMore}
                      className="w-full text-[#1A3E73] border-[#1A3E73] hover:bg-[#1A3E73]/5"
                    >
                      Load More Comments (
                      {comments.length - visibleCommentsCount}{" "}
                      remaining)
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}