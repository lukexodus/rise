import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation";
import { Header } from "./Header";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Reset scroll position when route changes
  useEffect(() => {
    // Reset scroll for mobile layout
    window.scrollTo(0, 0);
    
    // Reset scroll for desktop layout main content area
    const desktopScrollContainer = document.querySelector('.desktop-main-content');
    if (desktopScrollContainer) {
      desktopScrollContainer.scrollTop = 0;
    }
  }, [location.pathname]);

  // Check if current route should show header (only on home route)
  const showHeader = location.pathname === '/';

  // Check if current route should show bottom navigation
  const showBottomNav = !location.pathname.startsWith('/project/') && 
                       !location.pathname.startsWith('/list/') &&
                       !location.pathname.startsWith('/community/post/') &&
                       !location.pathname.startsWith('/notifications') &&
                       !location.pathname.startsWith('/profile');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="mx-auto bg-gray-50 min-h-screen relative">
          {/* Header - only show on home page */}
          {showHeader && (
            <Header
              onNotificationsClick={() => navigate('/notifications')}
              onProfileClick={() => navigate('/profile')}
            />
          )}
          
          {/* Main Content */}
          <div className={showBottomNav ? "pb-20" : ""}>
            <Outlet />
          </div>
          
          {/* Bottom Navigation - hide on certain pages */}
          {showBottomNav && <BottomNavigation />}
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden lg:block">
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                {/* RISE Logo */}
                <div className="w-10 h-10 rounded-full bg-white border-2 border-[#1A3E73] flex items-center justify-center overflow-hidden">
                  <img 
                    src="/src/assets/rise.png" 
                    alt="RISE Logo" 
                    className="w-[2.45rem] h-[2.45rem] object-cover" 
                  />
                </div>
                
                {/* Tagline */}
                <div>
                  <p className="text-xs text-[#1A3E73] font-body font-light italic leading-tight">
                    Every Peso. Every Voice.<br/>
                    Accounted For.
                  </p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {[
                  {
                    id: "home",
                    label: "Dashboard",
                    icon: "🏠",
                    path: "/"
                  },
                  {
                    id: "search",
                    label: "Search",
                    icon: "🔍",
                    path: "/search"
                  },
                  {
                    id: "map",
                    label: "Map",
                    icon: "🗺️",
                    path: "/map"
                  },
                  {
                    id: "community",
                    label: "Community",
                    icon: "👥",
                    path: "/community"
                  },
                  {
                    id: "analytics",
                    label: "Analytics",
                    icon: "📊",
                    path: "/analytics"
                  },
                ].map((item) => {
                  const isActive = location.pathname === item.path || 
                                 (item.id === 'home' && location.pathname === '/') ||
                                 (item.id !== 'home' && location.pathname.startsWith(item.path) && item.path !== '/');
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        isActive
                          ? "bg-[#1A3E73] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-heading font-medium">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className="p-4 border-t border-gray-200">
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/notifications')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg">🔔</span>
                  <span className="font-heading font-medium">
                    Notifications
                  </span>
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg">👤</span>
                  <span className="font-heading font-medium">Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto bg-gray-50 pb-8 desktop-main-content">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}