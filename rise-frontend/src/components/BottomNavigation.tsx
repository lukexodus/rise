import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Search, Map, Users, BarChart3 } from "lucide-react";

export function BottomNavigation() {
  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      path: "/"
    },
    {
      id: "search", 
      label: "Search",
      icon: Search,
      path: "/search"
    },
    {
      id: "map",
      label: "Map", 
      icon: Map,
      path: "/map"
    },
    {
      id: "community",
      label: "Community",
      icon: Users,
      path: "/community"
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      path: "/analytics"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2 px-1 text-xs transition-colors ${
                  isActive
                    ? "text-[#1A3E73] bg-[#1A3E73]/5"
                    : "text-gray-600 hover:text-[#1A3E73] hover:bg-gray-50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <IconComponent className={`w-5 h-5 mb-1 ${isActive ? "text-[#1A3E73]" : ""}`} />
                  <span className={`font-medium ${isActive ? "text-[#1A3E73]" : ""}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}