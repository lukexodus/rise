import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowUp, ArrowDown, MapPin, Clock, AlertTriangle, Eye, MessageCircle, CheckCircle, Hourglass, Construction, Shield, Zap, TreePine, Cross, GraduationCap, Car, Users, Wifi, Briefcase, Home, Utensils, Gavel, Globe, Coins } from "lucide-react";
import { useState } from "react";
import sectorsData from "../data/sectors.json";
import statusesData from "../data/statuses.json";

interface PostData {
  id: string;
  title: string;
  description: string;
  location: string;
  sector: string;
  priority: "low" | "medium" | "high";
  upvotes: number;
  downvotes: number;
  status: "pending" | "in_review" | "responded" | "resolved";
  timeAgo: string;
  department?: string;
  hasUserVoted?: "up" | "down" | null;
  imageUrl?: string;
}

interface CommunityPostProps {
  post: PostData;
  onPostClick?: (postId: string) => void;
}

export function CommunityPost({ post, onPostClick }: CommunityPostProps) {
  const {
    id,
    title,
    description,
    location,
    priority,
    upvotes: initialUpvotes,
    downvotes: initialDownvotes,
    status,
    timeAgo,
    hasUserVoted = null,
    imageUrl
  } = post;
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(hasUserVoted);

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      // Remove vote
      if (type === "up") {
        setUpvotes(prev => prev - 1);
      } else {
        setDownvotes(prev => prev - 1);
      }
      setUserVote(null);
    } else {
      // Change or add vote
      if (userVote === "up") {
        setUpvotes(prev => prev - 1);
        setDownvotes(prev => prev + 1);
      } else if (userVote === "down") {
        setDownvotes(prev => prev - 1);
        setUpvotes(prev => prev + 1);
      } else {
        if (type === "up") {
          setUpvotes(prev => prev + 1);
        } else {
          setDownvotes(prev => prev + 1);
        }
      }
      setUserVote(type);
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
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
    switch (status) {
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

  const getSectorIcon = (sectorName: string) => {
    const sector = sectorsData.sectors.find(s => s.name.toLowerCase() === sectorName.toLowerCase());
    const iconName = sector?.icon;
    
    switch (iconName) {
      case 'Construction': return <Construction className="w-3 h-3" />;
      case 'Shield': return <Shield className="w-3 h-3" />;
      case 'Zap': return <Zap className="w-3 h-3" />;
      case 'TreePine': return <TreePine className="w-3 h-3" />;
      case 'Cross': return <Cross className="w-3 h-3" />;
      case 'GraduationCap': return <GraduationCap className="w-3 h-3" />;
      case 'Car': return <Car className="w-3 h-3" />;
      case 'Users': return <Users className="w-3 h-3" />;
      case 'Wifi': return <Wifi className="w-3 h-3" />;
      case 'Briefcase': return <Briefcase className="w-3 h-3" />;
      case 'Home': return <Home className="w-3 h-3" />;
      case 'Utensils': return <Utensils className="w-3 h-3" />;
      case 'Gavel': return <Gavel className="w-3 h-3" />;
      case 'Globe': return <Globe className="w-3 h-3" />;
      case 'Coins': return <Coins className="w-3 h-3" />;
      default: return <Users className="w-3 h-3" />;
    }
  };

  const getStatusIcon = () => {
    const statusData = statusesData.statuses.find(s => s.id === status);
    const iconName = statusData?.icon;
    
    switch (iconName) {
      case 'Hourglass': return <Hourglass className="w-3 h-3" />;
      case 'Eye': return <Eye className="w-3 h-3" />;
      case 'MessageCircle': return <MessageCircle className="w-3 h-3" />;
      case 'CheckCircle': return <CheckCircle className="w-3 h-3" />;
      case 'Clock': return <Clock className="w-3 h-3" />;
      case 'AlertTriangle': return <AlertTriangle className="w-3 h-3" />;
      default: return <Hourglass className="w-3 h-3" />;
    }
  };

  const handlePostClick = () => {
    if (onPostClick) {
      onPostClick(id);
    }
  };

  return (
    <Card className="p-4 border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={handlePostClick}>
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-medium text-[#1A3E73] leading-tight flex-1">
            {title}
          </h3>
          <div className="flex gap-1">
            <Badge className={`text-xs px-2 py-1 ${getPriorityColor()}`}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>

        {imageUrl && (
          <div className="mt-3">
            <img 
              src={imageUrl}
              className="w-full h-48 object-cover rounded-lg border border-gray-200"
            />
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            {getSectorIcon(post.sector)}
            <span>{post.sector}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{timeAgo}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={`text-xs px-2 py-1 flex items-center gap-1 ${getStatusColor()}`}>
              {getStatusIcon()}
              {status.replace("_", " ").charAt(0).toUpperCase() + status.replace("_", " ").slice(1)}
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleVote("up");
              }}
              className={`p-1 h-8 w-8 ${
                userVote === "up" 
                  ? "bg-[#F2C063]/20 text-[#1A3E73]" 
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-[#1A3E73] min-w-[20px] text-center">
              {upvotes - downvotes}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleVote("down");
              }}
              className={`p-1 h-8 w-8 ${
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
  );
}