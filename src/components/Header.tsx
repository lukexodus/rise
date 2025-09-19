import { useState } from "react";
import { Bell, User, Settings, LogOut, Edit } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";


interface HeaderProps {
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
}

export function Header({ onNotificationsClick, onProfileClick }: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="bg-[#1A3E73] text-white px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo and App Name */}
        <div className="flex items-center gap-3">
          {/* Philippine Flag Circle Logo */}
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-8 h-8">
              {/* Philippine Flag - Simplified circular version */}
              <circle cx="50" cy="50" r="48" fill="#0038A8" stroke="#CE1126" strokeWidth="2"/>
              <path d="M50 2 L98 35 L98 65 L50 98 L2 65 L2 35 Z" fill="#FECA57"/>
              <polygon points="2,35 50,2 50,50 2,50" fill="#0038A8"/>
              <polygon points="50,50 98,35 98,50 50,50" fill="#CE1126"/>
              <circle cx="20" cy="25" r="4" fill="#FECA57"/>
              <polygon points="15,20 20,15 25,20 23,26 17,26" fill="#FECA57"/>
              <polygon points="30,25 35,20 40,25 38,31 32,31" fill="#FECA57"/>
              <polygon points="25,35 30,30 35,35 33,41 27,41" fill="#FECA57"/>
            </svg>
          </div>
          
          {/* App Name */}
          <div>
            <h1 className="text-lg font-semibold">BantayBayan</h1>
            <p className="text-xs text-blue-100">Transparency for All</p>
          </div>
        </div>

        {/* Right Side - Notifications and Profile */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onNotificationsClick}
            className="text-white hover:bg-white/20 p-2 relative"
          >
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#BF4226] rounded-full flex items-center justify-center">
              <span className="text-xs text-white">13</span>
            </div>
          </Button>

          {/* Profile Menu */}
          <DropdownMenu open={showProfileMenu} onOpenChange={setShowProfileMenu}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-white/20 p-1"
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#F2C063] text-[#1A3E73] text-sm font-medium">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <div 
                className="flex items-center gap-2 p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors" 
                onClick={() => {
                  onProfileClick?.();
                  setShowProfileMenu(false);
                }}
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-[#F2C063] text-[#1A3E73] font-medium">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Juan Dela Cruz</p>
                  <p className="text-xs text-gray-500">juan@email.com</p>
                </div>
              </div>
              
              <DropdownMenuItem 
                className="flex items-center gap-2 py-2 cursor-pointer"
                onClick={() => {
                  onProfileClick?.();
                  setShowProfileMenu(false);
                }}
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex items-center gap-2 py-2 cursor-pointer">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex items-center gap-2 py-2 cursor-pointer">
                <User className="w-4 h-4" />
                <span>Account</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="flex items-center gap-2 py-2 cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

    </div>
  );
}