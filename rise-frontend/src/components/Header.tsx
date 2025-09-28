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
    <header className="bg-gradient-to-r from-[#1A3E73] to-[#2A4E83] text-white p-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* RISE Logo */}
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img 
              src="/src/assets/rise.png" 
              alt="RISE Logo" 
              className="w-[2.45rem] h-[2.45rem] object-cover" 
            />
          </div>
          
          {/* Tagline */}
          <div>
            <p className="text-[0.8rem] text-blue-100 font-body font-light italic leading-tight">
              Every Peso. Every Voice.<br/>
              Accounted For.
            </p>
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
    </header>
  );
}