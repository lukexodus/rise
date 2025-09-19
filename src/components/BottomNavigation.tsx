import { Home, Map, Search, MessageSquare, BarChart3 } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "map", label: "Map", icon: Map },
    { id: "search", label: "Search", icon: Search },
    { id: "community", label: "Community", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2">
      <div className="flex justify-around items-center">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors ${
              activeTab === id
                ? "text-[#1A3E73] bg-[#F2C063]/20"
                : "text-gray-500"
            }`}
          >
            <Icon 
              size={20} 
              className={`mb-1 ${
                activeTab === id ? "text-[#1A3E73]" : "text-gray-500"
              }`} 
            />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}