import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import mockDetailedPostsData from "../data/mockDetailedPosts.json";
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

export function ReportPost() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  
  const [post] = useState(mockDetailedPostsData[postId as keyof typeof mockDetailedPostsData] || mockDetailedPostsData["1"]);
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(post.hasUserVoted);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  // Handle back navigation
  const handleBack = () => {
    navigate('/community');
    // Restore scroll position after navigation
    setTimeout(() => {
      const savedPosition = localStorage.getItem('communityScrollPosition');
      if (savedPosition) {
        const position = parseInt(savedPosition);
        if (window.innerWidth < 1024) {
          window.scrollTo({ top: position, behavior: "smooth" });
        } else {
          const mainContent = document.querySelector('.overflow-y-auto');
          if (mainContent) {
            mainContent.scrollTo({ top: position, behavior: "smooth" });
          }
        }
      }
    }, 100);
  };

  // Scroll to top when component mounts or postId changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [postId]);

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
            onClick={handleBack}
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

      <div className="p-4 space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 max-w-7xl mx-auto">
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

            {/* Sector */}
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Sector:</span>{" "}
              {post.sector}
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