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
const mockDetailedPosts = {
  "1": {
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
        author: "Juan Dela Cruz",
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
  },
  "2": {
    id: "2",
    title: "Incomplete sidewalk construction near schools",
    description:
      "Construction has been halted for 2 months, creating safety hazards for students and pedestrians. The incomplete sidewalk forces pedestrians to walk on the road, which is particularly dangerous during school hours when there's heavy foot traffic. Construction materials are left scattered, and there are no proper barriers or warning signs.",
    location: "Makati City",
    category: "Safety",
    priority: "high" as const,
    upvotes: 189,
    downvotes: 8,
    status: "responded" as const,
    timeAgo: "5 hours ago",
    taggedEntities: [
      "Makati City Government",
      "Department of Public Works and Highways (DPWH)",
      "Department of Education (DepEd)",
    ],
    hasUserVoted: "up" as const,
    images: [
      "https://images.unsplash.com/photo-1598104469673-048b8f2729ea?q=80&w=712&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    documents: [
      { name: "Safety_Assessment_Report.pdf", size: "1.2 MB" },
      { name: "Construction_Timeline.xlsx", size: "890 KB" },
    ],
    comments: [
      {
        id: "1",
        author: "Maria Santos",
        timeAgo: "3 hours ago",
        content:
          "My kids have to walk on the road every day to get to school. This is extremely dangerous!",
        upvotes: 24,
      },
      {
        id: "2",
        author: "Makati City Government",
        timeAgo: "2 hours ago",
        content:
          "We acknowledge this safety concern. The contractor has been contacted and work will resume next Monday with proper safety measures in place.",
        upvotes: 18,
        isOfficial: true,
      },
      {
        id: "3",
        author: "Pedro Gonzales",
        timeAgo: "1 hour ago",
        content:
          "Thank you for the quick response! Please ensure proper barriers are installed.",
        upvotes: 12,
      },
      {
        id: "4",
        author: "Parent Teacher Association",
        timeAgo: "45 minutes ago",
        content:
          "We've been raising this concern for weeks. Glad to see action being taken.",
        upvotes: 15,
        isOfficial: true,
      },
      {
        id: "5",
        author: "Safety Officer Rodriguez",
        timeAgo: "30 minutes ago",
        content:
          "Temporary walkways and proper signage will be installed by tomorrow morning.",
        upvotes: 8,
        isOfficial: true,
      },
    ],
  },
  "3": {
    id: "3",
    title: "Water supply interruption in Subdivision",
    description:
      "No water supply for 3 days. Manila Water has not provided clear timeline for restoration. The entire subdivision of 200+ households has been without water supply since Tuesday. No advance notice was given, and the customer service hotline only provides automated responses. Some residents are buying water from delivery services, which is expensive.",
    location: "Marikina City",
    category: "Utilities",
    priority: "medium" as const,
    upvotes: 325,
    downvotes: 23,
    status: "pending" as const,
    timeAgo: "1 day ago",
    taggedEntities: [
      "Manila Water Company",
      "Marikina City Government",
      "Metropolitan Waterworks and Sewerage System (MWSS)",
    ],
    hasUserVoted: null as const,
    images: [
      "https://plus.unsplash.com/premium_photo-1734029815125-58149f75742e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    documents: [
      { name: "Water_Interruption_Notice.pdf", size: "650 KB" },
      { name: "Subdivision_Map.pdf", size: "1.1 MB" },
    ],
    comments: [
      {
        id: "1",
        author: "Rosa Martinez",
        timeAgo: "18 hours ago",
        content:
          "This is affecting our daily routine. We have elderly residents who need water for medication.",
        upvotes: 22,
      },
      {
        id: "2",
        author: "Homeowners Association President",
        timeAgo: "15 hours ago",
        content:
          "We've contacted Manila Water multiple times but only get automated responses. This is unacceptable.",
        upvotes: 28,
        isOfficial: true,
      },
      {
        id: "3",
        author: "James Lim",
        timeAgo: "12 hours ago",
        content:
          "Had to buy 20 gallons of water yesterday. This is getting expensive for families.",
        upvotes: 16,
      },
      {
        id: "4",
        author: "Local Councilor",
        timeAgo: "8 hours ago",
        content:
          "I have escalated this to Manila Water management. Will update once I receive information.",
        upvotes: 19,
        isOfficial: true,
      },
      {
        id: "5",
        author: "Emergency Response Team",
        timeAgo: "4 hours ago",
        content:
          "Water tanker will be deployed to the subdivision entrance at 2 PM today for emergency supply.",
        upvotes: 25,
        isOfficial: true,
      },
    ],
  },
  "4": {
    id: "4",
    title: "Missing streetlights causing security concerns",
    description:
      "Several streetlights have been broken for months, making the area unsafe at night. The affected area spans 3 blocks and includes a main thoroughfare used by students and workers. There have been 2 reported incidents of theft in the past month, which residents attribute to poor lighting. The area becomes completely dark after sunset.",
    location: "Pasig City",
    category: "Safety",
    priority: "medium" as const,
    upvotes: 478,
    downvotes: 2,
    status: "resolved" as const,
    timeAgo: "3 days ago",
    taggedEntities: [
      "Pasig City Government",
      "Meralco (Manila Electric Company)",
      "Philippine National Police (PNP)",
    ],
    hasUserVoted: null as const,
    images: [
      "https://images.unsplash.com/photo-1719036723449-37680727c0e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9rZW4lMjBzdHJlZXRsaWdodCUyMG5pZ2h0JTIwZGFya3xlbnwxfHx8fDE3NTc5NDM2MzB8MA",
    ],
    documents: [
      { name: "Streetlight_Locations.pdf", size: "800 KB" },
      { name: "Crime_Incident_Report.pdf", size: "1.5 MB" },
    ],
    comments: [
      {
        id: "1",
        author: "Security Guard",
        timeAgo: "2 days ago",
        content:
          "I patrol this area and it's been very dark. Residents are afraid to walk here at night.",
        upvotes: 15,
      },
      {
        id: "2",
        author: "Pasig City Government",
        timeAgo: "2 days ago",
        content:
          "Thank you for the report. Our public works team will inspect and replace the broken streetlights within 48 hours.",
        upvotes: 22,
        isOfficial: true,
      },
      {
        id: "3",
        author: "Local Resident",
        timeAgo: "1 day ago",
        content:
          "Saw the repair crew yesterday evening. They were working on the lights!",
        upvotes: 18,
      },
      {
        id: "4",
        author: "Barangay Captain",
        timeAgo: "1 day ago",
        content:
          "All streetlights have been repaired and tested. The area is now properly lit. Thank you for reporting this issue.",
        upvotes: 31,
        isOfficial: true,
      },
      {
        id: "5",
        author: "Community Watch",
        timeAgo: "6 hours ago",
        content:
          "Confirmed - all lights are working now. The area feels much safer. Great job to the city government!",
        upvotes: 24,
        isOfficial: true,
      },
    ],
  },
  "5": {
    id: "5",
    title: "Illegal dumping in vacant lot near residential area",
    description:
      "Large amounts of construction debris and household waste being dumped daily. Creating health hazards and attracting pests. The vacant lot has become a makeshift dumpsite with broken concrete blocks, old appliances, plastic bags, and rotting organic waste. Residents are concerned about potential disease outbreak and the smell is unbearable especially during hot weather.",
    location: "Taguig City",
    category: "Environment",
    priority: "high" as const,
    upvotes: 142,
    downvotes: 3,
    status: "pending" as const,
    timeAgo: "6 hours ago",
    taggedEntities: [
      "Taguig City Government",
      "Department of Environment and Natural Resources (DENR)",
      "Taguig Environmental Management Office",
    ],
    hasUserVoted: "up" as const,
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1470&auto=format&fit=crop",
    ],
    documents: [
      { name: "Dumping_Site_Photos.pdf", size: "3.2 MB" },
      { name: "Health_Risk_Assessment.docx", size: "1.5 MB" },
    ],
    comments: [
      {
        id: "1",
        author: "Concerned Resident",
        timeAgo: "4 hours ago",
        content:
          "This has been going on for weeks! My kids can't play outside because of the smell and flies.",
        upvotes: 18,
      },
      {
        id: "2",
        author: "Barangay Health Worker",
        timeAgo: "3 hours ago",
        content:
          "We've documented several cases of respiratory issues in the area. This needs immediate attention.",
        upvotes: 22,
        isOfficial: true,
      },
      {
        id: "3",
        author: "Environmental Activist",
        timeAgo: "2 hours ago",
        content:
          "I've seen trucks dumping here at night. We need surveillance cameras and proper enforcement.",
        upvotes: 16,
      },
    ],
  },
  "6": {
    id: "6",
    title: "Public school lacks proper ventilation and maintenance",
    description:
      "Classrooms are overcrowded with broken windows and non-functional electric fans. Students are suffering in hot weather. The school has 45-50 students per classroom with only 2-3 working fans. Several windows have been broken for months, and the ceiling has water stains indicating leaks during rainy season.",
    location: "Manila City",
    category: "Education",
    priority: "medium" as const,
    upvotes: 87,
    downvotes: 1,
    status: "in_review" as const,
    timeAgo: "8 hours ago",
    taggedEntities: [
      "Department of Education (DepEd)",
      "Manila City Government",
      "Department of Public Works and Highways (DPWH)",
    ],
    hasUserVoted: null as const,
    images: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    documents: [
      { name: "Classroom_Conditions_Report.pdf", size: "2.1 MB" },
      { name: "Student_Health_Survey.xlsx", size: "750 KB" },
    ],
    comments: [
      {
        id: "1",
        author: "Parent",
        timeAgo: "6 hours ago",
        content:
          "My daughter comes home with headaches every day. The classroom is so hot and stuffy.",
        upvotes: 14,
      },
      {
        id: "2",
        author: "School Principal",
        timeAgo: "4 hours ago",
        content:
          "We have submitted repair requests to DepEd but are still waiting for budget approval.",
        upvotes: 11,
        isOfficial: true,
      },
      {
        id: "3",
        author: "Teacher",
        timeAgo: "2 hours ago",
        content:
          "It's hard to teach when students are uncomfortable. We need immediate solutions.",
        upvotes: 19,
      },
    ],
  },
  "7": {
    id: "7",
    title: "Frequent power outages during peak hours",
    description:
      "Daily brownouts lasting 2-3 hours affecting businesses and residents. No advance notice from Meralco. The outages typically occur between 2-5 PM when electricity demand is highest. Small businesses are losing revenue, and residents with medical equipment are at risk. The power interruptions have been happening for 2 weeks straight.",
    location: "Muntinlupa City",
    category: "Utilities",
    priority: "high" as const,
    upvotes: 203,
    downvotes: 7,
    status: "responded" as const,
    timeAgo: "12 hours ago",
    taggedEntities: [
      "Meralco (Manila Electric Company)",
      "Department of Energy (DOE)",
      "Muntinlupa City Government",
    ],
    hasUserVoted: "up" as const,
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    documents: [
      { name: "Power_Outage_Log.xlsx", size: "890 KB" },
      { name: "Business_Impact_Assessment.pdf", size: "1.8 MB" },
    ],
    comments: [
      {
        id: "1",
        author: "Small Business Owner",
        timeAgo: "10 hours ago",
        content:
          "My restaurant loses customers every day because of these outages. I'm losing thousands in revenue.",
        upvotes: 34,
      },
      {
        id: "2",
        author: "Meralco Customer Service",
        timeAgo: "8 hours ago",
        content:
          "We are conducting emergency repairs on the distribution lines. Service should normalize by tomorrow.",
        upvotes: 15,
        isOfficial: true,
      },
      {
        id: "3",
        author: "Senior Citizen",
        timeAgo: "6 hours ago",
        content:
          "My oxygen concentrator needs electricity. These outages are life-threatening for patients like me.",
        upvotes: 42,
      },
    ],
  },
  "8": {
    id: "8",
    title: "Healthcare center understaffed and lacks medicine",
    description:
      "Only 1 doctor for entire barangay of 5000+ residents. Basic medicines out of stock for weeks. The health center operates with just one doctor and two nurses for the entire community. Essential medicines like paracetamol, antibiotics, and hypertension medication have been out of stock. Patients have to go to private clinics or travel far for treatment.",
    location: "Caloocan City",
    category: "Healthcare",
    priority: "high" as const,
    upvotes: 178,
    downvotes: 2,
    status: "pending" as const,
    timeAgo: "1 day ago",
    taggedEntities: [
      "Department of Health (DOH)",
      "Caloocan City Government",
      "Philippine Health Insurance Corporation (PhilHealth)",
    ],
    hasUserVoted: null as const,
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    documents: [
      { name: "Medicine_Inventory_Report.pdf", size: "1.3 MB" },
      { name: "Patient_Statistics.xlsx", size: "950 KB" },
    ],
    comments: [
      {
        id: "1",
        author: "Community Health Worker",
        timeAgo: "20 hours ago",
        content:
          "We have to turn away patients daily because we can't provide proper care with limited staff and no medicines.",
        upvotes: 28,
        isOfficial: true,
      },
      {
        id: "2",
        author: "Patient",
        timeAgo: "18 hours ago",
        content:
          "I've been waiting 3 hours just to see the doctor. My prescription can't be filled here either.",
        upvotes: 25,
      },
      {
        id: "3",
        author: "Diabetic Patient",
        timeAgo: "12 hours ago",
        content:
          "No insulin available for 2 weeks. I have to buy from expensive private pharmacy.",
        upvotes: 33,
      },
    ],
  },
  "9": {
    id: "9",
    title: "Blocked drainage causing frequent flooding",
    description:
      "Main drainage system clogged with debris. Even light rain causes street flooding affecting 50+ houses. The drainage canal is completely blocked with plastic waste, fallen branches, and sediment. During recent rains, water reached knee-deep levels, damaging household appliances and forcing families to evacuate temporarily.",
    location: "Valenzuela City",
    category: "Infrastructure",
    priority: "high" as const,
    upvotes: 167,
    downvotes: 5,
    status: "in_review" as const,
    timeAgo: "18 hours ago",
    taggedEntities: [
      "Department of Public Works and Highways (DPWH)",
      "Valenzuela City Government",
      "Metro Manila Development Authority (MMDA)",
    ],
    hasUserVoted: "up" as const,
    images: [
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1470&auto=format&fit=crop",
    ],
    documents: [
      { name: "Flood_Damage_Assessment.pdf", size: "2.8 MB" },
      { name: "Drainage_Survey.docx", size: "1.4 MB" },
    ],
    comments: [
      {
        id: "1",
        author: "Flood Victim",
        timeAgo: "15 hours ago",
        content:
          "Lost my refrigerator and washing machine last week. This flooding is getting worse every month.",
        upvotes: 31,
      },
      {
        id: "2",
        author: "Valenzuela DPWH",
        timeAgo: "12 hours ago",
        content:
          "Drainage clearing operations will begin next week. We've allocated budget for comprehensive canal rehabilitation.",
        upvotes: 18,
        isOfficial: true,
      },
      {
        id: "3",
        author: "Neighborhood Captain",
        timeAgo: "8 hours ago",
        content:
          "We've organized community cleanup drives but need heavy equipment for the main blockage.",
        upvotes: 22,
        isOfficial: true,
      },
    ],
  },
  "10": {
    id: "10",
    title: "Air pollution from nearby factory affecting neighborhood",
    description:
      "Chemical plant releasing toxic fumes daily. Residents experiencing respiratory problems and bad odor. The factory operates 24/7 releasing thick smoke and chemical smell that makes it difficult to breathe. Several residents have developed coughs and skin irritation. Children and elderly are particularly affected.",
    location: "Navotas City",
    category: "Environment",
    priority: "high" as const,
    upvotes: 134,
    downvotes: 8,
    status: "pending" as const,
    timeAgo: "2 days ago",
    taggedEntities: [
      "Department of Environment and Natural Resources (DENR)",
      "Navotas City Government",
      "Department of Health (DOH)",
    ],
    hasUserVoted: null as const,
    images: [
      "https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    documents: [
      { name: "Air_Quality_Test_Results.pdf", size: "1.7 MB" },
      { name: "Health_Survey_Report.pdf", size: "2.2 MB" },
    ],
    comments: [
      {
        id: "1",
        author: "Resident with Asthma",
        timeAgo: "1 day ago",
        content:
          "I can't open my windows anymore. My asthma attacks have become more frequent since this started.",
        upvotes: 26,
      },
      {
        id: "2",
        author: "Environmental Health Officer",
        timeAgo: "20 hours ago",
        content:
          "We are conducting air quality monitoring and will coordinate with DENR for inspection of the facility.",
        upvotes: 19,
        isOfficial: true,
      },
    ],
  },
  "11": {
    id: "11",
    title: "Traffic signal malfunction at major intersection",
    description:
      "Traffic lights have been blinking yellow for 5 days. Creating dangerous conditions and traffic jams during rush hour. The intersection handles thousands of vehicles daily including buses and trucks. Without proper traffic signals, near-miss accidents occur frequently and traffic enforcement officers have to manually direct traffic.",
    location: "Parañaque City",
    category: "Infrastructure",
    priority: "medium" as const,
    upvotes: 76,
    downvotes: 3,
    status: "responded" as const,
    timeAgo: "4 hours ago",
    taggedEntities: [
      "Metro Manila Development Authority (MMDA)",
      "Parañaque City Government",
      "Department of Public Works and Highways (DPWH)",
    ],
    hasUserVoted: null as const,
    images: [
      "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    documents: [
      { name: "Traffic_Count_Analysis.xlsx", size: "680 KB" },
    ],
    comments: [
      {
        id: "1",
        author: "Daily Commuter",
        timeAgo: "3 hours ago",
        content:
          "Almost got into an accident yesterday. Drivers don't know who has the right of way.",
        upvotes: 12,
      },
      {
        id: "2",
        author: "MMDA Traffic Enforcer",
        timeAgo: "2 hours ago",
        content:
          "Repair crew has been dispatched. Temporary traffic management will continue until signals are restored.",
        upvotes: 8,
        isOfficial: true,
      },
    ],
  },
  "12": {
    id: "12",
    title: "Playground equipment broken and unsafe for children",
    description:
      "Swings have broken chains, slides have sharp edges. Multiple children have been injured but no repairs done. The playground equipment is over 10 years old with visible rust and structural damage. Parents are afraid to let their children play, but it's the only recreational area in the neighborhood.",
    location: "Las Piñas City",
    category: "Safety",
    priority: "medium" as const,
    upvotes: 92,
    downvotes: 1,
    status: "resolved" as const,
    timeAgo: "5 days ago",
    taggedEntities: [
      "Las Piñas City Government",
      "Department of Social Welfare and Development (DSWD)",
      "Las Piñas Parks and Recreation",
    ],
    hasUserVoted: "up" as const,
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    documents: [
      { name: "Safety_Inspection_Report.pdf", size: "1.1 MB" },
    ],
    comments: [
      {
        id: "1",
        author: "Concerned Parent",
        timeAgo: "4 days ago",
        content:
          "My 5-year-old got a cut from the rusty slide. This equipment should be condemned.",
        upvotes: 15,
      },
      {
        id: "2",
        author: "Las Piñas Parks Department",
        timeAgo: "3 days ago",
        content:
          "New playground equipment has been ordered and installation will begin this week.",
        upvotes: 20,
        isOfficial: true,
      },
      {
        id: "3",
        author: "Barangay Captain",
        timeAgo: "1 day ago",
        content:
          "New playground is now complete and safe for children. Thank you for reporting this issue.",
        upvotes: 25,
        isOfficial: true,
      },
    ],
  },
  "13": {
    id: "13",
    title: "Internet connectivity issues in public WiFi zones",
    description:
      "Free WiFi in parks and plazas constantly disconnecting. Students can't access online classes. The public WiFi service frequently drops connection and has very slow speeds. Students who rely on free internet for online learning are unable to attend classes or submit assignments.",
    location: "Malabon City",
    category: "Utilities",
    priority: "low" as const,
    upvotes: 45,
    downvotes: 12,
    status: "pending" as const,
    timeAgo: "3 days ago",
    taggedEntities: [
      "Malabon City Government",
      "Department of Information and Communications Technology (DICT)",
    ],
    hasUserVoted: null as const,
    images: [
      "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    documents: [
      { name: "WiFi_Performance_Test.pdf", size: "540 KB" },
    ],
    comments: [
      {
        id: "1",
        author: "College Student",
        timeAgo: "2 days ago",
        content:
          "I missed my online exam because the WiFi kept disconnecting. This is affecting my grades.",
        upvotes: 8,
      },
      {
        id: "2",
        author: "High School Student",
        timeAgo: "1 day ago",
        content:
          "Can't download learning modules. The connection is too slow and unreliable.",
        upvotes: 6,
      },
    ],
  },
  "14": {
    id: "14",
    title: "Stray dogs forming packs and threatening residents",
    description:
      "Groups of 8-10 aggressive stray dogs roaming the neighborhood. Several residents have been chased and bitten. The pack has become territorial and aggressive, especially during feeding times. Children and elderly residents are afraid to walk alone. There have been 3 reported bite incidents in the past month.",
    location: "San Juan City",
    category: "Safety",
    priority: "high" as const,
    upvotes: 156,
    downvotes: 23,
    status: "in_review" as const,
    timeAgo: "1 day ago",
    taggedEntities: [
      "San Juan City Government",
      "Department of Health (DOH)",
      "Philippine Animal Welfare Society (PAWS)",
    ],
    hasUserVoted: "up" as const,
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    documents: [
      { name: "Animal_Bite_Incidents.pdf", size: "920 KB" },
      { name: "Stray_Dog_Population_Survey.xlsx", size: "780 KB" },
    ],
    comments: [
      {
        id: "1",
        author: "Bite Victim",
        timeAgo: "20 hours ago",
        content:
          "Got bitten while jogging yesterday. Had to get anti-rabies shots. These dogs are dangerous.",
        upvotes: 24,
      },
      {
        id: "2",
        author: "San Juan Animal Control",
        timeAgo: "15 hours ago",
        content:
          "We will conduct capture operations this week. Rescued dogs will be brought to shelter for neutering and vaccination.",
        upvotes: 18,
        isOfficial: true,
      },
      {
        id: "3",
        author: "Animal Rights Advocate",
        timeAgo: "10 hours ago",
        content:
          "Please use humane methods. These animals need proper care and rehabilitation, not elimination.",
        upvotes: 12,
      },
    ],
  },
  "15": {
    id: "15",
    title: "Noise pollution from construction site during night hours",
    description:
      "Heavy machinery operating from 10PM to 6AM violating city ordinances. Affecting sleep of nearby residents. The construction company operates jackhammers, concrete mixers, and heavy trucks throughout the night. Despite multiple complaints, the noise continues, causing sleep deprivation and stress among residents.",
    location: "Mandaluyong City",
    category: "Environment",
    priority: "medium" as const,
    upvotes: 68,
    downvotes: 15,
    status: "responded" as const,
    timeAgo: "6 days ago",
    taggedEntities: [
      "Mandaluyong City Government",
      "Department of Environment and Natural Resources (DENR)",
      "Department of Labor and Employment (DOLE)",
    ],
    hasUserVoted: null as const,
    images: [
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    documents: [
      { name: "Noise_Level_Measurements.pdf", size: "1.2 MB" },
      { name: "City_Ordinance_Violation.pdf", size: "850 KB" },
    ],
    comments: [
      {
        id: "1",
        author: "Sleep-Deprived Resident",
        timeAgo: "5 days ago",
        content:
          "Haven't had a good night's sleep in weeks. My baby keeps waking up from the noise.",
        upvotes: 16,
      },
      {
        id: "2",
        author: "Mandaluyong Building Office",
        timeAgo: "4 days ago",
        content:
          "We have issued a violation notice to the contractor. Night operations must cease immediately or face permit suspension.",
        upvotes: 22,
        isOfficial: true,
      },
      {
        id: "3",
        author: "Construction Supervisor",
        timeAgo: "3 days ago",
        content:
          "We apologize for the inconvenience. Night work has been suspended and will only resume during permitted hours.",
        upvotes: 14,
        isOfficial: true,
      },
    ],
  },
};

export function ReportPost({
  postId,
  onBack,
}: ReportPostProps) {
  const [post] = useState(mockDetailedPosts[postId as keyof typeof mockDetailedPosts] || mockDetailedPosts["1"]);
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