import {
  Construction,
  Shield,
  Zap,
  TreePine,
  Cross,
  GraduationCap,
  Car,
  Users,
  Wifi,
  Briefcase,
  Home,
  Utensils,
  Gavel,
  Globe,
  Coins,
  Hourglass,
  Eye,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertTriangle,
  Building
} from "lucide-react";

const iconMap = {
  Construction,
  Shield,
  Zap,
  TreePine,
  Cross,
  GraduationCap,
  Car,
  Users,
  Wifi,
  Briefcase,
  Home,
  Utensils,
  Gavel,
  Globe,
  Coins,
  Hourglass,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Building
};

export const getIcon = (iconName: string, className: string = "w-4 h-4") => {
  const IconComponent = iconMap[iconName as keyof typeof iconMap];
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in iconMap`);
    return null;
  }
  return <IconComponent className={className} />;
};

export const getSectorIcon = (sectorName: string, className: string = "w-3 h-3") => {
  const iconName = getSectorIconName(sectorName);
  return getIcon(iconName, className);
};

export const getStatusIcon = (statusName: string, className: string = "w-3 h-3") => {
  return getIcon(getStatusIconName(statusName), className);
};

const getSectorIconName = (sectorName: string): string => {
  const iconMap: Record<string, string> = {
    "Infrastructure": "Construction",
    "Safety & Security": "Shield",
    "Utilities": "Zap",
    "Environment": "TreePine",
    "Healthcare": "Cross",
    "Education": "GraduationCap",
    "Transportation": "Car",
    "Public Services": "Users",
    "Technology & Digital Services": "Wifi",
    "Economic Development": "Briefcase",
    "Social Services": "Users",
    "Housing & Urban Planning": "Home",
    "Food Safety & Agriculture": "Utensils",
    "Legal & Justice": "Gavel",
    "Emergency Services": "Shield",
    "Tourism & Culture": "Globe",
    "Finance & Budget": "Coins",
    "Interior & Local Government": "Building"
  };
  return iconMap[sectorName] || "Users";
};

const getStatusIconName = (statusName: string): string => {
  const iconMap: Record<string, string> = {
    "Pending": "Hourglass",
    "In Review": "Eye",
    "Responded": "MessageCircle",
    "Resolved": "CheckCircle",
    "Ongoing": "Clock",
    "Completed": "CheckCircle",
    "Delayed": "AlertTriangle"
  };
  return iconMap[statusName] || "Clock";
};