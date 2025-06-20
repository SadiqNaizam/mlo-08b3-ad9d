import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin, Info, Eye, RefreshCw, X, Stethoscope } from 'lucide-react';

type AppointmentStatus = 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';

interface AppointmentCardProps {
  id: string;
  title: string; // e.g., "Consultation with Dr. Smith" or "Appointment for John Doe"
  date: string; // e.g., "October 26, 2024"
  time: string; // e.g., "10:00 AM - 11:00 AM"
  status: AppointmentStatus;
  consultationType: string; // e.g., "General Checkup", "Specialist Consultation"
  location?: string; // e.g., "Online" or "Clinic Room A"
  onCancel?: (appointmentId: string) => void;
  onViewDetails?: (appointmentId: string) => void;
  onReschedule?: (appointmentId: string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  id,
  title,
  date,
  time,
  status,
  consultationType,
  location,
  onCancel,
  onViewDetails,
  onReschedule,
}) => {
  console.log(`AppointmentCard loaded for ID: ${id}, Title: ${title}`);

  const getStatusBadgeStyle = (currentStatus: AppointmentStatus): string => {
    switch (currentStatus) {
      case 'Confirmed':
        return "bg-green-100 text-green-700 border-green-300 hover:bg-green-200";
      case 'Pending':
        return "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200";
      case 'Cancelled':
        return "bg-red-100 text-red-600 border-red-300 hover:bg-red-200"; // Red accent for "Cancelled"
      case 'Completed':
        return "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200";
    }
  };

  const canTakeAction = status === 'Pending' || status === 'Confirmed';

  return (
    <Card className="w-full max-w-md rounded-lg shadow-md border-2 border-blue-500 bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-4 border-b border-gray-200">
        <CardTitle className="text-xl font-semibold text-blue-700">{title}</CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-3 flex-grow">
        <div className="flex items-center space-x-2 text-gray-700">
          <Stethoscope className="h-5 w-5 text-blue-500 flex-shrink-0" />
          <span>{consultationType}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <CalendarDays className="h-5 w-5 text-blue-500 flex-shrink-0" />
          <span>{date}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <Clock className="h-5 w-5 text-blue-500 flex-shrink-0" />
          <span>{time}</span>
        </div>
        {location && (
          <div className="flex items-center space-x-2 text-gray-700">
            <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <span>{location}</span>
          </div>
        )}
        <div className="flex items-center space-x-2 pt-1">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />
          <span className="text-gray-700 font-medium">Status:</span>
          <Badge 
            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getStatusBadgeStyle(status)}`}
            variant="outline" // Use outline to prevent default badge bg colors, rely on custom classes
          >
            {status}
          </Badge>
        </div>
      </CardContent>

      {(onViewDetails || (canTakeAction && (onReschedule || onCancel))) && (
        <CardFooter className="p-3 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-2 justify-end">
          {onViewDetails && (
            <Button variant="outline" size="sm" onClick={() => onViewDetails(id)} className="border-blue-500 text-blue-600 hover:bg-blue-50">
              <Eye className="mr-1.5 h-4 w-4" /> View Details
            </Button>
          )}
          {canTakeAction && onReschedule && (
            <Button variant="secondary" size="sm" onClick={() => onReschedule(id)}>
              <RefreshCw className="mr-1.5 h-4 w-4" /> Reschedule
            </Button>
          )}
          {canTakeAction && onCancel && (
            <Button variant="destructive" size="sm" onClick={() => onCancel(id)} className="bg-red-500 hover:bg-red-600"> {/* Red accent for Cancel button */}
              <X className="mr-1.5 h-4 w-4" /> Cancel
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default AppointmentCard;