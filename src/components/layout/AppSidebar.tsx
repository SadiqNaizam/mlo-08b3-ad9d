import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, FileText, UserCircle, Bell } from 'lucide-react';

const AppSidebar: React.FC = () => {
  console.log('AppSidebar loaded');

  const baseLinkClasses = "flex items-center gap-3 p-3 rounded-lg transition-colors duration-150 ease-in-out";
  const activeLinkClasses = "bg-yellow-400 text-blue-700 font-semibold shadow-md";
  const inactiveLinkClasses = "hover:bg-blue-600 hover:text-white";

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`;

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/appointments", icon: CalendarDays, label: "Appointments" },
    { to: "/medical-records", icon: FileText, label: "Medical Records" },
    { to: "/user-profile", icon: UserCircle, label: "User Profile" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-blue-700 text-white flex flex-col shadow-lg">
      {/* This padding assumes the header is 4rem (h-16). Adjust if header height changes. */}
      <div className="pt-16 flex flex-col flex-grow">
        <div className="p-4 mb-4 border-b border-blue-600">
          <Link to="/dashboard" className="flex items-center justify-center gap-2 p-2 rounded-md bg-blue-800/50 hover:bg-blue-800 transition-colors">
            <Bell className="h-8 w-8 text-yellow-400" />
            <h2 className="text-xl font-semibold">Doraemon Health</h2>
          </Link>
        </div>

        <nav className="flex-grow px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={navLinkClassName}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-blue-600">
          <p className="text-xs text-center text-blue-300">
            &copy; {new Date().getFullYear()} Doraemon Health
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;