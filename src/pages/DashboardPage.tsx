import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import AppFooter from '@/components/layout/AppFooter';

// Custom UI Components
import HealthMetricDisplay from '@/components/HealthMetricDisplay';
import AppointmentCard from '@/components/AppointmentCard';

// Shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Lucide Icons
import {
  CalendarDays,
  FileText,
  Bell,
  ArrowRight,
  UserCircle,
  PlusCircle,
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  useEffect(() => {
    console.log('DashboardPage loaded');
  }, []);

  const placeholderUpcomingAppointments = [
    {
      id: 'apt1',
      title: 'Consultation with Dr. Dora',
      date: 'December 25, 2024',
      time: '10:00 AM - 10:30 AM',
      status: 'Confirmed' as 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed',
      consultationType: 'General Checkup',
      location: 'Online via Anywhere Door',
      onViewDetails: (id: string) => console.log('View details for appointment:', id),
      onReschedule: (id: string) => console.log('Reschedule appointment:', id),
    },
    {
      id: 'apt2',
      title: 'Gadget Maintenance Check',
      date: 'December 28, 2024',
      time: '02:00 PM - 02:45 PM',
      status: 'Pending' as 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed',
      consultationType: 'Special Gadget Service',
      location: 'Future Department Store',
      onCancel: (id: string) => console.log('Cancel appointment:', id),
      onViewDetails: (id: string) => console.log('View details for appointment:', id),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-sky-50"> {/* Doraemon light blue theme background */}
      <AppHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 ml-64"> {/* Adjust for w-64 sidebar */}
          <ScrollArea className="h-[calc(100vh-4rem)]"> {/* Header is h-16 (4rem) */}
            <div className="p-6 md:p-8 space-y-8">

              {/* Welcome Message Section */}
              <section>
                <Card className="bg-white rounded-xl shadow-lg border-2 border-blue-300 overflow-hidden">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-blue-700">Welcome back, Nobita!</h1>
                      <p className="text-gray-600 mt-2">
                        Doraemon has your health dashboard ready! Let's check everything.
                      </p>
                    </div>
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/en/c/c8/Doraemon_-_Anime_Character.png" 
                      alt="Doraemon" 
                      className="h-24 w-auto hidden sm:block opacity-90" 
                    />
                  </CardContent>
                </Card>
              </section>

              {/* Health Metrics Section */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4 ml-1">Your Health Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <HealthMetricDisplay
                    title="Upcoming Appointments"
                    value={placeholderUpcomingAppointments.length}
                    metricUnit="appointments"
                    icon={CalendarDays}
                    themeColor="blue"
                    linkTo="/appointments" // Path from App.tsx
                    linkText="View Appointments"
                  />
                  <HealthMetricDisplay
                    title="Recent Record Updates"
                    value={1}
                    metricUnit="new update"
                    icon={FileText}
                    themeColor="green"
                    linkTo="/medical-records" // Path from App.tsx
                    linkText="View Records"
                  />
                  <HealthMetricDisplay
                    title="Important Notifications"
                    value={0} // Example: "0 critical alerts" from user journey
                    metricUnit="alerts"
                    icon={Bell}
                    themeColor="yellow"
                    linkTo="/dashboard" // Could link to a specific notifications page
                    linkText="Check Alerts"
                  />
                </div>
              </section>

              {/* Upcoming Appointments Section */}
              <section>
                <div className="flex justify-between items-center mb-4 ml-1">
                  <h2 className="text-2xl font-semibold text-blue-600">Upcoming Appointments</h2>
                  <Link to="/appointments"> {/* Path from App.tsx */}
                    <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg">
                      View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                {placeholderUpcomingAppointments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {placeholderUpcomingAppointments.map((apt) => (
                      <AppointmentCard
                        key={apt.id}
                        id={apt.id}
                        title={apt.title}
                        date={apt.date}
                        time={apt.time}
                        status={apt.status}
                        consultationType={apt.consultationType}
                        location={apt.location}
                        onViewDetails={apt.onViewDetails}
                        onReschedule={apt.onReschedule}
                        onCancel={apt.onCancel}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="bg-white rounded-xl shadow border-2 border-gray-200">
                    <CardContent className="p-8 text-center text-gray-500">
                      <CalendarDays className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                      <p className="font-medium">No upcoming appointments.</p>
                      <p className="text-sm mb-4">Time to plan your next check-up!</p>
                      <Link to="/appointments"> {/* Path from App.tsx */}
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                          <PlusCircle className="mr-2 h-5 w-5" /> Book New Appointment
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </section>

              {/* Quick Actions Section */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4 ml-1">Quick Actions</h2>
                <Card className="bg-white rounded-xl shadow-lg border-2 border-blue-300">
                  <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Link to="/appointments" className="block"> {/* Path from App.tsx */}
                      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-md font-semibold rounded-lg flex items-center justify-center">
                        <PlusCircle className="mr-2 h-5 w-5" /> Book Appointment
                      </Button>
                    </Link>
                    <Link to="/medical-records" className="block"> {/* Path from App.tsx */}
                      <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-md font-semibold rounded-lg flex items-center justify-center">
                        <FileText className="mr-2 h-5 w-5" /> View My Records
                      </Button>
                    </Link>
                    <Link to="/user-profile" className="block"> {/* Path from App.tsx */}
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-800 py-6 text-md font-semibold rounded-lg flex items-center justify-center">
                        <UserCircle className="mr-2 h-5 w-5" /> Update My Profile
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </section>

            </div>
          </ScrollArea>
        </main>
      </div>
      <AppFooter />
    </div>
  );
};

export default DashboardPage;