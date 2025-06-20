import React, { useState, useMemo, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bell, CalendarDays, Mail, FileText, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils'; // Assuming utils.ts exists for cn

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
  icon?: React.ReactNode;
  category?: 'reminder' | 'message' | 'record' | 'alert';
}

interface ThemedNotificationBellProps {
  notifications?: Notification[];
}

const defaultNotifications: Notification[] = [
  {
    id: '1',
    title: 'Appointment Reminder',
    description: "Your check-up is tomorrow at 10:00 AM.",
    timestamp: '1h ago',
    isRead: false,
    link: '/appointments',
    category: 'reminder',
  },
  {
    id: '2',
    title: 'New Message',
    description: 'Dr. Ada has sent you a new message.',
    timestamp: '3h ago',
    isRead: false,
    link: '/dashboard', // Using /dashboard as a generic link
    category: 'message',
  },
  {
    id: '3',
    title: 'Medical Record Updated',
    description: 'Your recent lab results are now available.',
    timestamp: 'Yesterday',
    isRead: true,
    link: '/medical-records',
    category: 'record',
  },
  {
    id: '4',
    title: 'System Alert',
    description: 'Please update your contact information.',
    timestamp: '2 days ago',
    isRead: false,
    link: '/user-profile',
    category: 'alert',
  },
];

const getIconForCategory = (category?: Notification['category']): React.ReactNode => {
  switch (category) {
    case 'reminder':
      return <CalendarDays className="h-5 w-5 text-blue-500" />;
    case 'message':
      return <Mail className="h-5 w-5 text-green-500" />;
    case 'record':
      return <FileText className="h-5 w-5 text-purple-500" />;
    case 'alert':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

const NotificationEntry: React.FC<{ notification: Notification, onNotificationClick?: (id: string) => void }> = ({ notification, onNotificationClick }) => {
  const handleItemClick = () => {
    if (onNotificationClick) {
      onNotificationClick(notification.id);
    }
  };

  const content = (
    <div
      className={cn(
        "flex items-start space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors",
        !notification.isRead && "bg-blue-50 dark:bg-blue-900/30"
      )}
      onClick={handleItemClick} // if not a link, allows marking as read
    >
      <div className="flex-shrink-0 mt-1">
        {notification.icon || getIconForCategory(notification.category)}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{notification.title}</p>
        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">{notification.description}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.timestamp}</p>
      </div>
      {!notification.isRead && (
        <div className="h-2 w-2 rounded-full bg-blue-500 self-center ml-2 shrink-0" title="Unread"></div>
      )}
    </div>
  );

  if (notification.link) {
    return (
      <Link to={notification.link} className="block no-underline">
        {content}
      </Link>
    );
  }
  return <div className="cursor-pointer">{content}</div>;
};


const ThemedNotificationBell: React.FC<ThemedNotificationBellProps> = ({
  notifications: initialNotifications = defaultNotifications,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentNotifications, setCurrentNotifications] = useState<Notification[]>(initialNotifications);

  useEffect(() => {
    console.log('ThemedNotificationBell loaded');
  }, []);

  useEffect(() => {
    setCurrentNotifications(initialNotifications);
  }, [initialNotifications]);


  const unreadCount = useMemo(() => {
    return currentNotifications.filter(n => !n.isRead).length;
  }, [currentNotifications]);

  const handleNotificationClick = (id: string) => {
    // In a real app, this would also trigger an API call to mark as read
    setCurrentNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
    // Optionally close popover or keep it open
  };
  
  const markAllAsRead = () => {
    setCurrentNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full text-yellow-500 hover:bg-blue-100 dark:hover:bg-blue-700/50 focus-visible:ring-blue-500"
          aria-label="Open notifications"
        >
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] p-0.5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs border-2 border-white dark:border-gray-800"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 md:w-96 p-0 bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-700 shadow-xl rounded-lg">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Notifications</h3>
            {unreadCount > 0 && (
               <Button variant="link" size="sm" onClick={markAllAsRead} className="text-blue-600 dark:text-blue-400 px-0 h-auto">
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        <Separator className="bg-gray-200 dark:bg-gray-700" />
        <ScrollArea className="h-[300px] md:h-[400px]">
          {currentNotifications.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-10 px-4">
              <Bell className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-2" />
              <p className="text-sm">No new notifications</p>
              <p className="text-xs">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {currentNotifications.map((notification) => (
                <NotificationEntry key={notification.id} notification={notification} onNotificationClick={handleNotificationClick} />
              ))}
            </div>
          )}
        </ScrollArea>
        <Separator className="bg-gray-200 dark:bg-gray-700" />
         <div className="p-2 text-center">
            <Link to="/dashboard" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-700/30">
                View all activity
              </Button>
            </Link>
          </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemedNotificationBell;