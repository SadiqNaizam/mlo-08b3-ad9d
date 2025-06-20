import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemedNotificationBell from '@/components/ThemedNotificationBell'; // Assuming this path
import { Bell, User, LogOut, LayoutDashboard, CalendarDays, FileText } from 'lucide-react';

const AppHeader: React.FC = () => {
  console.log('AppHeader loaded');

  const handleLogout = () => {
    console.log('Logout clicked');
    // Add actual logout logic here
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-200'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-700 bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Bell className="h-7 w-7 text-yellow-400" />
          <span className="font-bold text-xl">Doraemon Health</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/dashboard" className={navLinkClasses}>
            <LayoutDashboard className="mr-1.5 h-4 w-4 inline-block" />
            Dashboard
          </NavLink>
          <NavLink to="/appointments" className={navLinkClasses}>
            <CalendarDays className="mr-1.5 h-4 w-4 inline-block" />
            Appointments
          </NavLink>
          <NavLink to="/medical-records" className={navLinkClasses}>
            <FileText className="mr-1.5 h-4 w-4 inline-block" />
            Medical Records
          </NavLink>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <ThemedNotificationBell />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                <Avatar className="h-9 w-9 border-2 border-transparent hover:border-yellow-300 transition-colors">
                  <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                  <AvatarFallback className="bg-blue-500 text-yellow-300">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 bg-white text-gray-800">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">User Name</p>
                  <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/user-profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:!text-red-600 hover:!bg-red-100">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;