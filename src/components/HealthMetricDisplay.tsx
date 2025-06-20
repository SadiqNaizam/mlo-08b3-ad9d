import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { LucideProps } from 'lucide-react'; // For typing the icon prop

interface HealthMetricDisplayProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<LucideProps>; // e.g., CalendarDays from lucide-react, passed as a component
  metricUnit?: string; // Optional unit like "Appointments", "Messages"
  themeColor?: 'blue' | 'red' | 'yellow' | 'green' | 'gray'; // Doraemon-inspired colors
  linkTo?: string; // Optional path for navigation, e.g., "/appointments"
  linkText?: string; // Optional text for the link, defaults to "View details"
  className?: string; // Allow for additional Tailwind classes
}

const HealthMetricDisplay: React.FC<HealthMetricDisplayProps> = ({
  title,
  value,
  icon: IconComponent, // Renamed to avoid conflict and use as a component
  metricUnit,
  themeColor = 'blue', // Default to Doraemon blue
  linkTo,
  linkText = 'View details',
  className = '',
}) => {
  console.log(`HealthMetricDisplay loaded for: ${title}`);

  const themeStyles = {
    cardClasses: '',
    iconClasses: '',
    valueTextClasses: '',
  };

  switch (themeColor) {
    case 'red':
      themeStyles.cardClasses = 'bg-red-50 border-red-200 hover:bg-red-100';
      themeStyles.iconClasses = 'text-red-600';
      themeStyles.valueTextClasses = 'text-red-700';
      break;
    case 'yellow':
      themeStyles.cardClasses = 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
      themeStyles.iconClasses = 'text-yellow-600';
      themeStyles.valueTextClasses = 'text-yellow-700';
      break;
    case 'green':
      themeStyles.cardClasses = 'bg-green-50 border-green-200 hover:bg-green-100';
      themeStyles.iconClasses = 'text-green-600';
      themeStyles.valueTextClasses = 'text-green-700';
      break;
    case 'gray':
      themeStyles.cardClasses = 'bg-gray-50 border-gray-200 hover:bg-gray-100';
      themeStyles.iconClasses = 'text-gray-600';
      themeStyles.valueTextClasses = 'text-gray-700';
      break;
    case 'blue':
    default:
      themeStyles.cardClasses = 'bg-blue-50 border-blue-200 hover:bg-blue-100';
      themeStyles.iconClasses = 'text-blue-600';
      themeStyles.valueTextClasses = 'text-blue-700';
      break;
  }

  return (
    <Card 
      className={`shadow-md rounded-xl transition-all duration-300 ${themeStyles.cardClasses} ${className}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-gray-700">{title}</CardTitle>
        <IconComponent className={`h-6 w-6 ${themeStyles.iconClasses}`} aria-hidden="true" />
      </CardHeader>
      <CardContent className="pb-4 pt-0">
        <div className={`text-3xl font-bold ${themeStyles.valueTextClasses}`}>{value}</div>
        {metricUnit && <p className="text-xs text-gray-500 pt-1">{metricUnit}</p>}
      </CardContent>
      {linkTo && (
        <CardFooter className="pt-0 pb-3">
          <Link 
            to={linkTo} 
            className={`text-sm font-medium ${themeStyles.iconClasses} hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-sm`}
          >
            {linkText}
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default HealthMetricDisplay;